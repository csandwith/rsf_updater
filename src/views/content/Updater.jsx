import React, { useEffect, useState } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux'
import { setLang } from '../../redux/settingsSlice';
import ProgressBar from 'react-bootstrap/ProgressBar';
import '../../i18n.js'

const timeConvert = (ms) => {
  if(ms == 0) {
    return "Done(t)!";
  }
  const toSec = 1000;
  const toMin = 60;
  const toHr = 60;
  const toDay = 24;
  let comp = toSec * toMin * toHr * toDay;
  if(ms > comp) {
    return ((ms / comp).toFixed(2)) + " days(t)";
  }
  comp = toSec * toMin * toHr;
  if(ms > comp) {
    return ((ms / comp).toFixed(2)) + " hours(t)";
  }
  comp = toSec * toMin;
  if(ms > comp) {
    return ((ms / comp).toFixed(2)) + " minutes(t)";
  }
  comp = toSec;
  if(ms > comp) {
    return ((ms / comp).toFixed(2)) + " seconds(t)";
  }
  return "moments(t)";
}

const sizeConvert = (bytes) => {
  if(bytes > (1024 * 1024)) {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  }
  if(bytes > 1024) {
    return (bytes / 1024).toFixed(2) + " KB";
  }
  return bytes + " Bytes";
}

function LanguageSelector() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings.data);

  const changeLang = function(code) {
    if(code && code !== i18n.language) {
      console.log("Changing language to " + code);
      i18n.changeLanguage(code);
    }
  };

  const langSelectOnChange = function(event) {
    const code = event.currentTarget.value;
    changeLang(code);
    if(code !== settings.lang) {
      console.log("Updating lang setting to " + code);
      dispatch(setLang(code));
    }
  };

  const lngs = [  
    { code: 'en', nativeName: 'English' },  
    { code: 'fr', nativeName: 'Francais' },  
  ];

  useEffect(() => {
    changeLang(settings.lang);
  });
  

  return (
    <div className="languageSelectorDiv">
        <select onChange={langSelectOnChange} value={settings.lang}> 
          {lngs.map((lng) => {  
            return (  
              <option key={lng.code} value={lng.code}>{lng.nativeName}</option>  
            );  
          })}
        </select>   
      </div>
  );
}


function DownloadElement(props) {
  const updateData = props.updateData;
  const [dlState, setDlState] = useState({
    state: "loading",
    error: null
  });

  const webtorrentTorrentOpts = { //Stubbing this in - this should come from Settings
    //path: __dirname, Path gets calculated over in main.js by necessity
    destoryStoreOnDestroy: false, //this could be interesting way to clean up. Not sure tbh
    strategy: "rarest" //Default is sequential, but we don't care about the sequence of the pieces.
  };
  const startDownload = (event) => {
      //Create the update file - this indicates that the update has been started and should resume automatically if we restart the app
      electron.fileApi.writeTextToFile(updateData.version, "/Download/rsf_update.dat");
      for(var i = 0; i < props.updateData.torrents.length; i++) {
        electron.torrentApi.startDownload(props.updateData.torrents[i], webtorrentTorrentOpts);
      }
      setDlState({state: "downloading"});
  };
  const stopDownload = (event) => {
    electron.torrentApi.stopDownload();
    setDlState({state: "paused"});
  };
  const cancelDownload = (event) => {
    electron.torrentApi.cancelDownload();
    electron.fileApi.emptyDir("/Download"); //This is async, but we're not too bothered about the result, or waiting for it to finish I don't think.
    setDlState({state: "cancelled"});
  };
  
  const prepareDownload = async() => {
    //Make the Update's Download directory if it doesn't exist
    await electron.fileApi.mkdirp("/Download");
    try {
      //Check to see if an existing update is aleady in progress
      const response = await electron.fileApi.readTextFromFile("/Download/rsf_update.dat");
      if(response == "DEADBEEF"/*updateData.version*/) {
        //A download has already started for this version - we should resume it (automatically?)
        console.log("Existing version " + response + " matches update - Should resume");
        setDlState({state: "prepared"});
      } else {
        //A different version has already started downloading - we should nuke it in favor of this new version
        console.log("Previous update version " + response + " detected - deleting it");
        await electron.fileApi.emptyDir("/Download");
        setDlState({state: "prepared"});
      }
    } catch (err) {
      if(err.message.includes("ENOENT")) {
        //Update file doesn't exist, that means there isn't an Update already in progress.
        console.log("Update " + updateData.version + " hasn't started yet");
        setDlState({state: "prepared"});
      } else {
        //Handle the error. Not sure how at the moment
        console.log(err);
        setDlState({state: "error", error: err});
      }
    }
  }

  useEffect(() => {
    //TODO: This damn thing renders so fast, this ends up hitting prepareDownload twice, which is insane to me
    //I honestly don't know how to solve that.
    if(dlState.state == "loading") {
      setDlState({state: "preparing"});
      //Boy I sure wish I could "await" this function...
      prepareDownload();
    }
  })

  return (
    <div id="downloadDiv">
      <label>Update {updateData.version} available! translate me!</label><br />
      {dlState.state == "prepared" && <button id="startDownload" onClick={startDownload}>Download(t)</button>}
      {dlState.state == "downloading" && <button id="pauseDownload" onClick={stopDownload}>Pause(t)</button>}
      {dlState.state == "paused" && <button id="resumeDownload" onClick={startDownload}>Resume(t)</button>}
      {dlState.state == "paused" && <button id="cancelDownload" onClick={cancelDownload}>Cancel(t)</button>}
      <DownloadStatus />
    </div>
  )
}

function DownloadStatus() {
  const [status, setStatus] = useState({
    state: "Ready(t)",
    done: false,
    downloadingTorrents: {},
    completeTorrents: {}
  });

  const install = async (event) => {
    await electron.torrentApi.stopDownload();
    await electron.fileApi.moveDirContentsTo("/Download", "/Install");
    await electron.fileApi.rm("/Install/rsf_update.dat");
    await electron.fileApi.emptyDir("/Download");
  };

  useEffect(() => {
    electron.torrentApi.downloadStatus().then((status) => {
      //console.log(status);
      status.done = false;
      if(Object.keys(status.downloadingTorrents).length == 0) {
        if(Object.keys(status.completeTorrents).length == 0) {
          status.state = "Ready(t)"
        } else {
          status.state = "Complete(t)";
          status.done = true;
        }
      } else {
        status.state = "Downloading(t)";
      }
      setStatus(status)
    });
  });
  return (
    <div className="downloadStatusDiv">
      {status.done && <button id="install" onClick={install}>Install(t)</button>}
      {Object.keys(status.downloadingTorrents).map((torrentName) => {  
        return (  
          <TorrentStatus name={torrentName} key={torrentName} torrent={status.downloadingTorrents[torrentName]} />
        );  
      })}
      {Object.keys(status.completeTorrents).map((torrentName) => {  
        return (  
          <TorrentStatus name={torrentName} key={torrentName} torrent={status.completeTorrents[torrentName]} />
        );  
      })}
    </div>
  )
}

function TorrentStatus(props) {
  const torrent = props.torrent;
  const name = props.name;

  return (
    <div className="torrentStatusDiv">
      <div className="torrentStatusHeader">
        <label>Name: {name}</label><label>length: {sizeConvert(torrent.length)}</label><br />
      </div>
      <div className="torrentStatusProgress">
        <ProgressBar min={0} max={1} now={torrent.progress} label={timeConvert(torrent.timeRemaining)} />
        <label>dlSpeed: {torrent.downloadSpeed}</label>
      </div>
    </div>
  )
}

export default function Updater() {
  const rsf = useSelector((state) => state.rsf.data);
  const updateData = { //Stubbing this in - this should come from a webserver
    version: "2",
    size: "12000000",
    torrents: ["magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent"]
  }

  const webtorrentMainOpts = { //Stubbing this in - this should come from Settings

  };

  const { t } = useTranslation(); 
  const updateAvailable = rsf.version != updateData.version;
  return ( 
    <div className="updater">
      <h1>{t('nav.buttons.updater.text')}</h1>
      <LanguageSelector />
      <label>{t('updater.currentVersionLabel.text')} {rsf.version}</label><br />
      <label>{t('updater.latestVersionLabel.text')} {updateData.version}</label><br />
      {rsf.version != updateData.version &&
        <DownloadElement updateData={updateData}/>
      }
      {rsf.version == updateData.version &&
        <label>RSF is up to date! Translate me!</label>
      }
    </div>
  ); 
}
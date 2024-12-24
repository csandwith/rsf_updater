# Not Completed - barely even started
# rsf_updater
Electron-based updater for RSF

## Purpose
RSF, as I understand it, is currently distributed in one of two ways:
 - The RSF installer can download the latest version using typical methods
    - This is relatively slow
    - This requires RSF to host these update files on some server, which are quite large
        - This is presumably not cheap
    - This requires users to re-run the installer manually in order to update their copy of RSF
 - The user can use a Torrent to download the latest version of RSF overtop of their current installation
    - This still requires manual intervention by the user
    - This requires specialized software for download data via the Torrent protocol
    - Most users presumably do not care about the minutea of how they get an update

The goals of this project are as follows
 - To provide the user a semi-automatic method of updating RSF with as little hassle as possible
 - To utilize the Torrent protocol in order to achieve this

Technical goals were also identified as follows
 - Build the app using a modern framework
    - Electron was specifically given the nod
 - Be prepared on day one for (at least basic) internationalization support

It should be noted that a further goal was proposed - that a complete rewrite of the RSF Launcher would be ideal. 
 - I find this goal incredibly daunting at the moment, and I will not be attempting it, at least not initially
 - This goal will remain in the back of my mind - I will attempt to code this such that it could, in theory, become the new RSF Launcher sometime down the line.

## Design

### UI
<ol>
<li>The RSF Updater App will be comprised of a navigation pane on the left, and a content pane on the right</li>
    <ol>
    <li>Clicking on navigation options will switch which content pane is displayed</li>
    </ol>
<li>The Updater content pane will be responsible for displaying information about an available update, as well as the state of the current version.</li>
<ol>
    <li>Display the current version of RSF that is installed</li>
    <li>Display the latest version of RSF that is available</li>
<ol>
        <li>If these versions are identical, inform the user that their client is up-to-date</li></ol>
    <li>Display the current status of the Download</li>
<ol>
        <li>Allow the user to start the Download if it hasn't started</li>
        <li>Allow the user to pause the Download if it is running</li>
        <li>Allow the user to cancel the Download if it is running/paused</li></ol></ol>

### State
<ol>
<li>Application state will be managed via React Redux</li>
<li>State persistence is still TBD - though it sounds like React Redux has capability for persisting things</li>
    <ol>
    <li>TODO: Figure out how to persist state to files on disk, through/via Electron, and to load the state on startup</li>
    <li>All persistance-worthy state will be persisted to files on disk</li></ol></ol>

### Model
The model will consist of the following objects
<ol>
<li>CurrentRSF</li>

 - version (the current version of RSF, as discovered by interrogating the disk)
 - ???

<li>Update</li>

 - version (the version of the update)

 - metaURL (the URL to some server where this Update's meta-information came from)
 - ??? (I'm assuming things like the list of Torrents that make up this update, both remote and local)

<li>Download</li>

 - location (path to the download on disk)

 - progress

 - state (e.g. "paused", "downloading", "cancelled", "ready to install")
 
 - ???
</ol>

### Remote
The remote handler will contain all of the behavior for contacting whatever remote servers/resources to fetch information.
The remote handler will operate asynchronously
The remote handler will update the state of the application directly
The implementation details beyond that are completely unknown at the moment
 - It is assumed/ideal if the calls are made to a webserver, as opposed to, say, connecting to a DB/FTP/etc
 - It is assumed that authentication is not required to access the aforementioned webserver
 - It is assumed that the aforementioned webserver(s) will provide some sort of API(s) (as opposed to necessitating HTML scraping or other such hacks)
    - IT would be ideal if this API(s) were RESTful in nature

### Downloader
The downloader is special and distinct from the Remote handling code, as the Downloader will be responsible for handling the Torrent protocol.
The downloader will presumably use webtorrent to download the torrents
 - There is an assumption that an update will consist of between 1-n torrents, and the downloader will have to download all of them in order to fully download the update.
 The downloader will download to disk
 The downloader will be pausable
 The downloader will be resumable, both from a paused download, and from an interrupted (by app close) download
 The downloader will be cancelable - and it will clean up after itself


## User Story
Suppose a User that has installed RSF in its entirety - they now have a working copy of RSF and RBR. Suppose that this installation of RSF also includes the RSF Updater.

The User starts the RSF Launcher. The RSF Launcher performs a basic check against some webserver to determine if a new version is available
 - Can it do this presently?

Imagine in this scenario that the RSF Launcher determines that there is a new version available - it would prompt the user to Update. Clicking this prompt would then launch the RSF Updater

On startup, the RSF Launcher loads state off disk, including:
 - What is the current installed version of RSF?
 - Is there a Download already in progress? (assume 'no' for this scenario)
 - General User settings (chosen language, perhaps settings for WebTorrent, etc)

The RSF Launcher contacts the webserver that carries the Update information:
 - What is the latest version of RSF? Is it newer than the version that is currently installed? (assume 'yes' for this scenario)
    - If there is a Download in progress, does the latest version of RSF match the version of the Download that is in progress? (Not applicable in this scenario)

If there is a partially completed Download whose version DOES NOT match the latest version, cancel the Download and clean up (not applicable in this scenario)

If there is a partially completed Download whose version DOES match the latest version, resume the Download

If the current RSF version is equal to the latest, tell the user that they are up-to-date (Not the case in this scenario)

If the current RSF version is NOT equal to the latest, tell the user that there is an update available
    - Which version number
    - A link to patch notes? I'd _really_ like to display an embedded page with all the info about the update, but that's a stretch goal
    - Prompt them to begin the update procedure

TODO: We should validate that the user has enough disk space for the update - I'm not sure when/where/how to do that presently.
    - Thinking this through, we need to do it on Download start and on Download resume.

If there is an update available and the user clicks to begin the update procedure
 - Begin constructing the Download
    - Create a space on disk for the Download
    - Use the Update model object in the state to sync the Torrent files down from the server to disk
    - Activate the Downloader such that it starts doing the WebTorrent stuff, pointed at the correct target directory
    - Update the UI accordingly

Before the update is complete, the user closes the RSF Updater. Later, they re-open the RSF updater via the RSF Launcher

On startup, the RSF Launcher loads state off disk (see above)
 - There is a Download already in progress in this scenario

The RSF Launcher contacts the webserver that carries the Update information:
 - What is the latest version of RSF? Is it newer than the version that is currently installed? (assume 'yes' for this scenario)
    - If there is a Download in progress, does the latest version of RSF match the version of the Download that is in progress? (assume 'yes' for this scenario)

If there is a partially completed Download whose version DOES NOT match the latest version, cancel the Download and clean up (not the case in this scenario)

If there is a partially completed Download whose version DOES match the latest version, resume the Download (we do that here)

The download proceeds as normal.

Eventually, the download finishes. The UI updates to indicate that the Update is downloaded and is ready to install

The user clicks "Install"
 - Kill any RBR processes
 - Move files from the Download directory overtop the RSF/RBR installation as appropriate
 - Clean up residual Download files (i.e. Torrent files)
 - Probably self-terminate the RSF Updater




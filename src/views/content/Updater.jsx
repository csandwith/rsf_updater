import React, { useEffect } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux'
import { setLang } from '../../redux/settingsSlice';
import '../../i18n.js'

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

export default function Updater() {
  const { t } = useTranslation(); 
  return ( 
    <div className="updater">
      <h1>{t('nav.buttons.updater.text')}</h1>
      <LanguageSelector />
    </div>
  ); 
}
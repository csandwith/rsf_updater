import React from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux'
import { setLang } from '../../redux/settingsSlice';
import '../../i18n.js'

function LanguageSelector() {
  const settings = useSelector((state) => state.settings.value);
  const dispatch = useDispatch();
  console.log(settings.lang);
  const lngs = [  
    { code: 'en', nativeName: 'English' },  
    { code: 'fr', nativeName: 'Francais' },  
  ];
  const changeLang = function(event) {
    console.log(event.currentTarget.value);
    i18n.changeLanguage(event.currentTarget.value);
    dispatch(setLang(event.currentTarget.value));
  };

  return (
    <div className="languageSelectorDiv">
        <select onChange={changeLang} value={settings.lang}> 
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
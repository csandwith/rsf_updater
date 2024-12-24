import React from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import '../../i18n.js'

export default function Updater() {
  const lngs = [  
    { code: 'en', nativeName: 'English' },  
    { code: 'fr', nativeName: 'Francais' },  
  ]; 
  const changeLang = function(event) {
    console.log(event.currentTarget.value);
    i18n.changeLanguage(event.currentTarget.value);
  };

  const { t } = useTranslation(); 
  return ( 
    <div className="updater">
      <h1>{t('nav.buttons.updater.text')}</h1>
      <div className="languageSelectorDiv">
        <select onChange={changeLang}> 
          {lngs.map((lng) => {  
            return (  
              <option key={lng.code} value={lng.code}>{lng.nativeName}</option>  
            );  
          })}
        </select>   
      </div>
    </div>
  ); 
}
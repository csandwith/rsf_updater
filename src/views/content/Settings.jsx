import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Settings() { 
    const { t } = useTranslation(); 
    return ( 
      <div className="settings">
        <h1>{t('nav.buttons.settings.text')}</h1>
      </div>
    ); 
}
//https://hygraph.com/blog/react-internationalization

import i18n from 'i18next';  
import { initReactI18next } from 'react-i18next';  
i18n  
 .use(initReactI18next)  
 .init({  
   resources: {  
     en: {  
       translation: {  
         nav: {
            buttons: {
                updater: {
                    text: "Updater"
                },
                settings: {
                    text: "Settings"
                }
            }
         },
         updater: {
            currentVersionLabel: {
              text: "Current Version: "
            },
            latestVersionLabel: {
              text: "Latest Version: "
            }
         },
         settings: {
         },

       },  
     },  
     fr: {  
       translation: {  
        nav: {
            buttons: {
                updater: {
                    text: "Principal"
                },
                settings: {
                    text: "Paramètres"
                }
            }
         },
         updater: {
            currentVersionLabel: {
              text: "Version actuelle: "
            },
            latestVersionLabel: {
              text: "Dernière version: "
            }
         },
         settings: {
         },  
       },  
     },  
   },  
   lng: 'en',  
   fallbackLng: 'en',  
   interpolation: {  
     escapeValue: false   
   },  
 });
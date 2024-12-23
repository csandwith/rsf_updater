import React from 'react';
import { useSelector } from 'react-redux'
import Updater from './content/Updater.jsx'
import Settings from './content/Settings.jsx'

function getCurrentContent() {
  const currentPage = useSelector((state) => state.nav.value);
  if(currentPage == 'updater') {
    return <Updater />
  } else if(currentPage == 'settings') {
    return <Settings />
  } else {
    console.log(currentPage);
    return <label>Uh oh</label>
  }
}

export default function Content() { 
    const currentPage = useSelector((state) => state.nav.value);
    return ( 
      <div className="content">
        {getCurrentContent()}
      </div>
    ); 
}
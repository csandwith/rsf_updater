import React, { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Nav from './views/nav.jsx';
import Content from './views/content.jsx';
import store from './redux/store.js'
import { Provider, useDispatch } from 'react-redux'
import { loadFromDisk } from './redux/settingsSlice.js'

function SettingsLoader({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFromDisk());
  }, [dispatch]);
  return <>{ children }</>
}

export default function App() {  
    return (
        <div className="app">
            <Nav />
            <Content />
        </div>
    ); 
}

const root = createRoot(document.body);
root.render(
    <StrictMode>
        <Provider store={store}>
            <SettingsLoader>
                <App />
            </SettingsLoader>
        </Provider>
    </StrictMode>
);
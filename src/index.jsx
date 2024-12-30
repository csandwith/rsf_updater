import React, { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Nav from './views/nav.jsx';
import Content from './views/content.jsx';
import store from './redux/store.js'
import { Provider, useDispatch } from 'react-redux'
import { loadSettings } from './redux/settingsSlice.js'
import { loadRSFData } from './redux/RSFSlice.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function DataLoader({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSettings());
    dispatch(loadRSFData());
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
            <DataLoader>
                <App />
            </DataLoader>
        </Provider>
    </StrictMode>
);
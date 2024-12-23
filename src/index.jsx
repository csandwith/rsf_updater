import React, { StrictMode, useState, createContext } from 'react';
import { createRoot } from 'react-dom/client';
import Nav from './views/nav.jsx';
import Content from './views/content.jsx';
import store from './redux/store.js'
import { Provider } from 'react-redux'

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
            <App />
        </Provider>
    </StrictMode>
);
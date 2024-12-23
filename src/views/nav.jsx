import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { navigateTo } from '../redux/navSlice';

export default function Nav() {
    const currentPage = useSelector((state) => state.nav.value);
    const dispatch = useDispatch();

    const handleClick = (event) => {
        const target = event.currentTarget.getAttribute("target");
        console.log(target);
        dispatch(navigateTo(target));
    };

    return (
        <div className="nav">
            <h1>Nav: {currentPage}</h1>
            <div className="navList">
                <button id="updaterNav" target="updater" onClick={handleClick}>Updater</button>
                <button id="settingsNav" target="settings" onClick={handleClick}>Settings</button>
            </div>
        </div>
    );
}
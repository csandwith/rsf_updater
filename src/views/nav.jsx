import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { navigateTo } from '../redux/navSlice';
import { useTranslation } from 'react-i18next';

export default function Nav() {
    const currentPage = useSelector((state) => state.nav.value);
    const dispatch = useDispatch();
    const { t } = useTranslation(); 

    const handleClick = (event) => {
        const target = event.currentTarget.getAttribute("target");
        console.log(target);
        dispatch(navigateTo(target));
    };

    return (
        <div className="nav">
            <div className="navList">
                <button id="updaterNav" target="updater" onClick={handleClick}>{t('nav.buttons.updater.text')}</button>
                <button id="settingsNav" target="settings" onClick={handleClick}>{t('nav.buttons.settings.text')}</button>
            </div>
        </div>
    );
}
import React, { useState } from 'react'
import './LanguageSwitcher.scss'

const LanguageSwitcher = (props) => {

    const { currentLang, i18n } = props;
    const [selectedLang, setSelectedLang] = useState(currentLang);

  return (
    <div className='langMenu'>
        <div className='selectedLang' onClick={async (e) => {
            const elem = await document.getElementById("menu")

            if(elem !== null) {
                if(elem.classList.contains("open")) elem.classList.remove("open")
                else elem.classList.add("open")
            }
        }}>
            <img src={`languages/${selectedLang}.png`} alt=''/>
        </div>
        <div className='selectLangMenu' id='menu'>
            <ul>
                <li onClick={(e) => {i18n.changeLanguage("en"); setSelectedLang("en"); localStorage.setItem("language", "en")}}>
                    <img src={`languages/en.png`} alt=''/>
                    <p>English</p>
                </li>
                <li onClick={(e) => {i18n.changeLanguage("de"); setSelectedLang("de"); localStorage.setItem("language", "de")}}>
                    <img src={`languages/de.png`} alt=''/>
                    <p>German</p>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default LanguageSwitcher
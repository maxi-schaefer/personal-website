import Tippy from '@tippyjs/react'
import React from 'react'
import { useState, useEffect } from 'react'
import { TbMoon } from 'react-icons/tb'
import { changeTheme } from '../../utils'

const Footer = () => {

  const [time, setTime] = useState(new Date())
  const formattedTime = time.toLocaleTimeString("de-DE");

  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  })

  return (
    <footer>
        <div className="left">
            <div>Made with <span style={{ color: "var(--primary)"}}>♥️</span></div>
            <div style={{ paddingLeft: "10px", paddingRight: "10px"}}>•</div>
            <div>Current Time: <span style={{ color: "var(--primary)"}}>{formattedTime}</span></div>
        </div>
        <div className="right">
            <div>
              <Tippy content="Change Theme (t)">
                <div>
                  <TbMoon className='theme' onClick={changeTheme} />
                </div>
              </Tippy>
            </div>
            <div style={{ paddingLeft: "10px", paddingRight: "10px"}}>•</div>
            <a href="https://github.com/gokiimax/personal-website">View Source</a>
        </div>
    </footer>
  )
}

export default Footer
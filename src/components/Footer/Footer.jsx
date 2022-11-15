import Tippy from '@tippyjs/react'
import React from 'react'
import { TbMoon } from 'react-icons/tb'
import changeTheme from '../../utils'

const Footer = () => {
  return (
    <footer>
        <div className="left">
            <a href="/">{window.location.href}</a>
            <div style={{ paddingLeft: "10px", paddingRight: "10px"}}>•</div>
            <div>{new Date().getFullYear()}</div>
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
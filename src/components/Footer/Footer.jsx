import React from 'react'

const Footer = () => {
  return (
    <footer>
        <div className="left">
            <a href="/">gokiimax.github.io</a>
            <div style={{ paddingLeft: "10px", paddingRight: "10px"}}>•</div>
            <div>{new Date().getFullYear()}</div>
        </div>
        <div className="right">
            <div>Github</div>
            <div style={{ paddingLeft: "10px", paddingRight: "10px"}}>•</div>
            <a href="/">View Source</a>
        </div>
    </footer>
  )
}

export default Footer
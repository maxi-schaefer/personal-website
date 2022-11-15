import { TbBrandTwitter, TbBrandGithub, TbBrandYoutube, TbMail } from 'react-icons/tb'
import './Information.scss'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // 
import { useEffect, useState } from 'react';

const Information = (props) => {

    const { data } = props

    return (
        <>
            <div id="wrapper">
                <div className='container'>
                    <div className="text">
                        <div className='name'>
                            <h1 className="name">Maxi Schäfer</h1>
                        </div>
                        <div className='readMe'>
                            <div className='info'>Hi there <span>👋🏼</span> I'm Maxi, I'm <span className='years'>16</span> years old.</div>
                            <div className='info'>Self-taught developer</div>
                            <div className='info'>Experienced with ReactJS and Linux Systems</div>
                        </div>

                        <ul className="socials">
                            <li>
                                <Tippy content='Twitter' placement='bottom'>
                                    <a className='Twitter' href="https://twitter.com/gokimax_x" target="_blank"><TbBrandTwitter /></a>
                                </Tippy>
                            </li>
                            <li>
                                <Tippy content='Github' placement='bottom'>
                                    <a className='Github' href="https://github.com/gokiimax" target="_blank"><TbBrandGithub /></a>
                                </Tippy>
                            </li>
                            <li>
                                <Tippy content='Youtube' placement='bottom'>
                                    <a className='Youtube' href="https://www.youtube.com/@gokimax" target="_blank"><TbBrandYoutube /></a>
                                </Tippy>
                            </li>
                            <li>
                                <Tippy content='Email' placement='bottom'>
                                    <a className='Email' href="mailto:schaefer.maxi09101@gmail.com" target="_blank"><TbMail /></a>
                                </Tippy>
                            </li>
                        </ul>
                    </div>
                    <div className="image">
                        <img src={data.avatar_url} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Information
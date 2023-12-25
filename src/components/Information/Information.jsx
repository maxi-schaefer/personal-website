import { TbBrandTwitter, TbBrandGithub, TbBrandYoutube, TbMail, TbBrandDiscord } from 'react-icons/tb'
import { BsTriangleFill } from 'react-icons/bs'
import './Information.scss'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { motion } from 'framer-motion'; 
import config from '../../config.json' 
import { useLanyard } from "react-use-lanyard";
import Spotify from '../Spotify/Spotify'


const Information = (props) => {

    const { data } = props
    
    const lanyard = useLanyard({
		userId: config.discord_user,
	});

    return (
        <>
            <motion.div id="wrapper" animate={{ scale: '1', transition: { duration: 1, } }}>
                <div className='container'>
                    <div className='readme_container'>
                        <div className="text">
                            <div className='name'>
                                <h1 className="name">Maxi Schäfer
                                    <Tippy content="Also known as: “gokimax“" placement='bottom' style={{ marginLeft: "10px"}}>
                                        <a><BsTriangleFill size={10} style={{ rotate: "180deg", marginLeft: "10px"}}/></a>
                                    </Tippy>
                                </h1>
                            </div>
                            <div className='readMe'>
                                <div className='info'>Hi there <span>👋🏼</span> I'm Maxi, I'm a <span style={{ textDecoration: "underline" }}>17</span> year old Student from Germany.</div>
                                <div className='info'>Self-taught Developer</div>
                                <div className='info'>“Never play to win a pawn while your development is yet unfinished.” - <a href='https://de.wikipedia.org/wiki/Aaron_Nimzowitsch' target='_blank'>Aron Nimzowitsch</a></div>
                            </div>

                            <br/>

                            <ul className="socials">
                                <li>
                                    <Tippy content='Twitter' placement='bottom'>
                                        <a className='Twitter' href="https://twitter.com/gokimax_x" target="_blank" rel="noreferrer"><TbBrandTwitter /></a>
                                    </Tippy>
                                </li>
                                <li>
                                    <Tippy content='Github' placement='bottom'>
                                        <a className='Github' href="https://github.com/maxi-schaefer" target="_blank" rel="noreferrer"><TbBrandGithub /></a>
                                    </Tippy>
                                </li>
                                <li>
                                    <Tippy content='Youtube' placement='bottom'>
                                        <a className='Youtube' href="https://www.youtube.com/@gokimax" target="_blank" rel="noreferrer"><TbBrandYoutube /></a>
                                    </Tippy>
                                </li>
                                <li>
                                    <Tippy content='Email' placement='bottom'>
                                        <a className='Email' href="mailto:maxi.schaefer.dev@gmail.com"><TbMail /></a>
                                    </Tippy>
                                </li>
                                <li>
                                    <Tippy content='Discord' placement='bottom'>
                                        <a className='Discord' href={`https://discordapp.com/users/${config.discord_user}`} target="_blank" rel="noreferrer"><TbBrandDiscord /></a>
                                    </Tippy>
                                </li>
                            </ul>
                        </div>
                        <div className="image">
                            {
                                !lanyard.isValidating && (<Tippy content="Discord Status" placement='bottom'><pre className='infos' style={{ backgroundColor: `${lanyard.data.data.discord_status === "dnd" ? "#f74343" : lanyard.data.data.discord_status === "online" ? "#37d451" : lanyard.data.data.discord_status === "idle" ? "#f1b634" : "636363" }`}}/></Tippy>)
                            }
                            <img src={data.avatar_url} alt="" />
                        </div>
                    </div>
                    {
                        !lanyard.isValidating && (<Spotify data={lanyard.data.data.spotify} listening_to_spotify={lanyard.data.data.listening_to_spotify}/>)
                    }
                </div>
            </motion.div>
        </>
    )
}

export default Information
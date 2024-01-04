import $ from 'jquery';
import i18n from "i18next";
import config from "./config.json"
import { motion } from "framer-motion";
import { CustomToastify } from './utils'
import { BsStarFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { TbBrandGithub } from "react-icons/tb";
import Snow from './components/Christmas/Snow';
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer/Footer";
import { initReactI18next } from 'react-i18next';
import { changeTheme, isChristmas } from './utils';
import Contact from './components/Contact/Contact';
import Projects from "./components/Projects/Projects";
import translationEN from './locales/en/translation.json';
import translationSP from './locales/sp/translation.json';
import translationDE from './locales/de/translation.json';
import Information from "./components/Information/Information";
import AnimatedTitle from "./components/AnimatedTitle/AnimatedTitle";
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher';

function App() {
  const [githubData, setGithubData] = useState([])

  /* ====================================================================================== */
  // i18n resources
  const resources = {
    en: {
      translation: translationEN,
    },
    de: {
      translation: translationDE,
    },
    sp: {
      translation: translationSP,
    }
  }
  
  i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem("language"),
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

  /* ====================================================================================== */
  
  const githubToast = () => (
    <div>
      Follow me on <a style={{ color: "var(--primary)"}} href="https://github.com/maxi-schaefer" target="_blank" rel="noreferrer">Github</a>
    </div>
  )
  
  const githubStarToast = () => (
    <div>
      Star this project on <a style={{ color: "var(--primary)"}} href="https://github.com/maxi-schaefer/personal-website" target="_blank" rel="noreferrer">Github</a>
    </div>
  )
  
  useEffect(() => {
    fetchData(config.git_user).catch(console.error)
    document.body.setAttribute('data-theme', localStorage.getItem("selectedTheme"));
    CustomToastify(githubStarToast, <BsStarFill style={{ color: "#fcf347", width: "50px", height: "50px"}} />);
    CustomToastify(githubToast, <TbBrandGithub style={{ color: "var(--primary)", width: "50px", height: "50px"}} />);
  }, [])
  
  /* ====================================================================================== */
  
  const snow=()=> {
    let animationDelay = '0s';
    let fontSize = '100px';
    let arr = Array.from('Snowflakes are awesome!!! They are like little pieces of magic!!! Love snowflakes!!! Snowflakes are awesome!!! They are like little pieces of magic!!! Love snowflakes!!! Snowflakes are awesome!!! They are like little pieces of magic!!! Love snowflakes!!!')
    return arr.map((el, i) => {
      animationDelay = `${(Math.random()*24).toFixed(2)}s`;
      fontSize = `${(Math.floor(Math.random()*10) + 10)}px`;
      let style = {
        animationDelay,
        fontSize
      }
      return (<Snow key={i} id={i} style={style}/>)
    })
  }
  
  /* ====================================================================================== */
  
  // Animated Title
  const titles = [
    'Vibing • Maxi Schäfer ',
    'ibing • Maxi Schäfer V',
    'bing • Maxi Schäfer Vi',
    'ing • Maxi Schäfer Vib',
    'ng • Maxi Schäfer Vibi',
    'g • Maxi Schäfer Vibin',
    ' • Maxi Schäfer Vibing',
    '• Maxi Schäfer Vibing ',
    ' Maxi Schäfer Vibing •',
    'Maxi Schäfer Vibing • ',
    'axi Schäfer Vibing • M',
    'xi Schäfer Vibing • Ma',
    'i Schäfer Vibing • Max',
    ' Schäfer Vibing • Maxi',
    'Schäfer Vibing • Maxi ',
    'chäfer Vibing • Maxi S',
    'häfer Vibing • Maxi Sc',
    'äfer Vibing • Maxi Sch',
    'fer Vibing • Maxi Schä',
    'er Vibing • Maxi Schäf',
    'r Vibing • Maxi Schäfe',
    ' Vibing • Maxi Schäfer',
  ]
  
  /* ====================================================================================== */
  
  const fetchData = async (user) => {
    const apiResponse = await fetch(`https://api.github.com/users/${user}`)
    const data = await apiResponse.json()
    if(data.status === 404) {
      return;
    } else {
      setGithubData(data)
    }
  }
  
  const changeThemeWithKey = (e) => {
    if($(e.target).is('input') || $(e.target).is('textarea')) return;
    else {
      if(e.keyCode === 84) {
        changeTheme()
      }
    }
  }
  
  /* ====================================================================================== */
  
  return (
    <>
      <ToastContainer />
      <AnimatedTitle titles={titles} time={1000}/>
      {isChristmas() ? snow() : null}
      <motion.div id="#main" tabIndex="0" onKeyDown={changeThemeWithKey} initial={{ opacity: 0 }} animate={{ transition: { duration: 2.5 }, opacity: 1, }}>
          <LanguageSwitcher currentLang={i18n.language} i18n={i18n} />
          <Information data={githubData}/>
          <Projects data={config.projects}/>
          <Contact /> 
          <Footer />
      </motion.div>
    </>
    
  );
}

export default App;


import { useEffect, useState } from "react";
import config from "./config.json"
import Contact from './components/Contact/Contact';
import Footer from "./components/Footer/Footer";
import Information from "./components/Information/Information";
import Projects from "./components/Projects/Projects";
import { changeTheme, isChristmas } from './utils'
import AnimatedTitle from "./components/AnimatedTitle/AnimatedTitle";
import Snow from './components/Christmas/Snow';
import { motion } from "framer-motion";
import $ from 'jquery';
import { ToastContainer } from "react-toastify";

function App() {
  const [githubData, setGithubData] = useState([])

  const snow=()=> {
    let animationDelay = '0s';
    let fontSize = '100px';
    let arr = Array.from('Snowflakes are awesome!!! They are like little pieces of magic!!! Love snowflakes!!! Snowflakes are awesome!!! They are like little pieces of magic!!! Love snowflakes!!! Snowflakes are awesome!!! They are like little pieces of magic!!! Love snowflakes!!!')
     return arr.map((el, i) => {
      animationDelay = `${(Math.random()*16).toFixed(2)}s`;
      fontSize = `${(Math.floor(Math.random()*10) + 10)}px`;
      let style = {
        animationDelay,
        fontSize
      }
      return (<Snow key={i} id={i} style={style}/>)
     })
  }

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

  const fetchData = async (user) => {
      const apiResponse = await fetch(`https://api.github.com/users/${user}`)
      const data = await apiResponse.json()
      if(data.status === 404) {
        return;
      } else {
        setGithubData(data)
      }
    }

  useEffect(() => {
      fetchData(config.git_user).catch(console.error)
      document.body.setAttribute('data-theme', localStorage.getItem("selectedTheme"));      
    }, [])

  const changeThemeWithKey = (e) => {
    if($(e.target).is('input') || $(e.target).is('textarea')) return;
    else {
      if(e.keyCode === 84) {
        changeTheme()
      }
    }
  }

  return (
    <>
      <AnimatedTitle titles={titles} time={1000}/>
      <motion.div id="#main" tabIndex="0" onKeyDown={changeThemeWithKey} initial={{ opacity: 0 }} animate={{ transition: { duration: 2.5 }, opacity: 1, }}>
          <ToastContainer />
          {!isChristmas() ? snow() : null}
          <Information data={githubData}/>
          <Projects data={config.projects}/>
          <Contact /> 
          <Footer />
      </motion.div>
    </>
    
  );
}

export default App;


import { useEffect, useState } from "react";
import Footer from "./components/Footer/Footer";
import Information from "./components/Information/Information";
import Projects from "./components/Projects/Projects";
import changeTheme from "./utils";

function App() {
  const [githubData, setGithubData] = useState([])
  const [githubRepos, setGithubRepos] = useState([])

  const fetchData = async (user) => {
      const apiResponse = await fetch(`https://api.github.com/users/${user}`)
      const data = await apiResponse.json()
      if(data.status === 404) {
        return;
      } else {
        setGithubData(data)
      }
    }

  const fetchRepos = async (user) => {
    const apiResponse = await fetch(`https://gh-pinned-repos.egoist.dev/?username=${user}`)
    const data = await apiResponse.json()
    setGithubRepos(data)
  }

  useEffect(() => {
      fetchData("gokiimax").catch(console.error)
      fetchRepos("gokiimax").catch(console.error)
    }, [])

  const changeThemeWithKey = (e) => {
    if(e.keyCode === 84) {
      changeTheme()
    }
  }

  return (
    <body className={window.localStorage.getItem("Theme")}>      
      <div id="#main" tabIndex="0" onKeyDown={changeThemeWithKey}>
          <Information data={githubData}/>
          <Projects data={githubRepos}/>
          <Footer />
      </div>
    </body>
  );
}

export default App;


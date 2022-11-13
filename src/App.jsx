import { useEffect, useState } from "react";
import Footer from "./components/Footer/Footer";
import Information from "./components/Information/Information";
import Projects from "./components/Projects/Projects";

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
    console.log(data)
    setGithubRepos(data)
  }

  useEffect(() => {
      fetchData("gokiimax").catch(console.error)
      fetchRepos("gokiimax").catch(console.error)
    }, [])

  return (
    <div>      
        <Information data={githubData}/>
        <Projects data={githubRepos}/>
        <Footer />
    </div>
  );
}

export default App;

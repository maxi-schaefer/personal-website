import './Project.scss'
import ProjectCard from './ProjectCard'

const Projects = (props) => {
    const { data } = props

  return (
    <div className="container_cards">
        <h1>Example Projects</h1>
        <div className='CardContainer'>
            {
                data.map((project) => {
                    return(
                        <a key={project.id} href={project.url} target='_blank' rel="noreferrer" style={{ textDecoration: 'none'}}>
                            <ProjectCard key={project.id} project={project} />
                        </a>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Projects
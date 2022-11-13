import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Project.scss'
import ProjectCard from './ProjectCard'

const Projects = (props) => {
    const { data } = props

  return (
    <div className="container_cards">
        <h1>Pinned Repositories</h1>
        <div className='CardContainer'>
            {
                data.map((repo) => {
                    return(
                        <a href={repo.link} style={{ textDecoration: 'none'}}>
                            <ProjectCard key={repo.link} repo={repo} />
                        </a>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Projects
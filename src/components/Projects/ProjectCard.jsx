import React from 'react'
import { FaCircle } from 'react-icons/fa'
import { TbStar, TbGitFork } from 'react-icons/tb'

const ProjectCard = (props) => {

    const { repo } = props;

    let repoStars;
    let repoForks;
    if (repo.stars >= 1) {
        repoStars = (
            <li>
                <TbStar />
                {repo.stars}
            </li>
        )
    }

    if(repo.forks >= 1) {
        repoForks = (
            <li>
                <TbGitFork />
                {repo.forks}
            </li>
        )
    }

    return (
        <div className="card">
            <h3 className="project_name">{repo.repo}</h3>
            <p className="description">{repo.description}</p>
            <ul className="info">
                <li>
                    <FaCircle style={{ color: repo.languageColor}} />
                    {" " + repo.language}
                </li>
                {repoStars}
                {repoForks}
            </ul>
        </div>
    )
}

export default ProjectCard
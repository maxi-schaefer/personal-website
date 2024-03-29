import React from 'react'
import { FaCircle } from 'react-icons/fa'
import { getLanguageColor } from '../../utils.js'
import { useTranslation } from 'react-i18next';

const ProjectCard = (props) => {

    const { project } = props;
    const { t } = useTranslation();

    return (
        <div className="card">
            <div className="image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + project.cover})`, backgroundSize: "cover"}}>
                <div className='cover'/>
            </div>
            <div className='info'>
                <div className='project_name'>{project.name}</div>
                <div className='project_description'>{t(`projects.${project.name.toLowerCase().replaceAll(" ", "_")}`)}</div>
                <div className='language' style={{ color: `${getLanguageColor(project.language)}`, border: `1.5px solid ${getLanguageColor(project.language)}` }}><FaCircle size={6}/> {project.language}</div>
            </div>
        </div>
    )
}

export default ProjectCard
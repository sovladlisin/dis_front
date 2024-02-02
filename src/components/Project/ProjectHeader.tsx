import * as React from 'react';
import { TProject } from '../../actions/projects/types';
import { Link } from 'react-router-dom'
import ProjectForm from '../Forms/ProjectForm';
import { encode, getNodeLabel } from '../../utils';
import PageForm from '../Forms/PageForm';
import { useDispatch } from 'react-redux';
import { collectProjectEmbeddings } from '../../actions/projects/projects';
interface IProjectHeaderProps {
    project: TProject
}

const ProjectHeader: React.FunctionComponent<IProjectHeaderProps> = (props) => {
    const dispatch = useDispatch()
    const [settingsWindow, setSettingsWindow] = React.useState(false)


    const [pageWindow, setPageWindow] = React.useState(false)


    return <>
        <div className='project-header'>
            <div className='project-header-inner'>
                <Link to={'/project/' + props.project.id + '/home'} className='project-header-name'>{props.project.name}</Link>
                <div className='project-header-controls'>
                    <button onClick={_ => setSettingsWindow(true)}><i className='fas fa-cog'></i></button>
                </div>
                <div className='project-header-navigation'>
                    <button onClick={_ => setPageWindow(true)}><i className='fas fa-plus'></i></button>
                    {props.project.pages?.map(n => {
                        return <Link to={'/project/' + props.project.id + '/customPage/' + n.id}>{n.name}</Link>
                    })}
                    <Link to={'/project/' + props.project.id + '/ontologies'}>Онтология</Link>
                    <Link to={'/project/' + props.project.id + '/resources'}>Ресурсы</Link>
                    <Link to={'/project/' + props.project.id + '/learn'}>Learn</Link>
                    <Link className={'color-red'} to={'/project/' + props.project.id + '/files'}>Файлы</Link>
                </div>
            </div>
        </div>

        {settingsWindow && <ProjectForm project={props.project} onClose={() => setSettingsWindow(false)} />}
        {pageWindow && <PageForm project={props.project} onClose={() => setPageWindow(false)} />}
    </>;
};

export default ProjectHeader;

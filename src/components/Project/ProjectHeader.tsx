import * as React from 'react';
import { TProject } from '../../actions/projects/types';
import { Link } from 'react-router-dom'
import ProjectForm from '../Forms/ProjectForm';
import { encode, getNodeLabel } from '../../utils';
interface IProjectHeaderProps {
    project: TProject
}

const ProjectHeader: React.FunctionComponent<IProjectHeaderProps> = (props) => {

    const [settingsWindow, setSettingsWindow] = React.useState(false)



    return <>
        <div className='project-header'>
            <div className='project-header-inner'>
                <Link to={'/project/' + props.project.id + '/home'} className='project-header-name'>{props.project.name}</Link>
                <div className='project-header-controls'>
                    <button onClick={_ => setSettingsWindow(true)}><i className='fas fa-cog'></i></button>
                </div>
                <div className='project-header-navigation'>
                    {props.project.resource_star_items.map(n => {
                        return <Link to={'/project/' + props.project.id + '/customPage/' + encode(n.data.uri)}>{getNodeLabel(n)}</Link>
                    })}

                    <Link to={'/project/' + props.project.id + '/ontologies'}>Онтология</Link>
                    <Link to={'/project/' + props.project.id + '/resources'}>Ресурсы</Link>
                    <Link className={'color-red'} to={'/project/' + props.project.id + '/files'}>Файлы</Link>
                </div>
            </div>
        </div>

        {settingsWindow && <ProjectForm project={props.project} onClose={() => setSettingsWindow(false)} />}
    </>;
};

export default ProjectHeader;

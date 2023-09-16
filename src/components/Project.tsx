import * as React from 'react';
import { TProject } from '../actions/projects/types';
import ProjectHeader from './Project/ProjectHeader';
import ProjectFooter from './Project/ProjectFooter';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../store';
import { getOntologies, getResourceOntologies } from '../actions/ontology/ontology';
import { getProject } from '../actions/projects/projects';


interface IProjectProps {
    slot: React.FunctionComponent<{
        project: TProject
    }>
}

const Project: React.FunctionComponent<IProjectProps> = (props) => {
    const project_id: number = parseInt(window.location.href.split('project')[1].split('/')[1])

    const dispatch = useDispatch()
    const projectState = useSelector((state: RootStore) => state.projects)
    const [project, setProject] = React.useState<TProject>(null)

    React.useEffect(() => {
        dispatch(getProject(project_id))
        dispatch(getOntologies())
        dispatch(getResourceOntologies())
    }, [])

    React.useEffect(() => {
        if (projectState.selected_project && project_id === projectState.selected_project.id)
            setProject(projectState.selected_project)
    }, [
        projectState.selected_project
    ])
    return <>

        {project && <>
            <ProjectHeader project={project} />
            <div className='project-workspace'>
                <props.slot project={project} />
            </div>
            <ProjectFooter project={project} />
        </>}
    </>;
};

export default Project;

import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProject, getProjects } from '../actions/projects/projects';
import { RootStore } from '../store';
import { Link } from 'react-router-dom'
import ProjectForm from './Forms/ProjectForm';
interface IProjectsPageProps {
}

const ProjectsPage: React.FunctionComponent<IProjectsPageProps> = (props) => {
    const dispatch = useDispatch()
    const projectState = useSelector((state: RootStore) => state.projects)
    const [projectFormWindowNew, setProjectFormWindowNew] = React.useState(false)

    return <>
        <h1 className='m-title'>Проекты</h1>
        <div className='m-project-list'>
            <button className='m-list-add' onClick={_ => { setProjectFormWindowNew(true); }}><i className='fas fa-plus'></i></button>
            {projectState.projects instanceof Array && projectState.projects.map(p => {
                return <>
                    <div className=''>
                        <p>{p.name}</p>
                        <div className='m-project-controls'>
                            <Link className='m-list-open bg-blue color-white' target='_blank' to={'/project/' + p.id + '/home'}>Открыть</Link>
                            <button onClick={_ => dispatch(deleteProject(p.id))} className=' color-white bg-red'><i className='fas fa-trash'></i></button>
                        </div>
                    </div>
                </>
            })}

        </div>
        {projectFormWindowNew && <ProjectForm onClose={() => setProjectFormWindowNew(false)} />}

    </>;
};

export default ProjectsPage;

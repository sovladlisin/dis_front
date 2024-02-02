import * as React from 'react';
import { TProject } from '../../actions/projects/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { CLASS, SERVER_URL, getNodeLabel } from '../../utils';
import { createProject, updateProject } from '../../actions/projects/projects';
import axios from 'axios';
import { withToken } from '../../actions/auth/auth';
import { TNode } from '../../actions/graph/types';

interface IProjectFormProps {
    project?: TProject,
    onClose: () => void,
}

const ProjectForm: React.FunctionComponent<IProjectFormProps> = (props) => {
    const dispatch = useDispatch()

    const ontologyState = useSelector((state: RootStore) => state.ontology)

    const [project, setProject] = React.useState<TProject>(props.project ? props.project : {
        name: 'Не указано',
        id: -1,
        pages: [],
        ontologies_uris: [],
        res_ontologies_uris: '',
        selected_classes_uris: [],
        res_selected_classes_uris: [],
        res_star_classes_uris: []
    })

    const ref = React.useRef()

    const toggleOntoUris = (uri: string) => {
        if (project.id === -1)
            project.ontologies_uris.includes(uri) ?
                setProject({ ...project, ontologies_uris: project.ontologies_uris.filter(u => u != uri) }) :
                setProject({ ...project, ontologies_uris: [...project.ontologies_uris, uri] })
    }
    const toggleResOntoUris = (uri: string) => {
        if (project.id === -1)
            project.res_ontologies_uris === uri ?
                setProject({ ...project, res_ontologies_uris: '' }) :
                setProject({ ...project, res_ontologies_uris: uri })
    }
    const toggleSelClassesUris = (uri: string) => {
        if (project.id != -1)
            project.selected_classes_uris.includes(uri) ?
                setProject({ ...project, selected_classes_uris: project.selected_classes_uris.filter(u => u != uri) }) :
                setProject({ ...project, selected_classes_uris: [...project.selected_classes_uris, uri] })
    }
    const toggleResSelClassesUris = (uri: string) => {
        if (project.id != -1)
            project.res_selected_classes_uris.includes(uri) ?
                setProject({ ...project, res_selected_classes_uris: project.res_selected_classes_uris.filter(u => u != uri) }) :
                setProject({ ...project, res_selected_classes_uris: [...project.res_selected_classes_uris, uri] })
    }

    const toggleResStarClassesUris = (uri: string) => {
        if (project.id != -1)
            project.res_star_classes_uris.includes(uri) ?
                setProject({ ...project, res_star_classes_uris: project.res_star_classes_uris.filter(u => u != uri) }) :
                setProject({ ...project, res_star_classes_uris: [...project.res_star_classes_uris, uri] })
    }

    const onSave = () => {
        if (project.id === -1) dispatch(createProject(project.name, project.ontologies_uris, project.res_ontologies_uris))
        else dispatch(updateProject(project.id, project.name, project.selected_classes_uris, project.res_selected_classes_uris, project.res_star_classes_uris))

    }

    const [resourceOntologyClassesSearch, setResourceOntologyClassesSearch] = React.useState('')
    const [resourceOntologyClassesStarSearch, setResourceOntologyClassesStarSearch] = React.useState('')
    const [resourceOntologyClasses, setResourceOntologyClasses] = React.useState<TNode[]>([])
    const onResLoad = async () => {
        const params = withToken({ uri: project.res_ontologies_uris })
        var response = await axios.get(SERVER_URL + '/getGraph', params)
        const items: TNode[] = response.data.nodes

        const n_i = items.filter(n => n.data.labels.includes(CLASS))
        setResourceOntologyClasses(n_i)
    }
    React.useEffect(() => {
        onResLoad()
    }, [])

    return <>
        <div className='m-form' ref={ref}>
            <p className='m-form-title'>Проект</p>
            <div className='m-form-fields'>
                <label>Название</label>
                <input placeholder='...' value={project.name} onChange={e => setProject({ ...project, name: e.target.value })}></input>

                {project.id === -1 && <>
                    <label>Онтологии ресурсов</label>
                    <div className='m-form-select-list'>
                        {ontologyState.resource_ontologies.map(o => {
                            const selected = project.res_ontologies_uris === o.data.uri
                            return <>
                                <button onClick={_ => toggleResOntoUris(o.data.uri)}><p>{getNodeLabel(o)}</p><i className={selected ? 'fas fa-check-square' : 'fas fa-square'}></i></button>
                            </>
                        })}
                    </div>

                    <label>Онтологии</label>
                    <div className='m-form-select-list'>
                        {ontologyState.ontologies.map(o => {
                            const selected = project.ontologies_uris.includes(o.data.uri)
                            return <>
                                <button onClick={_ => toggleOntoUris(o.data.uri)}><p>{getNodeLabel(o)}</p><i className={selected ? 'fas fa-check-square' : 'fas fa-square'}></i></button>
                            </>
                        })}
                    </div>
                </>}

                {project.id != -1 && <>
                    <label>Отображаемые ресурсы (галерея)</label>
                    <div className='m-form-select-list-with-search'>
                        <div className='m-form-select-list-with-search-search'>
                            <span className='fas fa-search'></span>
                            <input value={resourceOntologyClassesSearch} onChange={e => setResourceOntologyClassesSearch(e.target.value)} placeholder='Поиск'></input>
                        </div>
                        <div className='m-form-select-list-with-search-list'>
                            {resourceOntologyClasses.filter(o => getNodeLabel(o).includes(resourceOntologyClassesSearch)).map(o => {
                                const selected = project.res_selected_classes_uris.includes(o.data.uri)
                                return <>
                                    <button onClick={_ => toggleResSelClassesUris(o.data.uri)}><i className={selected ? 'fas fa-check-square color-blue' : 'fas fa-square'}></i><p>{getNodeLabel(o)}</p></button>
                                </>
                            })}
                        </div>
                    </div>

                    <label>Отображаемые ресурсы (заголовок)</label>
                    <div className='m-form-select-list-with-search'>
                        <div className='m-form-select-list-with-search-search'>
                            <span className='fas fa-search'></span>
                            <input value={resourceOntologyClassesStarSearch} onChange={e => setResourceOntologyClassesStarSearch(e.target.value)} placeholder='Поиск'></input>
                        </div>
                        <div className='m-form-select-list-with-search-list'>
                            {resourceOntologyClasses.filter(o => getNodeLabel(o).includes(resourceOntologyClassesStarSearch)).map(o => {
                                const selected = project.res_star_classes_uris.includes(o.data.uri)
                                return <>
                                    <button onClick={_ => toggleResStarClassesUris(o.data.uri)}><i className={selected ? 'fas fa-check-square color-blue' : 'fas fa-square'}></i><p>{getNodeLabel(o)}</p></button>
                                </>
                            })}
                        </div>
                    </div>
                </>}
            </div>

            <div className='m-form-controls'>
                <button className='bg-blue' onClick={onSave}>Сохранить</button>
                <button className='bg-red' onClick={props.onClose}>Отмена</button>
            </div>
        </div>

    </>;
};

export default ProjectForm;

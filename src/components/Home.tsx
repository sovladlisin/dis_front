import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { TNode } from '../actions/graph/types';
import { getOntologies, getPatternOntologies, getResourceOntologies } from '../actions/ontology/ontology';
import { RootStore } from '../store';
import { encode, getNodeLabel } from '../utils';
import OntologyForm from './Forms/OntologyForm';
import { getProjects } from '../actions/projects/projects';
import { TProject } from '../actions/projects/types';
import ProjectForm from './Forms/ProjectForm';

interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getOntologies())
        dispatch(getResourceOntologies())
        dispatch(getPatternOntologies())
        dispatch(getProjects())
    }, [])
    const ontologyState = useSelector((state: RootStore) => state.ontology)
    const projectState = useSelector((state: RootStore) => state.projects)


    const [ontologyForm, setOntologyForm] = React.useState<TNode>(null)
    const [createOntology, setCreateOntology] = React.useState(null)
    const [projectFormWindowNew, setProjectFormWindowNew] = React.useState(false)
    const [branchOntology, setBranchOntology] = React.useState<TNode>(null)
    const [branchResource, setBranchResource] = React.useState<TNode>(null)

    return <>
        <div className='home-container'>
            <h1 className='home-title'>Проекты</h1>
            <div className='home-ontology-list'>
                {projectState.projects.map(p => {
                    return <>
                        <div className=''>
                            <p>{p.name}</p>
                            <Link className='home-ontology-list-open' target='_blank' to={'/project/' + p.id + '/home'}>Открыть</Link>
                        </div>
                    </>
                })}

                <button onClick={_ => { setProjectFormWindowNew(true); }}><i className='fas fa-plus'></i></button>
            </div>

            <h1 className='home-title'>Онтологии ресурсов</h1>
            <div className='home-ontology-list'>
                {ontologyState.resource_ontologies.map(o => {
                    return <>
                        <div className=''>
                            <p>{getNodeLabel(o)}</p>
                            <Link className='home-ontology-list-open' target='_blank' to={'/graph/' + encode(o.data.uri)}>Открыть</Link>
                            <button className='home-ontology-list-expand' onClick={_ => setBranchResource(o)}>Наследовать</button>
                        </div>
                    </>
                })}

                <button onClick={_ => setCreateOntology(2)}><i className='fas fa-plus'></i></button>
            </div>
            <h1 className='home-title'>Онтологии</h1>

            <div className='home-ontology-list'>
                {ontologyState.ontologies.map(o => {
                    return <>
                        <div className=''>
                            <p>{getNodeLabel(o)}</p>
                            <Link className='home-ontology-list-open' target='_blank' to={'/graph/' + encode(o.data.uri)}>Открыть</Link>
                            <button className='home-ontology-list-expand' onClick={_ => setBranchOntology(o)}>Наследовать</button>
                        </div>
                    </>
                })}

                <button onClick={_ => setCreateOntology(1)}><i className='fas fa-plus'></i></button>
            </div>

            <h1 className='home-title'>Паттерны</h1>

            <div className='home-ontology-list'>
                {ontologyState.pattern_ontologies.map(o => {
                    return <>
                        <div className=''>
                            <p>{getNodeLabel(o)}</p>
                            <Link className='home-ontology-list-open' target='_blank' to={'/graph/' + encode(o.data.uri)}>Открыть</Link>
                        </div>
                    </>
                })}

                <button onClick={_ => setCreateOntology(3)}><i className='fas fa-plus'></i></button>
            </div>
        </div>

        {createOntology && <OntologyForm create_type={createOntology} onClose={() => setCreateOntology(null)} />}
        {branchOntology && <OntologyForm create_type={11} onClose={() => setBranchOntology(null)} ontology={branchOntology} />}
        {branchResource && <OntologyForm create_type={22} onClose={() => setBranchResource(null)} ontology={branchResource} />}
        {projectFormWindowNew && <ProjectForm onClose={() => setProjectFormWindowNew(false)} />}

    </>;
};

export default Home;

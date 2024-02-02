import * as React from 'react';
import { TProject } from '../../actions/projects/types';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import Graph from '../Graph/Graph';
import OntologyTree from '../Tree/OntologyTree';

interface IProjectResourcesProps {
    project: TProject
}

const ProjectResources: React.FunctionComponent<IProjectResourcesProps> = (props) => {

    const ontologyState = useSelector((state: RootStore) => state.ontology)
    const [resourceOntologyUri, setResourceIntologyUri] = React.useState('')

    React.useEffect(() => {
        setResourceIntologyUri(props.project.res_ontologies_uris)
    }, [])

    const [mode, setMode] = React.useState(2)


    const [ontologyGraphMode, setOntologyGraphMode] = React.useState(true)

    if (resourceOntologyUri.length === 0) return <></>

    return <>

        <div className='project-ontology-select'>
            <button className={mode === 1 && 'bg-blue color-white'} onClick={_ => setMode(1)}>Галерея</button>
            <button className={mode === 2 && 'bg-blue color-white'} onClick={_ => setMode(2)}>Онтология</button>
            {mode == 2 && <>
                <button onClick={_ => setOntologyGraphMode(!ontologyGraphMode)} id='flip-ontology-mode-button'>
                    <span className={ontologyGraphMode ? ' color-white bg-blue' : ''}><i className='fas fa-project-diagram'></i></span>
                    <span className={!ontologyGraphMode ? ' color-white bg-blue' : ''}><i className='fas fa-stream'></i></span>
                </button>
            </>}
        </div>

        {mode === 1 && <div className='project-resource-gallery'></div>}
        {mode === 2 && <div className='project-ontology-graph-container'>
            {ontologyGraphMode ? <Graph uri={resourceOntologyUri} /> : <OntologyTree uri={resourceOntologyUri} />}
        </div>}


    </>;
};

export default ProjectResources;

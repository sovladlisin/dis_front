import * as React from 'react';
import { TProject } from '../../actions/projects/types';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import Graph from '../Graph';

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


    if (resourceOntologyUri.length === 0) return <></>

    return <>

        <div className='project-ontology-select'>
            <button className={mode === 1 && 'selected'} onClick={_ => setMode(1)}>Галерея</button>
            <button className={mode === 2 && 'selected'} onClick={_ => setMode(2)}>Онтология</button>
        </div>

        {mode === 1 && <div className='project-resource-gallery'></div>}
        {mode === 2 && <div className='project-ontology-graph-container'><Graph uri={resourceOntologyUri} /></div>}


    </>;
};

export default ProjectResources;

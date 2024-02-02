import * as React from 'react';
import { TProject } from '../../actions/projects/types';
import { useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { getNodeLabel } from '../../utils';
import Graph from '../Graph/Graph';
import OntologyTree from '../Tree/OntologyTree';

interface IProjectOntologiesProps {
    project: TProject
}

const ProjectOntologies: React.FunctionComponent<IProjectOntologiesProps> = (props) => {

    const ontologyState = useSelector((state: RootStore) => state.ontology)
    const [selectedOntology, setSelectedOntology] = React.useState('')

    const [ontologyGraphMode, setOntologyGraphMode] = React.useState(true)

    return <>
        <div className='project-ontology-select'>
            {ontologyState.ontologies.filter(o => props.project.ontologies_uris.includes(o.data.uri)).map(o => {
                return <>
                    <button className={selectedOntology === o.data.uri && 'selected'} onClick={_ => setSelectedOntology(o.data.uri)}>{getNodeLabel(o)}</button>
                </>
            })}
            <button onClick={_ => setOntologyGraphMode(!ontologyGraphMode)} id='flip-ontology-mode-button'>
                <span className={ontologyGraphMode ? ' color-white bg-blue' : ''}><i className='fas fa-project-diagram'></i></span>
                <span className={!ontologyGraphMode ? ' color-white bg-blue' : ''}><i className='fas fa-stream'></i></span>
            </button>
        </div>


        <div className='project-ontology-graph-container'>
            {selectedOntology.length > 0 ? <>
                {ontologyGraphMode ? <Graph uri={selectedOntology} /> : <OntologyTree uri={selectedOntology} />}
            </> : <span className='project-ontology-graph-container-empty'>Выберите онтологию для просмотра</span>}
        </div>
    </>;
};

export default ProjectOntologies;

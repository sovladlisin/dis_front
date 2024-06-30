import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteOntology, getOntologies } from '../actions/ontology/ontology';
import { RootStore } from '../store';
import { getNodeLabel, encode, COMMENT } from '../utils';
import { TNode } from '../actions/graph/types';
import OntologyForm from './Forms/OntologyForm';
import { Link } from 'react-router-dom'
import EntityForm from './Forms/EntityForm/EntityForm';
interface IOntologiesPageProps {
}

const OntologiesPage: React.FunctionComponent<IOntologiesPageProps> = (props) => {
    const ontologyState = useSelector((state: RootStore) => state.ontology)
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getOntologies())
    }, [])
    const [branchOntology, setBranchOntology] = React.useState<TNode>(null)
    const [createOntology, setCreateOntology] = React.useState(null)
    const [edit, setEdit] = React.useState(null)
    const onDeleteOntology = (ontology_uri: string) => {
        dispatch(deleteOntology(ontology_uri))
    }
    return <>
        <h1 className='m-title'>Онтологии</h1>

        <div className='m-ontology-list'>
            <button className='m-list-add' onClick={_ => setCreateOntology(1)}><i className='fas fa-plus'></i></button>
            {ontologyState.ontologies instanceof Array && ontologyState.ontologies.map(o => {
                return <>
                    <div className='m-ontology-list-item'>
                        <div className='m-ontology-list-logo-container'>
                            <i className='fas fa-scroll'></i>
                            <p>{getNodeLabel(o)}</p>
                        </div>
                        <p className='m-ontology-list-description'>{o.data.params_values[COMMENT]}</p>
                        <div className='m-ontology-list-controls'>
                            <Link className=' color-white bg-blue' target='_blank' to={'/neo_graph/graph/' + encode(o.data.uri)}><i className='fas fa-project-diagram'></i><p>Открыть как граф</p></Link>
                            <Link className=' color-white bg-blue' target='_blank' to={'/neo_graph/ontology/tree/' + encode(o.data.uri)}><i className='fas fa-stream'></i><p>Открыть как дерево</p></Link>
                            <button className=' color-white bg-blue' onClick={_ => setBranchOntology(o)}><i className='fas fa-copy'></i><p>Наследовать</p></button>
                            <button className=' color-white bg-blue' onClick={_ => setEdit(o.data.uri)}><i className='fas fa-pen'></i><p>Редактировать</p></button>
                            <button className=' color-white bg-red' onClick={_ => onDeleteOntology(o.data.uri)}><i className='fas fa-trash'></i><p>Удалить</p></button>
                        </div>
                    </div>
                </>
            })}

        </div>
        {branchOntology && <OntologyForm create_type={11} onClose={() => setBranchOntology(null)} ontology={branchOntology} />}
        {createOntology && <OntologyForm create_type={createOntology} onClose={() => setCreateOntology(null)} />}
        {edit && <EntityForm ontology_uri={edit} uri={edit} onClose={() => setEdit(null)} />}
    </>;
};

export default OntologiesPage;

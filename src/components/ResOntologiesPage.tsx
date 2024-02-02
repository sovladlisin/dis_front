import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TNode } from '../actions/graph/types';
import { deleteOntology, getResourceOntologies } from '../actions/ontology/ontology';
import { RootStore } from '../store';
import { getNodeLabel, encode, COMMENT } from '../utils';
import OntologyForm from './Forms/OntologyForm';
import { Link } from 'react-router-dom'
import EntityForm from './Forms/EntityForm/EntityForm';
interface IResOntologiesPageProps {
}

const ResOntologiesPage: React.FunctionComponent<IResOntologiesPageProps> = (props) => {
    const ontologyState = useSelector((state: RootStore) => state.ontology)

    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getResourceOntologies())
    }, [])
    const [createOntology, setCreateOntology] = React.useState(null)
    const [branchResource, setBranchResource] = React.useState<TNode>(null)

    const onDeleteOntology = (ontology_uri: string) => {
        dispatch(deleteOntology(ontology_uri))
    }
    const [edit, setEdit] = React.useState(null)

    return <>
        <h1 className='m-title'>Онтологии ресурсов</h1>
        <div className='m-ontology-list'>
            <button className='m-list-add' onClick={_ => setCreateOntology(2)}><i className='fas fa-plus'></i></button>
            {ontologyState.resource_ontologies.map(o => {
                return <>
                    <div className='m-ontology-list-item'>
                        <div className='m-ontology-list-logo-container'>
                            <i className='fas fa-scroll'></i>
                            <p>{getNodeLabel(o)}</p>
                        </div>
                        <p className='m-ontology-list-description'>{o.data.params_values[COMMENT]}</p>
                        <div className='m-ontology-list-controls'>
                            <Link className=' color-white bg-blue' target='_blank' to={'/graph/' + encode(o.data.uri)}><i className='fas fa-project-diagram'></i><p>Открыть как граф</p></Link>
                            <Link className=' color-white bg-blue' target='_blank' to={'/ontology/tree/' + encode(o.data.uri)}><i className='fas fa-stream'></i><p>Открыть как дерево</p></Link>
                            <button className=' color-white bg-blue' onClick={_ => setBranchResource(o)}><i className='fas fa-copy'></i><p>Наследовать</p></button>
                            <button className=' color-white bg-blue' onClick={_ => setEdit(o.data.uri)}><i className='fas fa-pen'></i><p>Редактировать</p></button>
                            <button className=' color-white bg-red' onClick={_ => onDeleteOntology(o.data.uri)}><i className='fas fa-trash'></i><p>Удалить</p></button>
                        </div>
                    </div>
                </>
            })}

        </div>
        {branchResource && <OntologyForm create_type={22} onClose={() => setBranchResource(null)} ontology={branchResource} />}
        {createOntology && <OntologyForm create_type={createOntology} onClose={() => setCreateOntology(null)} />}
        {edit && <EntityForm ontology_uri={edit} uri={edit} onClose={() => setEdit(null)} />}

    </>;
};

export default ResOntologiesPage;

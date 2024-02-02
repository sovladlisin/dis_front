import * as React from 'react';
import { useDispatch } from 'react-redux';
import { TNode } from '../../actions/graph/types';
import { branchOntology, createOntology, createPatternOntology, createResourceOntology } from '../../actions/ontology/ontology';
import { DEFAULT_LABEL } from '../../actions/settings/types';
import { useOnClickOutside } from '../../utils';
import LabelForm from './LabelForm';

interface IOntologyFormProps {
    ontology?: TNode
    onClose: () => void,
    create_type: 1 | 2 | 3 | 11 | 22
}

const OntologyForm: React.FunctionComponent<IOntologyFormProps> = (props) => {
    const dispatch = useDispatch()

    type TState = {
        label: string[],
        uri: string,
        comment: string
    }

    const [state, setState] = React.useState<TState>({ label: DEFAULT_LABEL, uri: 'http://local.org', comment: 'Описание' })

    const ref = React.useRef()
    useOnClickOutside(ref, props.onClose)

    const onSave = () => {
        if (props.create_type === 1)
            dispatch(createOntology(state.label, state.comment))
        if (props.create_type === 2)
            dispatch(createResourceOntology(state.label, state.comment))
        if (props.create_type === 3)
            dispatch(createPatternOntology(state.label, state.comment))
        if (props.create_type === 11)
            dispatch(branchOntology(props.ontology.data.uri, state.label, state.comment, 'Ontology'))
        if (props.create_type === 22)
            dispatch(branchOntology(props.ontology.data.uri, state.label, state.comment, 'ResourceOntology'))
        // props.onClose()
    }



    return <>
        <div className='m-form' ref={ref}>
            <p className='m-form-title'>
                {props.create_type === 1 && 'Онтология'}
                {props.create_type === 2 && 'Онтология ресурсов'}
                {props.create_type === 3 && 'Паттерн'}
                {props.create_type === 11 && 'Наследование онтологии'}
                {props.create_type === 22 && 'Наследование ресурса'}

            </p>
            <div className='m-form-fields'>
                <LabelForm label={state.label} onChange={label => setState({ ...state, label: label })} />
                {/* <label>URI орг.</label>
                <input placeholder='http://erlangen-crm.org' value={state.uri} onChange={e => setState({ ...state, uri: e.target.value })}></input> */}
                <label>Описание</label>
                <input placeholder='...' value={state.comment} onChange={e => setState({ ...state, comment: e.target.value })}></input>
            </div>
            <div className='m-form-controls'>
                <button className='bg-blue' onClick={onSave}>Сохранить</button>
                <button className='bg-red' onClick={props.onClose}>Отмена</button>
            </div>
        </div>
    </>;
};

export default OntologyForm;

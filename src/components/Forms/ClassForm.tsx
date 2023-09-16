import * as React from 'react';
import { useDispatch } from 'react-redux';
import { createClass } from '../../actions/graph/graph';
import { DEFAULT_LABEL } from '../../actions/settings/types';
import { useOnClickOutside } from '../../utils';
import LabelForm from './LabelForm';

interface IClassFormProps {
    ontology_uri: string,
    parent_uri?: string,
    onClose: () => void
}

const ClassForm: React.FunctionComponent<IClassFormProps> = (props) => {
    const dispatch = useDispatch()

    type TState = {
        label: string[],
        comment: string
    }

    const [state, setState] = React.useState<TState>({ label: DEFAULT_LABEL, comment: 'Описание' })

    const ref = React.useRef()
    useOnClickOutside(ref, props.onClose)

    const onSave = () => {
        props.parent_uri && dispatch(createClass(props.ontology_uri, state.label, state.comment, props.parent_uri))
        !props.parent_uri && dispatch(createClass(props.ontology_uri, state.label, state.comment))
        props.onClose()
    }



    return <>
        <div className='m-form'>
            <p className='m-form-title'>Класс</p>
            <div className='m-form-fields'>
                <LabelForm label={state.label} onChange={label => setState({ ...state, label: label })} />
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

export default ClassForm;

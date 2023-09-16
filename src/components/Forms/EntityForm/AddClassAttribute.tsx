import * as React from 'react';
import { DEFAULT_LABEL } from '../../../actions/settings/types';
import LabelForm from '../LabelForm';

interface IAddClassAttributeProps {
    onClose: () => void,
    onSelect: (label: string[]) => void,
}

const AddClassAttribute: React.FunctionComponent<IAddClassAttributeProps> = (props) => {

    const [label, setLabel] = React.useState(DEFAULT_LABEL)

    return <>
        <div className='m-mini-form'>
            <p className='m-mini-form-title'>Добавить атрибут</p>
            <div className='m-mini-form-fields'>
                <LabelForm label={label} onChange={label => setLabel(label)} />
            </div>
            <div className='m-mini-form-controls'>
                <button className='bg-blue' onClick={_ => props.onSelect(label)}>Сохранить</button>
                <button className='bg-red' onClick={props.onClose}>Отмена</button>
            </div>
        </div>
    </>;
};

export default AddClassAttribute;

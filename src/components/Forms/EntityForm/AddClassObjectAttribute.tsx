import * as React from 'react';
import { TNode } from '../../../actions/graph/types';
import { DEFAULT_LABEL } from '../../../actions/settings/types';
import { CLASS } from '../../../utils';
import ItemSelectorButton from '../ItemSelectorButton';
import LabelForm from '../LabelForm';

interface IAddClassObjectAttributeProps {
    onClose: () => void,
    onSelect: (label: string[], range: TNode) => void,
    ontology_uri: string
}

const AddClassObjectAttribute: React.FunctionComponent<IAddClassObjectAttributeProps> = (props) => {

    const [label, setLabel] = React.useState(DEFAULT_LABEL)
    const [range, setRange] = React.useState(null)
    return <>
        <div className='m-mini-form'>
            <p className='m-mini-form-title'>Добавить атрибут</p>
            <div className='m-mini-form-fields'>
                <LabelForm label={label} onChange={label => setLabel(label)} />
                <ItemSelectorButton
                    selected={range}
                    labels={[CLASS]}
                    onChange={val => setRange(val)}
                    title='Класс'
                    ontology_uri={props.ontology_uri}
                />
            </div>
            <div className='m-mini-form-controls'>
                <button className='bg-blue' onClick={_ => props.onSelect(label, range)}>Сохранить</button>
                <button className='bg-red' onClick={props.onClose}>Отмена</button>
            </div>
        </div>
    </>;
};

export default AddClassObjectAttribute;

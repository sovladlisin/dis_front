import * as React from 'react';
import { TNode } from '../../../actions/graph/types';
import { DEFAULT_LABEL } from '../../../actions/settings/types';
import { CLASS, DATATYPE_PROPERTY, OBJECT, OBJECT_PROPERTY } from '../../../utils';
import ItemSelectorButton from '../ItemSelectorButton';
import LabelForm from '../LabelForm';
import ItemSelector from './ItemSelector';

interface IPatternSelectorProps {
    is_main: boolean,
    is_create: boolean,
    is_select: boolean,
    is_const: boolean,
    ontology_uri: string,
    onSelect: (tag: string, label: string[]) => void,
    onConstSelect: (tag: string, is_filter: boolean, is_general: boolean, node: TNode) => void
    onClose: () => void,
}

const PatternSelector: React.FunctionComponent<IPatternSelectorProps> = (props) => {


    const [tag, setTag] = React.useState('Выберите тип')
    const [itemSelector, setItemSelector] = React.useState(false)
    const neo_nodes = [CLASS, OBJECT, OBJECT_PROPERTY, DATATYPE_PROPERTY]
    const [label, setLabel] = React.useState<string[]>(DEFAULT_LABEL)

    const getFieldName = () => {
        if (props.is_select || props.is_create) return 'Название формы'
        return 'error'
    }

    const [isFilter, setIsFilter] = React.useState(false)
    const [isGeneral, setIsGeneral] = React.useState(true)
    const [constNode, setConstNode] = React.useState<TNode>(null)

    return <>
        {itemSelector && <ItemSelector items={neo_nodes.map(n => { return { uri: n, name: n } })} onClose={() => setItemSelector(false)} onSelect={(uri: string) => setTag(uri)} />}
        <div className='pattern-selector'>
            <div className='pattern-selector-fields'>
                <label>Тип:</label><button onClick={_ => setItemSelector(true)}>{tag}</button>
                {!props.is_main && !props.is_const && <LabelForm title={getFieldName()} label={label} onChange={_label => setLabel(_label)} />}
                {props.is_const && <>
                    <label>Как фильтр:</label>
                    <button onClick={_ => setIsFilter(!isFilter)}>
                        {isFilter ? <i className='fas fa-check-square'></i> : <i className='fas fa-square'></i>}
                    </button>
                    <label>Конкретный узел:</label>
                    <button onClick={_ => setIsGeneral(!isGeneral)}>
                        {!isGeneral ? <i className='fas fa-check-square'></i> : <i className='fas fa-square'></i>}
                    </button>
                    {!isGeneral && <ItemSelectorButton labels={[tag]} title='Узел:' ontology_uri={props.ontology_uri} selected={constNode} onChange={(node) => setConstNode(node)} />}
                </>}
            </div>
            <div className='pattern-selector-buttons'>
                <button className='bg-blue' onClick={_ => {
                    if (props.is_const)
                        props.onConstSelect(tag, isFilter, isGeneral, constNode)
                    else
                        props.onSelect(tag, label)
                    props.onClose()
                }}>Применить</button>
                <button className='bg-red' onClick={_ => props.onClose()}>Отмена</button>
            </div>
        </div>

    </>;
};

export default PatternSelector;

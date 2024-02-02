import axios from 'axios';
import * as React from 'react';
import { COMMENT, SERVER_URL, getNodeLabel } from '../../utils';
import { TNode } from '../../actions/graph/types';

interface IClassAttributesSelectorButtonProps {
    ontology_uri: string,
    class_uri: string,
    selected: string[],
    onChange: (selected_attributes: string[]) => void,
    title: string
}

const ClassAttributesSelectorButton: React.FunctionComponent<IClassAttributesSelectorButtonProps> = (props) => {


    const [items, setItems] = React.useState<TNode[]>([])

    const onLoad = async () => {
        const body = JSON.stringify({ ontology_uri: props.ontology_uri, class_uri: props.class_uri })
        var response = await axios.post(SERVER_URL + 'api/collectClassSimpleSignature', body)
        console.log('ClassAttributesSelectorButton', response)
        setItems(response.data)
    }
    React.useEffect(() => {
        onLoad()
    }, [,])

    const [search, setSearch] = React.useState('')
    const [selectorMenu, setSelectorMenu] = React.useState(false)

    const onToggle = (uri: string) => {
        var s = props.selected
        s.includes(uri) ?
            props.onChange(s.filter(i => i != uri)) :
            props.onChange([...s, uri])
    }

    return <>
        <label>{props.title}</label>
        <div className='form-main-item-selector-button-container'>
            {selectorMenu && <>
                <div className='form-main-item-selector-button-window'>
                    <div className='form-main-item-selector-button-window-search'>
                        <span><i className='fas fa-search'></i></span>
                        <input placeholder='Поиск' value={search} onChange={e => setSearch(e.target.value)}></input>
                    </div>
                    <div className='form-main-item-selector-button-window-items'>
                        {items.map(node => {
                            const selected = props.selected.includes(node.data.uri)
                            return <button className='form-main-item-selector-button-window-items-item-check' onClick={_ => onToggle(node.data.uri)}>
                                {selected ? <i className='fas fa-check-square color-blue'></i> : <i className='fas fa-square'></i>}
                                <p>{getNodeLabel(node)}</p>
                            </button>
                        })}
                        <button className='form-main-item-selector-button-window-items-item-check' onClick={_ => onToggle(COMMENT)}>
                            {props.selected.includes(COMMENT) ? <i className='fas fa-check-square color-blue'></i> : <i className='fas fa-square'></i>}
                            <p>Описание</p>
                        </button>
                    </div>
                </div>
            </>}
            <button onClick={_ => setSelectorMenu(!selectorMenu)} className='form-main-item-selector-button'>
                {'Выбрано (' + props.selected.length + ')'}
            </button>
        </div>
    </>;
};

export default ClassAttributesSelectorButton;

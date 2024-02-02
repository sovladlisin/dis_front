import * as React from 'react';
import { TNode } from '../../actions/graph/types';
import { getNodeLabel } from '../../utils';

interface ICustomSelectorButtonByUriProps {
    nodes: TNode[],
    selected: string,
    title: string,
    onChange: (node: TNode) => void,
}

const CustomSelectorButtonByUri: React.FunctionComponent<ICustomSelectorButtonByUriProps> = (props) => {

    const [search, setSearch] = React.useState('')
    const [selectorMenu, setSelectorMenu] = React.useState(false)

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
                        <button className={!props.selected ? 'form-main-item-selector-button-window-items-selected' : ''} onClick={_ => { props.onChange(null); setSelectorMenu(false) }}>Не указано</button>
                        {props.nodes.map(node => {
                            const selected = props.selected && props.selected === node.data.uri ? 'form-main-item-selector-button-window-items-selected' : ''
                            return <button className={selected} onClick={_ => { props.onChange(node); setSelectorMenu(false) }}>{getNodeLabel(node)}</button>
                        })}
                    </div>
                </div>
            </>}
            <button onClick={_ => setSelectorMenu(true)} className='form-main-item-selector-button'>
                {getNodeLabel(props.nodes.find(n => n.data.uri === props.selected))}
            </button>
        </div>


    </>;
};

export default CustomSelectorButtonByUri;

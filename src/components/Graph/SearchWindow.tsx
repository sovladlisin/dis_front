import * as React from 'react';
import { TNode } from '../../actions/graph/types';
import { getNodeLabel, useOnClickOutside } from '../../utils';

interface ISearchWindowProps {
    nodes: TNode[],
    onSelect: (node: TNode) => void,
    onClose: () => void
}

const SearchWindow: React.FunctionComponent<ISearchWindowProps> = (props) => {

    const [search, setSearch] = React.useState('')

    return <>
        <div className='graph-search-window'>
            <div className='graph-search-window-container'>
                <span><i className='fas fa-search'></i></span>
                <input onChange={e => setSearch(e.target.value)} value={search} placeholder='Строка поиска'></input>
            </div>
            <div className='graph-search-window-items'>

                {props.nodes.filter(node => JSON.stringify(node).toLocaleLowerCase().includes(search.toLocaleLowerCase())).map(node => {
                    return <button onClick={_ => props.onSelect(node)}>{getNodeLabel(node)}</button>
                })}
            </div>
        </div>
    </>;
};

export default SearchWindow;

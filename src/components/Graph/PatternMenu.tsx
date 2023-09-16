import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePattern, savePattern } from '../../actions/graph/graph';
import { TPattern } from '../../actions/graph/types';
import { RootStore } from '../../store';
import { getRandomInt, useOnClickOutside } from '../../utils';

interface IPatternMenuProps {
    ontology_uri: string,
    onClose: () => void,
    onPatternEdit: (pattern: TPattern) => void
}

const PatternMenu: React.FunctionComponent<IPatternMenuProps> = (props) => {
    const patternState = useSelector((state: RootStore) => state.graph.patterns)
    const dispatch = useDispatch()
    const [search, setSearch] = React.useState('')

    const onDelete = (id: number) => {
        dispatch(deletePattern(id))
    }

    const onAdd = () => {
        const new_pattern: TPattern = {
            id: getRandomInt(0, 100000),
            name: 'Название',
            ontology_uri: props.ontology_uri,
            nodes: [],
            arcs: []
        }
        dispatch(savePattern(new_pattern))
    }

    const ref = React.useRef()
    useOnClickOutside(ref, props.onClose)

    return <>
        <div className='graph-pattern-menu'>
            <div className='graph-pattern-menu-header'>
                <div className='graph-pattern-menu-header-search'>
                    <span><i className='fas fa-search'></i></span>
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder='Поиск' ></input>
                </div>
                <button onClick={onAdd} className='graph-pattern-menu-header-addbutton'>Добавить</button>
            </div>
            <div className='graph-pattern-items'>
                {patternState.filter(p => JSON.stringify(p).toLocaleLowerCase().includes(search.toLocaleLowerCase())).map(p => {
                    return <>
                        <div className='graph-pattern-item'>
                            <label>{p.name}</label>
                            <button onClick={_ => props.onPatternEdit(p)}><i className='fas fa-pen'></i></button>
                            <button onClick={_ => onDelete(p.id)}><i className='fas fa-trash'></i></button>
                        </div>
                    </>
                })}
            </div>

        </div>
    </>;
};

export default PatternMenu;

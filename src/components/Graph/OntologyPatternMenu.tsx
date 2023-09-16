import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { TNode } from '../../actions/graph/types';
import { getNodeLabel } from '../../utils';
import { Link } from 'react-router-dom'
import { applyOntologyPattern } from '../../actions/graph/graph';
interface IOntologyPatternMenuProps {
    onClose: () => void,
    ontology_uri: string
}

const OntologyPatternMenu: React.FunctionComponent<IOntologyPatternMenuProps> = (props) => {
    const dispatch = useDispatch()
    const patternState = useSelector((state: RootStore) => state.ontology.pattern_ontologies)
    const [search, setSearch] = React.useState('')
    const [selectedPattern, setSelectedPattern] = React.useState<TNode>(null)

    const onApply = () => {
        selectedPattern &&
            dispatch(applyOntologyPattern(props.ontology_uri, selectedPattern.data.uri))
    }
    return <>
        <div className='graph-ontology-pattern-menu'>
            <h1>Паттерны</h1>
            <div className='graph-ontology-pattern-menu-search'>
                <span><i className='fas fa-search'></i></span>
                <input value={search} onChange={e => setSearch(e.target.value)} ></input>
            </div>

            <div className='graph-ontology-pattern-menu-list'>
                {patternState.map(p => {
                    return <div>
                        <p className={selectedPattern?.data.uri === p.data.uri ? 'selected' : ''} onClick={_ => setSelectedPattern(p)}>{getNodeLabel(p)}</p>
                        <Link><i className='fas fa-link'></i></Link>
                    </div>
                })}
            </div>

            <div className='graph-ontology-pattern-menu-controls'>
                <button className={selectedPattern ? 'bg-blue' : ''} onClick={onApply}>Применить</button>
                <button className='bg-red' onClick={props.onClose}>Отмена</button>
            </div>
        </div>
    </>;
};

export default OntologyPatternMenu;

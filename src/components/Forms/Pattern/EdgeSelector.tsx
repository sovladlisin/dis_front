import * as React from 'react';
import { useOnClickOutside } from '../../../utils';

interface IEdgeSelectorProps {
    ontology_uri: string,
    items: { uri: string, name: string }[],
    onSelect: (uri: string) => void,
    onClose: () => void,
    selected?: string
}

const EdgeSelector: React.FunctionComponent<IEdgeSelectorProps> = (props) => {
    const [search, setSearch] = React.useState('')
    const ref = React.useRef()
    useOnClickOutside(ref, props.onClose)

    const [input, setInput] = React.useState('example')
    return <>
        <div className='form-item-selector' ref={ref}>
            <div className='form-item-selector-search'>
                <span><i className='fas fa-search'></i></span>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder='Поиск' ></input>
            </div>
            <div className='form-item-selector-items'>

                {props.items.filter(i => JSON.stringify(i).toLocaleLowerCase().includes(search.toLocaleLowerCase())).map(i => {
                    return <>
                        <button
                            className={props.selected === i.uri ? 'form-item-selector-item-selected' : ''}
                            onClick={_ => { props.onSelect(i.uri); props.onClose() }}>{i.name}</button>
                    </>
                })}
            </div>

            <div className='form-item-selector-input'>
                <label>{props.ontology_uri + '/'}</label>
                <input value={input} onChange={e => setInput(e.target.value)}></input>
                <button className='bg-blue' onClick={_ => props.onSelect(props.ontology_uri + '/' + input)}>Добавить</button>
            </div>

        </div>
    </>;
};

export default EdgeSelector;

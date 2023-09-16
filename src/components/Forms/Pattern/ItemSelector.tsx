import * as React from 'react';
import { useOnClickOutside } from '../../../utils';

interface IItemSelectorProps {
    items: { uri: string, name: string }[],
    onSelect: (uri: string) => void,
    onClose: () => void,
    selected?: string
}

const ItemSelector: React.FunctionComponent<IItemSelectorProps> = (props) => {
    const [search, setSearch] = React.useState('')
    const ref = React.useRef()
    useOnClickOutside(ref, props.onClose)

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



        </div>
    </>;
};

export default ItemSelector;

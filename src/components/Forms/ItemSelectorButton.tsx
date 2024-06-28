import axios from 'axios';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TNode } from '../../actions/graph/types';
import { getItemsByLabels } from '../../actions/ontology/ontology';
import { ONTOLOGY_GET_ITEMS_BY_LABELS } from '../../actions/ontology/types';
import { RootStore } from '../../store';
import { CLASS, getNodeLabel, OBJECT_PROPERTY, readLabel, SERVER_URL } from '../../utils';
import { withToken } from '../../actions/auth/auth';

interface IItemSelectorButtonProps {
    title: string,
    onChange: (node: TNode) => void,
    labels: string[],
    ontology_uri: string,
    selected: TNode,
    custom_q?: string
}

const ItemSelectorButton: React.FunctionComponent<IItemSelectorButtonProps> = (props) => {

    const dispatch = useDispatch()
    // const itemsState = useSelector((state: RootStore) => state.ontology.items_by_labels)
    const [itemsState, setItemsState] = React.useState<TNode[]>([])
    const [selectorMenu, setSelectorMenu] = React.useState(false)

    const onLoad = async (class_uri: string) => {

        if (props.labels.length === 1 && (props.labels[0] === CLASS || props.labels[0] === OBJECT_PROPERTY)) {
            const body = JSON.stringify({ ontology_uri: props.ontology_uri, labels: props.labels })
            console.log(body, "body")

            var response = await axios.post(SERVER_URL + 'api/getItemsByLabels', body)
            console.log(response, "RESPONSE")
        }
        else {
            const params = withToken({ ontology_uri: props.ontology_uri, class_uri })
            var response = await axios.get(SERVER_URL + 'api/getClassObjects', params)
        }
        const items: TNode[] = response.data
        setItemsState(items)
    }
    React.useEffect(() => {
        console.log(props.labels)
        onLoad(props.labels.slice(-1)[0])
        // dispatch(getItemsByLabels(props.ontology_uri, props.labels, props.custom_q))

    }, [, selectorMenu])


    const [search, setSearch] = React.useState('')
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
                        {itemsState.map(node => {
                            const selected = props.selected && props.selected.data.uri === node.data.uri ? 'form-main-item-selector-button-window-items-selected' : ''
                            return <button className={selected} onClick={_ => { props.onChange(node); setSelectorMenu(false) }}>{getNodeLabel(node)}</button>
                        })}
                    </div>
                </div>
            </>}
            <button onClick={_ => setSelectorMenu(true)} className='form-main-item-selector-button'>
                {getNodeLabel(props.selected)}
            </button>
        </div>


    </>;
};

export default ItemSelectorButton;

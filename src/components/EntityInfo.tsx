import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TNode } from '../actions/graph/types';
import { collectEntity, openEntity } from '../actions/ontology/ontology';
import { RootStore } from '../store';
import { CLASS, COMMENT, getNodeLabel, LABEL, OBJECT, useOnClickOutside } from '../utils';
import ItemSelectorButton from './Forms/ItemSelectorButton';
import Loading from './Loading';

interface IEntityInfoProps {
}

const EntityInfo: React.FunctionComponent<IEntityInfoProps> = (props) => {
    const dispatch = useDispatch()
    const ontologyState = useSelector((state: RootStore) => state.ontology)

    if (!ontologyState.opened_entity) return <></>

    React.useEffect(() => {
        if (ontologyState.opened_entity)
            dispatch(collectEntity(ontologyState.opened_entity.ontology_uri, ontologyState.opened_entity.uri))
    }, [, ontologyState.opened_entity])


    React.useEffect(() => {
        if (!ontologyState.collected_entity) return;
        if (ontologyState.collected_entity.data.uri != ontologyState.opened_entity.uri) return;
        setNode(ontologyState.collected_entity)
    }, [ontologyState.collected_entity])

    const [node, setNode] = React.useState<TNode>(null)


    const renderAttributes = () => {
        return node.data.attributes.map(att => {

            const name = getNodeLabel(att)
            const uri = att.data.uri

            const isFile = att.data[LABEL].includes('File@en')
            return <>
                <label>{name}</label>

                {isFile && <span>File</span>}
                {!isFile && <label>{node.data.params_values[uri]}</label>}
            </>
        })

    }

    const redirect = (ontology_uri: string, uri: string) => {
        dispatch(openEntity({ ontology_uri, uri }))
    }

    const renderObjectAttributes = (direction: number) => {
        return node.data.obj_attributes.filter(att => att.direction === direction).map(att => {
            return <>
                <label>{getNodeLabel(att.field)}</label>
                {att.value ? <label onClick={_ => redirect(att.value.data.ontology_uri, att.value.data.uri)} className='form-class-label-value'>{getNodeLabel(att.value)}</label > : <label>Не указано</label>}
            </>
        })
    }

    const getTitle = () => {
        const name = getNodeLabel(node)
        if (node.data.labels.includes(CLASS))
            return 'Класс: ' + name
        if (node.data.labels.includes(OBJECT))
            return 'Объект: ' + name
    }

    const close = () => {
        dispatch(openEntity(null))
    }

    const ref = React.useRef()
    useOnClickOutside(ref, () => close())

    if (ontologyState.collected_entity_loading) return <>
        <div className='m-entity-info' >
            <Loading height={500} />
        </div>
    </>
    if (!node) return <></>
    return <>

        <div className='m-entity-info' ref={ref}>

            <p className='m-entity-title'>{getTitle()}</p>

            <div className='m-entity-fields'>
                <label>Название</label>
                <div className="entity-label-container">
                    {node.data[LABEL].map(l => {
                        return <p>{l.split('@')[0]}<span>{l.split('@')[1]}</span></p>
                    })}
                </div>
                <label>Описание</label>
                <p>{node.data.params_values[COMMENT]}</p>
            </div>

            <div className='m-entity-attributes'>
                <div className='m-entity-fields'>
                    {renderAttributes()}
                    {renderObjectAttributes(1)}
                    {renderObjectAttributes(0)}
                </div>
            </div>
        </div>
    </>;
};

export default EntityInfo;

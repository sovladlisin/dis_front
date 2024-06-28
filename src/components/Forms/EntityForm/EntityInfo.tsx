import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TNode } from '../../../actions/graph/types';
import { collectEntity, openEntity } from '../../../actions/ontology/ontology';
import { RootStore } from '../../../store';
import { CLASS, COMMENT, getNodeLabel, LABEL, OBJECT, renderEntityMedia, SERVER_URL_FILES, useOnClickOutside } from '../../../utils';
import ItemSelectorButton from '../ItemSelectorButton';
import Loading from '../../Loading';
import { Link } from 'react-router-dom'
import { encode } from 'punycode';

interface IEntityInfoProps {
    node?: TNode
}

const EntityInfo: React.FunctionComponent<IEntityInfoProps> = (props) => {
    const dispatch = useDispatch()
    const ontologyState = useSelector((state: RootStore) => state.ontology)

    if (!props.node && !ontologyState.opened_entity) return <></>

    React.useEffect(() => {
        if (props.node)
            dispatch(collectEntity(props.node.data.ontology_uri, props.node.data.uri))
        else if (ontologyState.opened_entity)
            dispatch(collectEntity(ontologyState.opened_entity.ontology_uri, ontologyState.opened_entity.uri))
    }, [, ontologyState.opened_entity])


    React.useEffect(() => {
        if (!ontologyState.collected_entity) return;
        if (!props.node && ontologyState.collected_entity.data.uri != ontologyState.opened_entity.uri) return;
        if (props.node && ontologyState.collected_entity.data.uri != props.node.data.uri) return;
        setNode(ontologyState.collected_entity)
    }, [ontologyState.collected_entity])

    const [node, setNode] = React.useState<TNode>(null)


    const renderAttributes = () => {
        return node.data.attributes.map(att => {

            const name = getNodeLabel(att)
            const uri = att.data.uri

            const isFile = att.data[LABEL].includes('File@en')
            return <>
                {!isFile && <>
                    <label>{name}</label>
                    <p>{node.data.params_values[att.data.uri]}</p>
                </>}
                {/* {isFile && <p>File</p>} */}
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
        {!props.node && <div className='m-background'></div>}
        <div className='m-entity-info-container' >
            <div className='m-entity-info' ref={ref}>
                {(node.data.file || node.data.connected_file) && <>
                    <div className='m-entity-info-media'>
                        {renderEntityMedia(node)}
                    </div>
                </>}

                <p className='m-entity-title'>{getTitle()}</p>

                <div className='m-entity-fields'>
                    <label>Название</label>
                    <div className="entity-label-container">
                        {node.data[LABEL]?.map(l => {
                            return <p>{l.split('@')[0]}<span>{l.split('@')[1]}</span></p>
                        })}
                    </div>
                    <label>Описание</label>
                    <p>{node.data.params_values[COMMENT]}</p>
                </div>

                <div className='m-entity-attributes'>
                    <div className='m-entity-fields'>
                        {renderAttributes()}
                        {node.data.file?.url && <><label>Файл</label><p><Link className='entity-info-file-download' to={SERVER_URL_FILES + node.data.file.url}>Скачать</Link></p></>}

                        {renderObjectAttributes(1)}
                        {renderObjectAttributes(0)}
                    </div>
                </div>

                <div className='m-entity-mentions'>
                    {node.data.text_mentions?.map(m => {
                        return <>
                            <div className='m-entity-mentions-item'>
                                <Link target='__blank' className='color-white bg-blue' to={'/project/' + 'props.project.id' + '/textEditor/' + encode(m.original_object_uri)}>
                                    <p>Перейти в текст</p>
                                    <i className='fas fa-book-open'></i>
                                </Link>

                                <div className='m-entity-mentions-item-position'>
                                    <p>{m.pos_start}</p>
                                    <i className='fas fa-long-arrow-alt-right'></i>
                                    <p>{m.pos_end}</p>
                                </div>

                            </div>
                        </>
                    })}
                </div>
            </div>
        </div>
    </>;
};

export default EntityInfo;

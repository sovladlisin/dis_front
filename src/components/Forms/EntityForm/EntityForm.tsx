import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addClassAttribute, addClassObjectAttribute, updateEntity, updateEntityFile } from '../../../actions/graph/graph';
import { TNode, TObjectTypeAttribute } from '../../../actions/graph/types';
import { collectEntity } from '../../../actions/ontology/ontology';
import { RootStore } from '../../../store';
import { CLASS, COMMENT, getNodeLabel, LABEL, OBJECT, useOnClickOutside } from '../../../utils';
import Loading from '../../Loading';
import ItemSelectorButton from '../ItemSelectorButton';
import LabelForm from '../LabelForm';
import AddClassAttribute from './AddClassAttribute';
import AddClassObjectAttribute from './AddClassObjectAttribute';
import FileSelectorButton from '../Files/FileSelectorButton';
import { TFile } from '../../../actions/files/types';

interface IEntityFormProps {
    ontology_uri: string
    uri: string,
    onClose: () => void
}

const EntityForm: React.FunctionComponent<IEntityFormProps> = (props) => {

    const dispatch = useDispatch()
    const ontologyState = useSelector((state: RootStore) => state.ontology)
    const graphState = useSelector((state: RootStore) => state.graph)
    React.useEffect(() => {
        dispatch(collectEntity(props.ontology_uri, props.uri))
    }, [, props.uri, graphState.nodes, graphState.arcs])


    React.useEffect(() => {
        if (!ontologyState.collected_entity) return;
        if (ontologyState.collected_entity.data.uri != props.uri) return;
        setIsEdit(!ontologyState.collected_entity.data.labels.includes(CLASS))
        setNode(ontologyState.collected_entity)
    }, [ontologyState.collected_entity])

    const [node, setNode] = React.useState<TNode>(null)

    const setNodeParam = (param: string, value: string | string[]) => {
        setNode({ ...node, data: { ...node.data, params_values: { ...node.data.params_values, [param]: value } } })
    }
    const setNodeObjectParam = (attr: TObjectTypeAttribute) => {
        setNode({
            ...node, data: {
                ...node.data, obj_attributes: node.data.obj_attributes.map(oa => {
                    if (oa.field.data.uri === attr.field.data.uri)
                        return attr
                    return oa
                })
            }
        })
    }

    const [addingClassAttribute, setAddingClassAttribute] = React.useState(false)
    const [addingClassObjectAttribute, setAddingClassObjectAttribute] = React.useState(null)
    const onAddClassAttribute = (label: string[]) => {
        dispatch(addClassAttribute(props.ontology_uri, node.data.uri, label))
        setAddingClassAttribute(false)
    }
    const onAddClassObjectAttribute = (label: string[], range: TNode) => {
        dispatch(addClassObjectAttribute(props.ontology_uri, node.data.uri, label, range.data.uri))
        setAddingClassObjectAttribute(null)
    }


    const [isEdit, setIsEdit] = React.useState(false)

    const renderAttributes = () => {
        return node.data.attributes.map(att => {

            const name = getNodeLabel(att)
            const uri = att.data.uri

            const isFile = att.data[LABEL].includes('File@en')
            return <>
                {!isFile && <label>{name}</label>}
                {isEdit && <>
                    {isFile && <FileSelectorButton link={node.data.params_values[uri]} onSelect={(file: TFile) => {
                        dispatch(updateEntityFile(node.data.ontology_uri, node.data.uri, uri, file.id))
                        // setNodeParam(uri, file.link)
                    }} />}
                    {!isFile && <input value={node.data.params_values[uri]} onChange={e => setNodeParam(uri, e.target.value)}></input>}
                </>}
                {!isEdit && <label className='form-class-label-value'>Строка</label>}
            </>
        })

    }

    const renderObjectAttributes = (direction: number) => {
        return node.data.obj_attributes.filter(att => att.direction === direction).map(att => {
            return <>
                {isEdit &&
                    <ItemSelectorButton
                        onChange={val => setNodeObjectParam({ ...att, value: val })}
                        title={getNodeLabel(att.field)}
                        labels={[OBJECT, att.range.data.uri]}
                        selected={att.value}
                        ontology_uri={props.ontology_uri} />
                }
                {!isEdit &&
                    <>
                        <label>{getNodeLabel(att.field)}</label>
                        <label className='form-class-label-value'>{getNodeLabel(att.range)}</label>
                    </>
                }
            </>

        })
    }

    const onSave = () => {


        dispatch(updateEntity(props.ontology_uri, props.uri, node.data.params_values, node.data.obj_attributes))
    }

    const getFormTitle = () => {
        const name = getNodeLabel(node)
        if (node.data.labels.includes(CLASS))
            return 'Класс: ' + name
        if (node.data.labels.includes(OBJECT))
            return 'Объект: ' + name
    }


    if (ontologyState.collected_entity_loading) return <>
        <div className='m-form' >
            <Loading height={500} />
        </div>
    </>
    if (!node) return <></>
    return <>

        <div className='m-form' >
            {addingClassAttribute && <AddClassAttribute onClose={() => setAddingClassAttribute(false)} onSelect={(label) => onAddClassAttribute(label)} />}
            {addingClassObjectAttribute && <AddClassObjectAttribute ontology_uri={props.ontology_uri} onClose={() => setAddingClassObjectAttribute(null)} onSelect={(label, range) => onAddClassObjectAttribute(label, range)} />}

            <p className='m-form-title'>{getFormTitle()}</p>

            <div className='m-form-fields'>
                <LabelForm label={node.data.params_values[LABEL]} onChange={label => setNodeParam(LABEL, label)} />
                <label>Описание</label>
                <input placeholder='...' value={node.data.params_values[COMMENT]} onChange={e => setNodeParam(COMMENT, e.target.value)}></input>
            </div>

            <div className='m-form-entity-form-section'>
                <div className='m-form-entity-form-section-header'>
                    <div className='m-form-entity-form-section-header-title'>
                        <p>Атрибуты</p>
                        <div className='m-form-entity-form-section-header-title-description'></div>
                    </div>
                    <button onClick={_ => setAddingClassAttribute(true)}><i className='fas fa-plus'></i></button>
                </div>
                <div className='m-form-entity-form-section-fields'>
                    {renderAttributes()}
                </div>
            </div>

            <div className='m-form-entity-form-section'>
                <div className='m-form-entity-form-section-header'>
                    <div className='m-form-entity-form-section-header-title'>
                        <p>Атрибуты</p>
                        <div className='m-form-entity-form-section-header-title-description'>
                            <span className='m-form-entity-form-section-header-title-description-bubble'>{getFormTitle()}</span>
                            <i className='fas fa-long-arrow-alt-right'></i>
                            <span className='m-form-entity-form-section-header-title-description-bubble'>Узел</span>
                        </div>
                    </div>
                    <button onClick={_ => setAddingClassObjectAttribute(1)}><i className='fas fa-plus'></i></button>
                </div>
                <div className='m-form-entity-form-section-fields'>
                    {renderObjectAttributes(1)}
                </div>
            </div>

            <div className='m-form-entity-form-section'>
                <div className='m-form-entity-form-section-header'>
                    <p>Атрибуты</p>
                    <div className='m-form-entity-form-section-header-title-description'>
                        <span className='m-form-entity-form-section-header-title-description-bubble'>Узел</span>
                        <i className='fas fa-long-arrow-alt-right'></i>
                        <span className='m-form-entity-form-section-header-title-description-bubble'>{getFormTitle()}</span>
                    </div>
                    {/* <button onClick={_ => setAddingClassObjectAttribute(0)}><i className='fas fa-plus'></i></button> */}
                </div>
                <div className='m-form-entity-form-section-fields'>
                    {renderObjectAttributes(0)}
                </div>
            </div>

            <div className='m-form-controls'>
                <button className='bg-blue' onClick={onSave}>Сохранить</button>
                <button className='bg-red' onClick={props.onClose}>Отмена</button>
            </div>
        </div>
    </>;
};

export default EntityForm;

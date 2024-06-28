import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTextEnitity } from '../../../actions/markup/markup';
import { TEntity } from '../../../actions/markup/types';
import { RootStore } from '../../../store';
import { CLASS, OBJECT, OBJECT_PROPERTY, useOnClickOutside } from '../../../utils';
import ItemSelectorButton from '../../Forms/ItemSelectorButton';
import { TNode } from '../../../actions/graph/types';

interface IEntityFormProps {
    entity: TEntity,
    ontology_uri: string,
    markup_id: number,
    onClose: () => void
}

const EntityForm: React.FunctionComponent<IEntityFormProps> = (props) => {

    const dispatch = useDispatch()

    const ref = React.useRef()
    useOnClickOutside(ref, () => props.onClose())

    const [selectedType, setSelectedType] = React.useState(1)

    const [selectedEntityClass, setSelectedEntityClass] = React.useState<TNode>(null)
    const [selectedEntityObject, setSelectedEntityObject] = React.useState<TNode>(null)
    const [selectedEntityAttribute, setSelectedEntityAttribute] = React.useState<TNode>(null)

    const [selectedObjectClass, setSelectedObjectClass] = React.useState<TNode>(null)
    const [selectedAtrClass, setSelectedAtrClass] = React.useState<TNode>(null)

    const onSave = () => {
        var new_entity = { ...props.entity }
        new_entity.markup = props.markup_id
        if (selectedType === 1) {
            new_entity.node_uri = selectedEntityClass.data.uri
            new_entity.node = selectedEntityClass
        }
        if (selectedType === 2) {
            new_entity.node_uri = selectedEntityObject.data.uri
            new_entity.node = selectedEntityObject
        }
        if (selectedType === 3) {
            new_entity.node_uri = selectedEntityAttribute.data.uri
            new_entity.node = selectedEntityAttribute
        }

        dispatch(createTextEnitity(new_entity))
        props.onClose()
    }

    return <>
        <div className='ws-entity-form' ref={ref}>
            <div className='ws-entity-form-types'>
                <button style={selectedType === 1 ? { color: 'red' } : {}} onClick={_ => setSelectedType(1)}>Класс</button>
                <button style={selectedType === 2 ? { color: 'red' } : {}} onClick={_ => setSelectedType(2)}>Объект</button>
                <button style={selectedType === 3 ? { color: 'red' } : {}} onClick={_ => setSelectedType(3)}>Связь</button>

            </div>
            <div className='ws-entity-form-params'>
                {selectedType === 1 && <>
                    <ItemSelectorButton selected={selectedEntityClass} title={'Класс'} labels={[CLASS]} onChange={cl => setSelectedEntityClass(cl)} ontology_uri={props.ontology_uri} />
                </>}
                {selectedType === 2 && <>
                    <ItemSelectorButton selected={selectedObjectClass} title={'Класс'} labels={[CLASS]} onChange={cl => setSelectedObjectClass(cl)} ontology_uri={props.ontology_uri} />
                    {selectedObjectClass && <>
                        <ItemSelectorButton selected={selectedEntityObject} title={'Объект'} labels={[OBJECT, selectedObjectClass.data.uri]} onChange={cl => setSelectedEntityObject(cl)} ontology_uri={props.ontology_uri} />
                    </>}
                </>}
                {selectedType === 3 && <>
                    <ItemSelectorButton selected={selectedAtrClass} title={'Класс'} labels={[CLASS]} onChange={cl => setSelectedAtrClass(cl)} ontology_uri={props.ontology_uri} />
                    {selectedAtrClass && <>
                        <ItemSelectorButton selected={selectedEntityAttribute} title={'Аттрибут'} labels={[OBJECT_PROPERTY]} onChange={cl => setSelectedEntityAttribute(cl)} ontology_uri={props.ontology_uri} />
                    </>}
                </>}
            </div>
            <button id='ws-entity-form-add' onClick={onSave}>СОХРАНИТЬ</button>
        </div>
    </>;
};

export default EntityForm;

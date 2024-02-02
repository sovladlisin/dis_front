import * as React from 'react';
import { PageBlockTypes, TPage, TPageBlock, TProject } from '../../actions/projects/types';
import { createPageBlock, updatePageBlock } from '../../actions/projects/projects';
import { useDispatch } from 'react-redux';
import { CLASS, useOnClickOutside } from '../../utils';
import ItemSelectorButton from './ItemSelectorButton';
import CustomSelectorButton from './CustomSelectorButton';
import { TNode } from '../../actions/graph/types';
import CustomSelectorButtonByUri from './CustomSelectorButtonByUri';
import ItemSelectorButtonByUri from './ItemSelectorButtonByUri';
import ClassAttributesSelectorButton from './ClassAttributesSelectorButton';

interface IPageBlockFormProps {
    page_block?: TPageBlock,
    page: TPage,
    project: TProject,
    onClose: () => void
}

const PageBlockForm: React.FunctionComponent<IPageBlockFormProps> = (props) => {
    const dispatch = useDispatch()

    const types = Object.keys(PageBlockTypes)

    const defaultPageBlock: TPageBlock = {
        x: 1,
        y: 1,
        h: 10,
        w: 10,
        page_id: props.page.id,
        block_type: 'text',
        data: {
            font_size: 9,
            font_weight: false,
            text: '',
            ontology_uri: '',
            class_uri: '',
            class_attributes: [],
            picture_data: '',
        }
    }

    const [pageBlock, setPageBlock] = React.useState<TPageBlock>(props.page_block ? props.page_block : defaultPageBlock)

    const ref = React.useRef()
    useOnClickOutside(ref, () => props.onClose())

    const [selectedOntology, setSelectedOntology] = React.useState<TNode>(null)
    const [selectedClass, setSelectedClass] = React.useState<TNode>(null)

    const onSave = () => {
        var result = { ...pageBlock }
        pageBlock.id ? dispatch(updatePageBlock(result)) : dispatch(createPageBlock(result))
        props.onClose()
    }

    return <>



        <div className='m-form' ref={ref}>
            <p className='m-form-title'>{PageBlockTypes[pageBlock.block_type]}</p>
            <div className='m-form-fields'>
                {pageBlock.block_type === 'text' && <>
                    <label>Текст</label>
                    <textarea value={pageBlock.data.text} onChange={e => setPageBlock({ ...pageBlock, data: { ...pageBlock.data, text: e.target.value } })}></textarea>
                    <label>Размер шрифта</label>
                    <input value={pageBlock.data.font_size} type='number' onChange={e => setPageBlock({ ...pageBlock, data: { ...pageBlock.data, font_size: parseInt(e.target.value) } })}></input>
                    <label>Жирный шрифт</label>
                    <button onClick={_ => setPageBlock({ ...pageBlock, data: { ...pageBlock.data, font_weight: !pageBlock.data.font_weight } })} className={pageBlock.data.font_weight ? 'color-green' : 'color-red'}>
                        {pageBlock.data.font_weight ? <i className='fas fa-toggle-on'></i> : <i className='fas fa-toggle-off'></i>}
                    </button>
                </>}

                {(pageBlock.block_type === 'bullet_list' || pageBlock.block_type === 'card_list' || pageBlock.block_type === 'media') && <>
                    <CustomSelectorButtonByUri
                        title='Онтология'
                        selected={pageBlock.data.ontology_uri ? pageBlock.data.ontology_uri : ''}
                        onChange={(node) => setPageBlock({ ...pageBlock, data: { ...pageBlock.data, ontology_uri: node.data.uri, class_uri: '' } })}
                        nodes={[...props.project.ontologies_nodes, props.project.res_ontology_node]}
                    />

                    {pageBlock.data.ontology_uri && pageBlock.data.ontology_uri.length != 0 && <>
                        <ItemSelectorButtonByUri
                            title='Класс'
                            ontology_uri={pageBlock.data.ontology_uri}
                            selected={pageBlock.data.class_uri ? pageBlock.data.class_uri : ''}
                            labels={[CLASS]}
                            onChange={(node) => setPageBlock({ ...pageBlock, data: { ...pageBlock.data, class_uri: node.data.uri } })}
                        />

                        {pageBlock.data.class_uri && pageBlock.data.class_uri.length != 0 && <>
                            <ClassAttributesSelectorButton
                                class_uri={pageBlock.data.class_uri}
                                ontology_uri={pageBlock.data.ontology_uri}
                                title='Параметры'
                                selected={pageBlock.data.class_attributes}
                                onChange={(selected) => setPageBlock({ ...pageBlock, data: { ...pageBlock.data, class_attributes: selected } })}
                            />
                        </>}
                    </>}

                </>}




            </div>
            <div className='m-form-controls'>
                <button className='bg-blue' onClick={onSave}>Сохранить</button>
                <button className='bg-red' onClick={props.onClose}>Отмена</button>
            </div>





            <div className='m-form-block-types-container'>
                {types.map(t => {
                    var icon = <span>?</span>
                    switch (t) {
                        case 'text':
                            icon = <i className='fas fa-paragraph'></i>
                            break;
                        case 'card_list':
                            icon = <i className="fas fa-th-large"></i>
                            break;
                        case 'bullet_list':
                            icon = <i className="fas fa-list"></i>
                            break;
                        case 'media':
                            icon = <i className="fas fa-image"></i>
                            break;
                        case 'media_slide_show':
                            icon = <i className="fas fa-images"></i>
                            break;
                    }


                    // @ts-ignore
                    return <button className={pageBlock.block_type === t ? 'bg-blue color-white' : 'bg-white color-blue'} onClick={_ => setPageBlock({ ...pageBlock, block_type: t })}>{icon}</button>
                })}
            </div>
        </div>

        <div className='m-background'></div>

    </>;
};

export default PageBlockForm;

import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom'
import { RootStore } from '../../../store';
import Xarrow from "react-xarrows";
import Loading from '../../Loading';
import { Link, useLocation } from 'react-router-dom'
import { CLASS, OBJECT, SERVER_URL, SERVER_URL_FILES, decode, getNodeColor, getNodeLabel, useKeyPress } from '../../../utils';
import { TEntity, TMarkup, TTextRelation } from '../../../actions/markup/types';
import { TNode } from '../../../actions/graph/types';
import axios from 'axios';
import { TProject } from '../../../actions/projects/types';
import { deleteMarkup, deleteTextEnitity, getMarkups, getTextEntities, getTextRelations } from '../../../actions/markup/markup';
import EntityForm from './EnityForm';
import MarkupForm from './MarkupForm';
import RelationForm from './RelationForm';
import EntityInfo from '../../Forms/EntityForm/EntityInfo';
import { openEntity } from '../../../actions/ontology/ontology';

interface ITextWorkspaceProps {
    project: TProject
}
export type TComment = {
    position: number,
    text: string,
}

const REGEX = /(\s*[,\n.\s]+\s*)/

const TextWorkspace: React.FunctionComponent<ITextWorkspaceProps> = (props) => {
    const id = window.location.href.split('textEditor')[1].split('/')[1]
    const text_uri: string = decode(id)

    const markupState = useSelector((state: RootStore) => state.markup)

    const [originNode, setOriginNode] = React.useState<TNode>(null)
    const [translatedNode, setTranslatedNode] = React.useState<TNode>(null)
    const [commentaryNode, setCommentaryNode] = React.useState<TNode>(null)

    const [ontologies, setOntologies] = React.useState<TNode[]>([])
    const [selectedOntology, setSelectedOntology] = React.useState<TNode>(null)
    const onLoad = async () => {
        const body = JSON.stringify({ uris: [text_uri], ontology_uri: props.project.res_ontologies_uris })
        var response = await axios.post(SERVER_URL + 'api/getItemsByUris', body)
        console.log(response, "RESPONSE")
        const origin: TNode = response.data[0]
        setOriginNode(origin)

        if (origin.data.connected_file) {
            const body3 = JSON.stringify({ uris: [origin.data.connected_file.file_uri], ontology_uri: props.project.res_ontologies_uris })
            var response3 = await axios.post(SERVER_URL + 'api/getItemsByUris', body3)
            console.log(response, "RESPONSE")
            setTranslatedNode(response3.data[0])
        }

        const body2 = JSON.stringify({ uris: props.project.ontologies_uris })
        var response2 = await axios.post(SERVER_URL + 'api/getItemsByUris', body2)
        console.log(response, "RESPONSE")
        setOntologies(response2.data)
    }

    React.useEffect(() => {
        onLoad()
    }, [])



    const ctrlPress = useKeyPress('Control');
    const shiftPress = useKeyPress('Shift');

    const dispatch = useDispatch()
    // const workState = useSelector((state: RootStore) => state.workspace)




    const [addEntityWindow, setAddEntityWindow] = React.useState(false)

    const [originalText, setOriginalText] = React.useState<string[]>([])
    const [translatedText, setTranslatedText] = React.useState<string[]>([])
    const [commentaryText, setCommentaryText] = React.useState<TComment[]>([])


    const [relationAddWindow, setRelationAddWindow] = React.useState(false)

    const [selectedNodeInfo, setSelectedNodeInfo] = React.useState('')
    const [selectedClassForObjectAdd, setSelectedClassForObjectAdd] = React.useState('')
    const [objectAddWindow, setObjectAddWindow] = React.useState(false)

    // markup
    const [newEntity, setNewEntity] = React.useState<TEntity>({ pos_end: -1, pos_start: -1, node_uri: '', node: null })
    const apllyToSelectedWords = (key: number) => {
        var n = { ...newEntity }
        if (n.pos_start === -1 && n.pos_end === -1) {
            n.pos_start = key
            n.pos_end = key
        }
        else if (n.pos_start < key && n.pos_end > key || n.pos_start > key && n.pos_end > key)
            n.pos_start = key
        else if (n.pos_start === key && n.pos_end === key) {
            n.pos_start = -1
            n.pos_end = -1
        }
        else if (n.pos_start === key || n.pos_end === key) {
            n.pos_start = key
            n.pos_end = key
        }
        else if (n.pos_start < key && n.pos_end < key)
            n.pos_end = key
        setNewEntity(n)
    }


    // React.useEffect(() => {
    //     dispatch(getWorkspace(current_id))
    // }, [])

    // const [workInfo, setWorkInfo] = React.useState<TWorkspaceInfo>(null)
    // React.useEffect(() => {
    //     if (!workState.info || workState.info.id != current_id) return;
    //     setWorkInfo(workState.info)
    // }, [, workState.info])

    // React.useEffect(() => {
    //     if (!workInfo || !workState.newConnectedFile || workState.newConnectedFile.id != workInfo.id ||
    //         workInfo.resources.find(r => r.file.id === workState.newConnectedFile.data.media_carrier[0].file.id)
    //     ) return;

    //     setWorkInfo({ ...workInfo, resources: [...workInfo.resources, { node: workState.newConnectedFile.data.resource, file: workState.newConnectedFile.data.media_carrier[0].file }] })

    // }, [, workState.newConnectedFile])

    // React.useEffect(() => {
    //     if (!workInfo || workState.disconnectedFile === -1) return;
    //     setWorkInfo({ ...workInfo, resources: workInfo.resources.filter(r => r.node.id != workState.disconnectedFile) })

    // }, [, workState.disconnectedFile])


    // const classState = useSelector((state: RootStore) => state.classes)




    React.useEffect(() => {
        if (originNode === null) return;
        dispatch(getMarkups(originNode.data.uri))
        const dom = SERVER_URL_FILES
        fetch(dom + originNode.data?.file?.url).then((r) => r.text()).then(text => {
            setOriginalText(text.split('\n'))
        })
        if (translatedNode === null) return;
        fetch(dom + translatedNode.data?.file?.url).then((r) => r.text()).then(text => {
            setTranslatedText(text.split('\n'))
        })
        // fetch(dom + workInfo.translation_url).then((r) => r.text()).then(text => {
        //     setTranslatedText(text.split('\n'))
        // })
        // fetch(dom + workInfo.commentary_url).then((r) => r.text()).then(text => {
        //     var i = -1
        //     setCommentaryText(text.split('\n').map(c => {
        //         i = i + 1
        //         return { position: i, text: c }
        //     }))
        // })
    }, [originNode, translatedNode])

    const [markups, setMarkups] = React.useState<TMarkup[]>([])
    const [selectedMarkup, setSelectedMarkup] = React.useState<TMarkup>(null)
    const [onEditMarkup, setOnEditMarkup] = React.useState<TMarkup>(null)
    React.useEffect(() => {
        if (originNode && markupState.textMarkups && markupState.textMarkups.text_uri === originNode.data.uri) {
            setMarkups(markupState.textMarkups.markups)
        }
    }, [, markupState.textMarkups, originNode, markupState.newMarkup])

    const [numberOfLines, setNumberOfLines] = React.useState(50)
    const [pageNumber, setPageNumber] = React.useState(1)
    const renderNavBar = () => {
        return <>
            <div className='nav-bar'>
                <p>Страница: </p>
                <input type="number" min="1" step="1" value={pageNumber} onChange={(e) => setPageNumber(parseInt(e.target.value))} />
                <p>Число строк на странице: </p>
                <input type="number" min="1" step="1" value={numberOfLines} onChange={(e) => setNumberOfLines(parseInt(e.target.value))} />
                <p>Всего строк: </p>
                <p className='text-all-lines-counter'>{originalText.length}</p>

                {selectedMarkup &&
                    <button onClick={_ => setRelationAddWindow(!relationAddWindow)} className='text-create-new-relation'><i className='fas fa-link'></i></button>}
                {!addEntityWindow &&
                    newEntity.pos_start != -1 &&
                    newEntity.pos_end != -1 &&
                    selectedMarkup &&
                    <button className='text-add-entity' onClick={_ => setAddEntityWindow(true)}><i className="fas fa-paperclip"></i></button>}
            </div>
        </>
    }

    const [entities, setEntities] = React.useState<TEntity[]>([])
    const [textRelations, setTextRelations] = React.useState<TTextRelation[]>([])
    React.useEffect(() => {
        if (selectedMarkup != null) {
            dispatch(getTextEntities(selectedMarkup.id))
            dispatch(getTextRelations(selectedMarkup.id))
        }
    }, [selectedMarkup])
    React.useEffect(() => {
        if (originNode && selectedMarkup && markupState.markupEntities && markupState.markupEntities.markup_id === selectedMarkup.id)
            setEntities(markupState.markupEntities.entities)

    }, [, markupState.markupEntities])
    React.useEffect(() => {
        if (originNode && selectedMarkup && markupState.textRelations && markupState.textRelations.markup_id === selectedMarkup.id)
            setTextRelations(markupState.textRelations.relations)
    }, [, markupState.textRelations])


    const [zoomedEntities, setZoomedEntities] = React.useState<number[]>([])
    const [showRelations, setShowRelations] = React.useState<TTextRelation[]>([])
    const onEntityZoom = (entity_id: number) => {
        var ids = []
        var new_rel: TTextRelation[] = []
        textRelations.map(r => {
            const local_ids = [r.connection, r.start, r.end]
            if (local_ids.includes(entity_id)) {
                ids = ids.concat(local_ids)
                new_rel.push(r)
            }
        })
        setShowRelations(new_rel)
        setZoomedEntities(ids)
    }

    const onEntityTransfer = (e, entity: TEntity) => {
        e.dataTransfer.setData('entity', JSON.stringify(entity))
    }

    const [selectedComment, setSelectedComment] = React.useState<TComment>(null)
    const [commentsChanged, setCommentsChanged] = React.useState(false)

    var main_line_style = {
        gridTemplateColumns: '30px 1fr',
    }
    if (translatedNode)
        main_line_style.gridTemplateColumns = '30px 1fr 1fr'

    const renderText = () => {
        var start = (pageNumber - 1) * numberOfLines
        const end = start + numberOfLines

        const original_text = originalText.slice(start, end);
        const translated_text = translatedText.slice(start, end);
        // const commentary_text = commentary.slice(start, end);

        var i = -1
        start -= 1

        return original_text.map(_ => {
            i += 1
            start += 1
            // const comment: TComment = commentary_text[i]

            var p_relations = null
            var c_relations = null

            var og_index = -1
            const original_line = original_text[i].split(REGEX).filter(word => word != " ").map(word => {


                og_index += 1
                const key = start * 1000 + og_index
                const is_selected = newEntity.pos_start <= key && newEntity.pos_end >= key

                const node_found = entities.find(en => key <= en.pos_end && key >= en.pos_start)
                var node_info = {
                    title: '',
                    node_uri: '',
                    id: -1
                }

                var background = 'white'
                if (node_found) {
                    node_info.id = node_found.node.data.id
                    node_info.node_uri = node_found.node.data.uri
                    node_info.title = getNodeLabel(node_found.node)
                    background = getNodeColor(node_found.node)
                }



                var label_style = {}
                label_style['background'] = background
                var word_style = {}
                word_style['background'] = background
                word_style['background'] = is_selected ? "grey" : background

                if (zoomedEntities.length > 0) {
                    if (node_found && zoomedEntities.includes(node_found.id)) {

                    }
                    else {
                        label_style = { background: 'white', opacity: '1' }
                        word_style = { background: 'white', color: '#dcdcdc' }
                    }
                }

                return <span
                    key={key}
                    className='ws-word'
                    onClick={_ => {
                        ctrlPress && apllyToSelectedWords(key)
                    }}
                    style={word_style}
                >
                    {node_found && key === node_found.pos_start && <>
                        <span
                            onMouseEnter={_ => onEntityZoom(node_found.id)}
                            onMouseLeave={_ => setZoomedEntities([])}
                            onDragStart={(e) => onEntityTransfer(e, node_found)}
                            draggable
                            id={'label-' + node_found.id}
                            style={label_style}
                            onClick={_ => {
                                shiftPress && dispatch(deleteTextEnitity(node_info.id))
                                if (!shiftPress) dispatch(openEntity({ ontology_uri: node_found.node.data.ontology_uri, uri: node_found.node.data.uri }))
                            }}
                            className='ws-node-label'>

                            <span>{node_info.title}</span>

                        </span>
                    </>}
                    {word}
                </span>
            })

            const is_populated = entities.find(en => Math.floor(en.pos_start / 1000) === start)
            const comment: TComment = commentaryText[i]

            var local_style = { ...main_line_style, marginTop: '10px' }
            if (is_populated)
                local_style.marginTop = '25px'

            return <div className='text-line'>
                <div className='main-line' style={local_style}>
                    <p className='line-index'>{start}</p>
                    <p>{original_line}</p>
                    {translatedNode && <p>{translated_text[i]}</p>}
                </div>
                <button onClick={() => setSelectedComment(comment)} style={comment && comment.text.length > 1 ? { color: '#787672' } : {}}><i className='fas fa-comment'></i></button>
                <p className='link-line-info'>{p_relations} {c_relations}</p>

                {/* {selectedComment && selectedComment.position === comment.position &&
                    <CommentaryInfo
                        onSave={(comm: TComment) => {
                            setCommentsChanged(true); setCommentaryText(commentaryText.map(c => c.position === comm.position ? comm : c))
                        }}
                        comment={selectedComment}
                        onClose={() => setSelectedComment(null)}>
                    </CommentaryInfo>} */}

            </div>
        })

    }

    const renderResources = () => {

    }

    const renderInfo = () => {
        return <div className='ws-text-info'>
            <p className='ws-text-note'>
                {/* {workInfo.origin_node[NOTE_URI]} */}
            </p>
            <div className='ws-text-attr'>


            </div>
        </div>
    }

    const markEntity = () => { }

    const [textMode, setTextMode] = React.useState(2)
    const [commentMode, setCommentMode] = React.useState(true)

    const location = useLocation();

    const corpus_uri_props: string = location.corpusUri

    const authState = useSelector((state: RootStore) => state.auth.account)
    return <>
        <div className='sub-page-container'>
            {originNode === null ? <>
                <Loading height={500} />
            </> :
                <>
                    <div className='workspace-title'>
                        <p className='workspace-title-header'>{getNodeLabel(originNode)}</p>
                        <button onClick={_ => dispatch(openEntity({ ontology_uri: originNode.data.ontology_uri, uri: originNode.data.uri }))}><i className='fas fa-info'></i></button>
                    </div>

                    <div className='ws-container'>
                        {/* <div className='ws-control-panel'>
                    <button style={selectedView === 1 ? { background: '#252854', color: 'white' } : {}} onClick={_ => setSelectedView(1)}>Текст</button>
                    <button style={selectedView === 2 ? { background: '#252854', color: 'white' } : {}} onClick={_ => setSelectedView(2)}>Ресурсы</button>
                    <button style={selectedView === 3 ? { background: '#252854', color: 'white' } : {}} onClick={_ => setSelectedView(3)}>Описание</button>
                </div> */}
                        <div className='text-content-main-container'>

                            <div className='ws-content'>
                                {/* {selectedView === 3 && <TextResourceList resources={workInfo.resources} object_id={workInfo.origin_node.id} />}
                                {selectedView === 1 && <TextInfo node_info={workInfo.origin_node_extended} />}
                                {selectedView === 4 && selectedOntology && <TextOntology uri={selectedOntology['uri']} />} */}



                                <div className='text-workspace-main-control-pannel'>

                                    <div className='text-workspace-main-control-pannel-block'>
                                        <h1>Режимы</h1>
                                        <div className='workspace-text-mode'>
                                            <button className={textMode === 1 ? 'workspace-text-mode-selected' : ''} onClick={_ => setTextMode(1)}>Просмотр</button>
                                            <button className={textMode === 2 ? 'workspace-text-mode-selected' : ''} onClick={_ => setTextMode(2)}>Разметка</button>
                                        </div>
                                    </div>

                                    <div className='text-workspace-main-control-pannel-block'>
                                        <h1>Выбор онтологии</h1>
                                        <div className='ws-ontology-list'>
                                            {ontologies.map(o => {
                                                const selected = selectedOntology && selectedOntology.id === o.id
                                                return <button className={selected ? 'ws-ontology-list-selected' : ''} onClick={_ => setSelectedOntology(o)}>
                                                    {getNodeLabel(o)}
                                                </button>
                                            })}
                                        </div>
                                    </div>

                                    <div className='text-workspace-main-control-pannel-block'>
                                        <h1>Выбор разметки</h1>
                                        {ontologies.length > 0 && selectedOntology && <>
                                            <div className='ws-markup-list'>
                                                {markups.filter(m => m.ontology_uri === selectedOntology.data.uri).map(m => {
                                                    const selected = selectedMarkup && selectedMarkup.id === m.id
                                                    return <p className={selected ? 'ws-markup-list-selected' : ''} onClick={_ => setSelectedMarkup(m)}>
                                                        {m.name}
                                                        {m.user?.id === authState?.id && <>
                                                            <button onClick={_ => setOnEditMarkup(m)}><i className="fas fa-edit"></i></button>
                                                            <button onClick={_ => dispatch(deleteMarkup(m.id))}><i className="fas fa-trash"></i></button>
                                                        </>}
                                                    </p>
                                                })}
                                                <button
                                                    className='ws-markup-list-add-markup-button'
                                                    onClick={_ => {
                                                        var new_markup: TMarkup = {
                                                            id: -1,
                                                            name: 'Не указано',
                                                            user: { id: -1, username: '' },
                                                            original_object_uri: originNode.data.uri,
                                                            ontology_uri: selectedOntology.data.uri,
                                                            ontology: selectedOntology
                                                        }
                                                        setOnEditMarkup(new_markup)
                                                    }}
                                                >Добавить разметку</button>
                                            </div>
                                        </>}
                                    </div>



                                </div>









                                {renderNavBar()}

                                <div className='text-lines-main-container'>
                                    <div className='text-line-labels' style={main_line_style}>
                                        <span></span>
                                        <p style={{ paddingLeft: '5xp' }}>Оригинальный текст</p>
                                        {translatedNode && <p>Перевод</p>}
                                    </div>
                                    {renderText()}
                                </div>

                                {/* {selectedView === 2 && <>
                                    {renderResources()}
                                </>}
                                {selectedView === 3 && <>
                                    {renderInfo()}
                                </>} */}
                            </div>
                        </div>
                    </div>
                </>}
        </div>

        {selectedMarkup && <button id='ws-add-relation' onClick={_ => setRelationAddWindow(!relationAddWindow)}><i className="fas fa-link"></i></button>}

        {addEntityWindow && <EntityForm onClose={() => { setAddEntityWindow(false); setNewEntity({ ...newEntity, pos_start: -1, pos_end: -1 }) }} markup_id={selectedMarkup.id} ontology_uri={selectedMarkup.ontology_uri} entity={newEntity} />}
        {onEditMarkup && <MarkupForm markup={onEditMarkup} onClose={() => setOnEditMarkup(null)} />}
        {selectedMarkup && relationAddWindow && <RelationForm markup_id={selectedMarkup.id} onClose={() => setRelationAddWindow(false)} />}

        {zoomedEntities.length > 0 && <>
            <div className='ws-arrows'>
                {showRelations.map(r => {
                    return <>
                        <Xarrow
                            start={'label-' + r.start}
                            end={'label-' + r.connection}
                            // startAnchor='right'
                            // endAnchor='left'
                            color='#e53667'
                            headSize={4}
                            strokeWidth={2}
                            animateDrawing={0.2}

                        />
                        <Xarrow
                            start={'label-' + r.connection}
                            end={'label-' + r.end}
                            // startAnchor='right'
                            // endAnchor='left'
                            headSize={4}
                            strokeWidth={2}
                            color='#e53667'
                            animateDrawing={0.2}



                        />
                    </>
                })}
            </div>

        </>}

        {/* {objectAddWindow && <ObjectForm domain={selectedMarkup.ontology_uri} class_uri={selectedClassForObjectAdd} onClose={() => setObjectAddWindow(false)} />} */}
        {/* {commentsChanged && <button id='save-comments' onClick={() => { dispatch(changeComments(commentaryText, workInfo.commentary_node['uri'])); setCommentsChanged(false) }}>Сохранить комментарии</button>}  */}

    </>;
};

export default TextWorkspace;

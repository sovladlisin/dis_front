import * as React from 'react';
import { useCallback } from 'react';

import 'reactflow/dist/style.css';
import MainEdge from './Graph/MainEdge';
import MainNode from './Graph/MainNode';
import { useDispatch, useSelector } from 'react-redux';
import { applyPattern, collectPatterns, createObject, createRelation, deleteEntity, getGraph, savePattern, toggleNode } from '../actions/graph/graph';
import { RootStore } from '../store';
import Loading from './Loading';
import { TArc, TNode, TPattern } from '../actions/graph/types';
import { calcNodeWidthForLayout, checkPattern, CLASS, DATATYPE_PROPERTY, decode, getRandomInt, HAS_TYPE, MAIN_MARKER, OBJECT, OBJECT_PROPERTY, PROPERTY_DOMAIN, PROPERTY_RANGE, SUB_CLASS } from '../utils';
import ClassForm from './Forms/ClassForm';
import ObjectForm from './Forms/ObjectForm';
import GraphFlowWithProvider from './GraphFlowWithProvider';
import PatternMenu from './Graph/PatternMenu';
import PatternForm from './Forms/Pattern/PatternForm';
import ApplyPatternForm from './Forms/ApplyPatternForm';
import EntityForm from './Forms/EntityForm/EntityForm';
import { openEntity } from '../actions/ontology/ontology';
import OntologyPatternMenu from './Graph/OntologyPatternMenu';
import ReactFlow, { useOnSelectionChange, useReactFlow, MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge, applyEdgeChanges } from 'reactflow';

interface IGraphProps {
    uri: string
}

const Graph: React.FunctionComponent<IGraphProps> = (props) => {
    const ontology_uri: string = props.uri
    const dispatch = useDispatch()
    React.useEffect(() => { dispatch(getGraph(ontology_uri)) }, [])
    const graphState = useSelector((state: RootStore) => state.graph)

    // filters
    const [selectedFilter, setSelectedFilters] = React.useState(1)
    const [showFilterWindow, setShowFilterWindow] = React.useState(false)

    React.useEffect(() => {
        const d_nodes = graphState.nodes.map(n => {
            // n.draggable = false
            n.data = {
                ...n.data,
                onToggle: onToggleNode,
                onCreateSubClass: onCreateSubClass,
                onCreateObject: onCreateObject,
                onDelete: onDeleteEntity,
                onApplyPattern: onApplyPattern,
                onOpenEntity: onOpenEntity,
                onNodeConnect: onNodeConnect,
                onEdit: onEdit,
                toggled_data: getToggledData(n, graphState.arcs)
            }
            return n
        })
        setNodes(d_nodes)
        setEdges(graphState.arcs.map(e => {
            e.markerEnd = MAIN_MARKER
            e.animated = false
            return e
        }))
        updateGraphLayout(d_nodes, graphState.arcs)
    }, [graphState.arcs, graphState.nodes, selectedFilter])

    const nodeTypes = React.useMemo(() => ({ mainNode: MainNode }), []);
    const edgeTypes = React.useMemo(() => ({ mainEdge: MainEdge }), []);

    const getToggledData = (node: TNode, arcs: TArc[]) => {
        return []
        var selected_nodes: string[] = []
        const recurr = (s_n: string[], current: string) => {
            arcs.filter(e => e.target === current).map(e => {
                s_n.push(e.source)
                s_n = recurr(s_n, e.source)
            })

            return s_n
        }
        selected_nodes = recurr(selected_nodes, node.data.uri)
        return selected_nodes
    }



    // hooks
    const [addingClass, setAddingClass] = React.useState(false)
    const [addingObject, setAddingObject] = React.useState<string>(null) // class uri
    const [addingClassWithParent, setAddingClassWithParent] = React.useState<string>(null) // parent uri
    const [entityForm, setEntityForm] = React.useState<string>(null)

    const onCreateSubClass = (parent_uri: string) => setAddingClassWithParent(parent_uri)
    const onDeleteEntity = (uri: string) => dispatch(deleteEntity(ontology_uri, uri))
    const onToggleNode = (uri: string) => dispatch(toggleNode(uri))
    const onCreateObject = (class_uri: string) => setAddingObject(class_uri)
    const onApplyPattern = (node: TNode, pattern: TPattern) => setApplyPatternWindow({ pattern, node })
    const onEdit = (uri: string) => setEntityForm(uri)
    const onOpenEntity = (ontology_uri, uri) => dispatch(openEntity({ ontology_uri, uri }))
    const onNodeConnect = (source: string, target: string) => dispatch(createRelation(source, target, ontology_uri))

    // layout
    const updateGraphLayout = (l_nodes: TNode[] | any, l_edges: TArc[] | any) => {
        var dagre = require("dagre");
        var g = new dagre.graphlib.Graph();
        g.setGraph({ rankdir: 'BT', nodesep: 10, minlen: 2, ranksep: 150, ranker: 'network-simplex' });
        g.setDefaultEdgeLabel(function () { return {}; });

        var filter = []
        l_nodes.map(node => {
            filter = node.data.is_toggled ? filter.concat(node.data.toggled_data) : filter
        })
        var l_nodes_new: TNode[] = l_nodes.filter(node => !filter.includes(node.data.uri))

        // global filtering
        l_nodes_new = l_nodes_new.filter(node => {
            const labels = node.data.labels
            if (selectedFilter === 1)
                return labels.includes(CLASS) || labels.includes(OBJECT)
            if (selectedFilter === 2)
                return labels.includes(CLASS)
            if (selectedFilter === 3)
                return labels.includes(CLASS) || labels.includes(DATATYPE_PROPERTY) || labels.includes(OBJECT_PROPERTY)
            return true
        })


        var nodes_uris = l_nodes_new.map(n => n.data.uri)


        l_edges.map(edge => {
            if (nodes_uris.includes(edge.source) && nodes_uris.includes(edge.target)) {
                g.setEdge(edge.source, edge.target);
            }
        })

        l_nodes_new.map(node => { g.setNode(node.data.uri, { label: node.data.uri, width: calcNodeWidthForLayout(node), height: 35 }); })
        dagre.layout(g);
        var new_nodes = {}
        g.nodes().map(node_id => {
            const x = g.node(node_id).x
            const y = g.node(node_id).y
            new_nodes[node_id] = { x, y }
        })
        setNodes(l_nodes_new.map(node => {
            node.position.x = new_nodes[node.data.uri].x - calcNodeWidthForLayout(node) / 2
            node.position.y = new_nodes[node.data.uri].y
            return node
        }))
    }

    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    // // edges
    // const onEdgesChange = (changes) => {
    // }

    // const { setViewport, zoomIn, zoomOut } = useReactFlow();
    // const handleTransform = useCallback(() => {
    //     setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 800 });
    // }, [setViewport]);

    const [patternMainMenu, setPatternMainMenu] = React.useState(false)
    const [patternWindow, setPatternWindow] = React.useState(null)
    const [applyPatternWindow, setApplyPatternWindow] = React.useState<{ pattern: TPattern, node: TNode }>(null)



    // todo fix autoupdating
    React.useEffect(() => {
        var l_patterns = graphState.patterns
        l_patterns = graphState.patterns.map(p => {
            p.target_query = checkPattern(p)
            return p
        })
        dispatch(collectPatterns(l_patterns))
    }, [])


    const neo_edges = [PROPERTY_DOMAIN, PROPERTY_RANGE, SUB_CLASS, HAS_TYPE]
    const [edgeForm, setEdgeForm] = React.useState<{ source: string, target: string }>(null)
    // const addGraphEdge = (rel_name: string, source: string, target: string) => {
    //     const new_edge: TArc = {
    //         id: getRandomInt() + '',
    //         source: source,
    //         target: target,
    //         markerEnd: MAIN_MARKER,
    //         type: ''

    //     }
    //     setPattern({ ...pattern, arcs: [...pattern.arcs, new_edge] })
    // }


    const [ontologyPatternMenu, setOntologyPatternMenu] = React.useState(false)


    return <>

        <div className='graph-main-container'>
            {patternMainMenu && <PatternMenu onClose={() => setPatternMainMenu(false)} onPatternEdit={(pattern: TPattern) => { setPatternWindow(pattern) }} ontology_uri={ontology_uri} />}
            {addingClass && <ClassForm ontology_uri={ontology_uri} onClose={() => setAddingClass(false)} />}
            {addingClassWithParent && <ClassForm ontology_uri={ontology_uri} onClose={() => setAddingClassWithParent(null)} parent_uri={addingClassWithParent} />}
            {addingObject && <ObjectForm ontology_uri={ontology_uri} onClose={() => setAddingObject(null)} class_uri={addingObject} />}
            {patternWindow && <PatternForm ontology_uri={ontology_uri} onSave={pattern => dispatch(savePattern(pattern))} onClose={() => setPatternWindow(null)} pattern={patternWindow} />}
            {applyPatternWindow && <ApplyPatternForm onApply={(pattern: TPattern) => dispatch(applyPattern(pattern))} onClose={() => setApplyPatternWindow(null)} ontology_uri={ontology_uri} pattern={applyPatternWindow.pattern} node={applyPatternWindow.node} />}
            {entityForm && <EntityForm ontology_uri={ontology_uri} onClose={() => setEntityForm(null)} uri={entityForm} />}
            {ontologyPatternMenu && <OntologyPatternMenu ontology_uri={ontology_uri} onClose={() => setOntologyPatternMenu(false)} />}

            <div className='graph-actions'>
                <button className={addingClass ? 'graph-actions-button-selected' : ''} onClick={_ => { setAddingClass(!addingClass) }}><p>Добавить класс</p><i className='fas fa-plus'></i></button>
                <button className={patternMainMenu ? 'graph-actions-button-selected' : ''} onClick={_ => setPatternMainMenu(!patternMainMenu)}><p>Паттерны</p><i className='fas fa-project-diagram'></i></button>
                <button className={ontologyPatternMenu ? 'graph-actions-button-selected' : ''} onClick={_ => setOntologyPatternMenu(!ontologyPatternMenu)}><p>Паттерны содержания</p><i className='fas fa-project-diagram'></i></button>
            </div>

            {/* Filters */}
            <button className={showFilterWindow ? 'graph-filters-button selected' : 'graph-filters-button'} onClick={_ => setShowFilterWindow(!showFilterWindow)}><p>Фильтры</p><i className='fas fa-filter'></i></button>
            <div className='graph-filters'>
                {showFilterWindow && <>
                    <button className={selectedFilter === 1 && 'graph-filter-selected'} onClick={_ => selectedFilter === 1 ? setSelectedFilters(-1) : setSelectedFilters(1)}>Классы и объекты</button>
                    <button className={selectedFilter === 2 && 'graph-filter-selected'} onClick={_ => selectedFilter === 2 ? setSelectedFilters(-1) : setSelectedFilters(2)}>Классы</button>
                    <button className={selectedFilter === 3 && 'graph-filter-selected'} onClick={_ => selectedFilter === 3 ? setSelectedFilters(-1) : setSelectedFilters(3)}>Классы и атрибуты</button>
                </>}
            </div>

            {/* edges */}
            {/* {edgeForm && <EdgeSelector
                    ontology_uri={ontology_uri}
                    onClose={() => setEdgeForm(null)}
                    onSelect={(uri: string) => addPatternEdge(uri, edgeForm.source, edgeForm.target)}
                    items={neo_edges.map(e => { return { uri: e, name: e } })}
        />} */}


            {graphState.is_loading && <Loading height={600} />}
            {!graphState.is_loading && <>
                <GraphFlowWithProvider
                    // @ts-ignore
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}

                    onConnect={onConnect}
                    // @ts-ignore
                    edgeTypes={edgeTypes}
                    // @ts-ignore
                    nodeTypes={nodeTypes}


                />
            </>
            }
        </div>

    </>
}

export default Graph

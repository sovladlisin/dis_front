import * as React from 'react';
import { TNode, TPattern, TPatternArc, TPatternNode } from '../../../actions/graph/types';
import ReactFlow, { MarkerType, Background, ReactFlowProvider, useReactFlow, Controls, MiniMap, useNodesState, useEdgesState, addEdge } from 'reactflow';
import { CLASS, DATATYPE_PROPERTY, getRandomInt, HAS_TYPE, MAIN_MARKER, OBJECT, OBJECT_PROPERTY, PROPERTY_DOMAIN, PROPERTY_RANGE, SUB_CLASS } from '../../../utils';
import PatternNode from './PatternNode';
import ItemSelector from './ItemSelector';
import PatternSelector from './PatternSelector';
import { DEFAULT_LABEL } from '../../../actions/settings/types';
import EdgeSelector from './EdgeSelector';


interface IPatternFormProps {
    pattern: TPattern,
    ontology_uri: string,
    onClose: () => void,
    onSave: (pattern: TPattern) => void
}

const PatternForm: React.FunctionComponent<IPatternFormProps> = (props) => {

    const [pattern, setPattern] = React.useState(props.pattern)

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const [edgeForm, setEdgeForm] = React.useState<{ source: string, target: string }>(null)

    const onConnect = React.useCallback((params) => {
        // source: "6580"
        // sourceHandle: "a"
        // target: "86021"
        // targetHandle: null  

        // const new_edge: TPatternArc = {
        //     id: getRandomInt() + '',
        //     source: params.source,
        //     target: params.target,
        //     label: 'test'
        // }
        setEdgeForm({ source: params.source, target: params.target })

        setEdges((eds) => addEdge(params, eds))

    }, []);

    const addPatternEdge = (rel_name: string, source: string, target: string) => {
        const new_edge: TPatternArc = {
            id: getRandomInt() + '',
            source: source,
            target: target,
            label: rel_name,
            markerEnd: MAIN_MARKER

        }
        setPattern({ ...pattern, arcs: [...pattern.arcs, new_edge] })
    }


    const addNode = (
        is_main: boolean,
        tag: string,
        label: string[],
        is_create: boolean,
        is_select: boolean,
        is_const: boolean,
        is_filter?: boolean,
        is_general?: boolean,
        const_node?: TNode
    ) => {
        var new_node: TPatternNode = {
            id: getRandomInt() + '',
            type: 'mainPatternNode',
            position: { x: 40, y: 40 },
            data: {
                is_main: is_main,
                tag: tag,
                is_create: is_create,
                is_select: is_select,
                is_const: is_const,
                is_create_label: DEFAULT_LABEL,
            }
        }
        if (is_create || is_select)
            new_node.data.field_name = label

        if (is_const) {
            new_node.data.is_const_filter = is_filter
            new_node.data.is_const_general = is_general

            if (is_const && !is_general)
                new_node.data.is_const_node = const_node
        }



        setPattern({ ...pattern, nodes: [...pattern.nodes, new_node] })
    }

    React.useEffect(() => {
        updateGraphLayout(pattern.nodes, pattern.arcs)
    }, [pattern])

    const updateGraphLayout = (l_nodes: TPatternNode[] | any, l_edges: TPatternArc[] | any) => {

        const get_node = (node_id) => {

        }

        var dagre = require("dagre");
        var g = new dagre.graphlib.Graph();
        g.setGraph({ rankdir: 'BT', nodesep: 50, minlen: 2, ranksep: 150, ranker: 'network-simplex' });
        g.setDefaultEdgeLabel(function () { return {}; });

        l_nodes.map(node => { g.setNode(node.id, { width: 200 }); })

        l_edges.map(edge => { g.setEdge(edge.source, edge.target); })

        dagre.layout(g);
        var new_nodes = {}
        g.nodes().map(node_id => {
            const x = g.node(node_id).x
            const y = g.node(node_id).y
            new_nodes[node_id] = { x, y }
        })

        l_nodes = l_nodes.map(node => {
            node.position.x = new_nodes[node.id].x - 200 / 2
            node.position.y = new_nodes[node.id].y - 35 / 2
            return node
        })

        setNodes(l_nodes)
        setEdges(l_edges)
    }

    const nodeTypes = React.useMemo(() => ({ mainPatternNode: PatternNode }), []);
    // const edgeTypes = React.useMemo(() => ({ mainEdge: MainEdge }), []);

    const neo_edges = [PROPERTY_DOMAIN, PROPERTY_RANGE, SUB_CLASS, HAS_TYPE]

    const [nodeForm, setNodeForm] = React.useState<{ is_main?: boolean, is_create?: boolean, is_select?: boolean, is_const?: boolean }>(null)

    return <>
        <div className='node-context-menu-background' onClick={props.onClose}></div>
        <div className='graph-pattern-form-window'>
            <div className='graph-pattern-form-controls'>
                <button className='bg-blue' onClick={_ => setNodeForm({ is_main: true, is_create: false, is_select: false, is_const: false })}>
                    <i className='fas fa-plus'></i><p>Якорь</p>
                </button>
                <button className='bg-blue' onClick={_ => setNodeForm({ is_main: false, is_create: true, is_select: false, is_const: false })}>
                    <i className='fas fa-plus'></i><p>Создание</p>
                </button>
                <button className='bg-blue' onClick={_ => setNodeForm({ is_main: false, is_create: false, is_select: true, is_const: false })}>
                    <i className='fas fa-plus'></i><p>Выбор</p>
                </button>
                <button className='bg-blue' onClick={_ => setNodeForm({ is_main: false, is_create: false, is_select: false, is_const: true })}>
                    <i className='fas fa-plus'></i><p>Условие</p>
                </button>
            </div>
            <div className='graph-pattern-form-graph'>
                {edgeForm && <EdgeSelector
                    ontology_uri={props.ontology_uri}
                    onClose={() => setEdgeForm(null)}
                    onSelect={(uri: string) => addPatternEdge(uri, edgeForm.source, edgeForm.target)}
                    items={neo_edges.map(e => { return { uri: e, name: e } })}
                />}

                {nodeForm && <PatternSelector
                    ontology_uri={props.ontology_uri}
                    is_create={nodeForm.is_create}
                    is_main={nodeForm.is_main}
                    is_select={nodeForm.is_select}
                    is_const={nodeForm.is_const}
                    onClose={() => setNodeForm(null)}
                    onSelect={(tag: string, label: string[]) => {
                        addNode(
                            nodeForm.is_main,
                            tag,
                            label,
                            nodeForm.is_create,
                            nodeForm.is_select,
                            nodeForm.is_const
                        )
                    }}
                    onConstSelect={(tag: string, is_filter: boolean, is_general: boolean, node: TNode) => {
                        addNode(
                            nodeForm.is_main,
                            tag,
                            [],
                            nodeForm.is_create,
                            nodeForm.is_select,
                            nodeForm.is_const,
                            is_filter,
                            is_general,
                            node
                        )
                    }}
                />
                }


                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    // @ts-ignore
                    // edgeTypes={edgeTypes}

                    // @ts-ignore
                    nodeTypes={nodeTypes}
                >

                    <Background color="#aaa" gap={16} />
                </ReactFlow >
            </div>

            <div className='graph-pattern-form-window-footer'>
                <input value={pattern.name} placeholder='Название' onChange={e => setPattern({ ...pattern, name: e.target.value })}></input>
                <button className='bg-blue' onClick={_ => props.onSave(pattern)}>Сохранить</button>
                <button className='bg-red' onClick={props.onClose}>Отмена</button>
                <button className='bg-red' onClick={_ => setPattern({ ...pattern, nodes: [], arcs: [] })}>Очистить</button>
            </div>
        </div>


    </>;
};

export default PatternForm;

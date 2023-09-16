import * as React from 'react';
import ReactFlow, { useOnSelectionChange, ReactFlowProvider, useReactFlow, Controls, MiniMap, useKeyPress } from 'reactflow';
import 'reactflow/dist/style.css';
import { useCallback } from 'react';
import SearchWindow from './Graph/SearchWindow';
import { calcNodeWidthForLayout, getNodeColor } from '../utils';
import { TArc, TNode } from '../actions/graph/types';
import { useDispatch, useSelector } from 'react-redux';
import { applyOntologyPattern, highlightNode, updateGraphSelection } from '../actions/graph/graph';
import { RootStore } from '../store';



const GraphFlow: React.FunctionComponent = (props) => {
    const dispatch = useDispatch()

    const selectionState = useSelector((state: RootStore) => state.graph.selection)

    const { setViewport, zoomIn, zoomOut } = useReactFlow();
    const onNodeSelect = (node: TNode) => {
        const x = node.position.x
        const y = node.position.y
        const x_r = (x * -1) + window.innerWidth / 2 - calcNodeWidthForLayout(node) / 2
        const y_r = (y * -1) + window.innerHeight / 2 + 35 / 2
        setViewport({ x: x_r, y: y_r, zoom: 1 }, { duration: 800 });
        dispatch(highlightNode(node.data.uri))
    }

    const [searchWindow, setSearchWindow] = React.useState(false)

    const nodeColor = (node: TNode) => {
        return getNodeColor(node)
    };









    return <>

        <div className='graph-flow-controls'>
            <button className={searchWindow ? 'graph-actions-button-selected' : ''} onClick={_ => setSearchWindow(!searchWindow)}><i className='fas fa-search'></i><p>Поиск</p></button>
        </div>
        {searchWindow && <SearchWindow onClose={() => setSearchWindow(false)} onSelect={onNodeSelect} nodes={props['nodes'] ? props['nodes'] : []} />}

        <ReactFlow {...props}>
            <Controls />
            <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3}
                // @ts-ignore 
                zoomable
                pannable
            />
        </ReactFlow>
    </>
}

// wrapping with ReactFlowProvider is done outside of the component


const GraphFlowWithProvider: React.FunctionComponent = (props) => {
    return <>
        <ReactFlowProvider>
            <GraphFlow {...props} />
        </ReactFlowProvider>

    </>

}

export default GraphFlowWithProvider
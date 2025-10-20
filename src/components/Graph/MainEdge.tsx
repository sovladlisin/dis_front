import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBezierPath, EdgeLabelRenderer, BaseEdge } from '@xyflow/react';
import { deleteRelation } from '../../actions/graph/graph';
import { TNodeData } from '../../actions/graph/types';
import { getArcLabel, getNodeLabel, useKeyPress } from '../../utils';
import { RootStore } from '../../store';

export default function MainEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    data,
    markerEnd,
}) {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const data_l: TNodeData = data
    const isCtrlPress = useKeyPress('Control')
    const dispatch = useDispatch()
    const nameState = useSelector((state: RootStore) => state.graph.arc_names)


    const getTitle = () => {
        const name = nameState.find(n => n.data.uri === data_l.uri)
        return name ? getNodeLabel(name) : getArcLabel(data_l)
    }


    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            <text>
                <textPath
                    href={`#${id}`}
                    style={{ fontSize: '12px' }}
                    startOffset="20%"
                    textAnchor="left"
                    onClick={_ => {
                        console.log('test')
                        isCtrlPress && dispatch(deleteRelation(data_l.ontology_uri, data_l.id))

                    }}
                >
                </textPath>
            </text>

            <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        fontSize: 12,
                        // everything inside EdgeLabelRenderer has no pointer events by default
                        // if you have an interactive element, set pointer-events: all
                        pointerEvents: 'all',
                    }}
                    className="graph-arc-container nodrag nopan"
                >
                    <p>{getTitle()}</p>
                    <button className="graph-arc-container-delete" onClick={_ => dispatch(deleteRelation(data_l.ontology_uri, data_l.id))}>
                        <i className='fas fa-times'></i>
                    </button>
                </div>
            </EdgeLabelRenderer>
        </>
    );
}
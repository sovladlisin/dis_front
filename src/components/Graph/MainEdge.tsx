import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBezierPath } from 'reactflow';
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
    const [edgePath] = getBezierPath({
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
                    onClick={_ => isCtrlPress && dispatch(deleteRelation(data_l.ontology_uri, data_l.id))}
                >
                    {getTitle()}
                </textPath>
            </text>
        </>
    );
}
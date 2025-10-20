import * as React from 'react';

import { Handle, Position, NodeToolbar } from '@xyflow/react';
import { TNode } from '../../actions/graph/types';
import { getNodeColorClass, getNodeLabel, useOnClickOutside } from '../../utils';
import NodeMenu from './NodeMenu';


export default function MainNode(node: TNode) {
    const [isHovering, setIsHovering] = React.useState(false)
    const [showNodeMenu, setShowNodeMenu] = React.useState(false)
    const color_class = getNodeColorClass(node)
    var className = color_class
    className = node.data.is_highlighted ? className + ' highlighted-node' : className
    const locked = !node.data.labels.includes(node.data.ontology_uri)
    className = locked ? className + ' locked_node' : className


    const ref = React.useRef()
    useOnClickOutside(ref, () => { console.log('HAAAAAAAAAAAAAAAAAAAAAAA') })

    const copyContent = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            console.log('Content copied to clipboard');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }

    return (
        <>
            <div onMouseEnter={_ => setIsHovering(true)} onMouseLeave={_ => setIsHovering(false)}>

                <Handle isValidConnection={(connection) => true}
                    onConnect={(params) => node.data.onNodeConnect(params.source, params.target)}
                    type="target"
                    position={node.data.graph_direction === 'BT' ? Position.Bottom : Position.Right}
                    className={'graph-node-handle right ' + color_class}
                    id='target' />
                <div style={showNodeMenu ? { zIndex: 8 } : {}} className={'node-meta-container ' + className} >
                    <p className='node-label'>
                        {getNodeLabel(node)}
                        {locked && <span className='node-locked-marker'><i className='fas fa-lock'></i></span>}
                    </p>
                    <NodeToolbar
                        isVisible={undefined}
                        position={Position.Top}
                    >
                        <div className='node-meta-buttons-container' ref={ref}>
                            <button className={color_class} onClick={_ => setShowNodeMenu(true)}><i className='fas fa-cog' /></button>
                            <button className={color_class} onClick={_ => copyContent(node.data.uri)}><i className='fas fa-eye' /></button>
                            <button className={color_class} onClick={_ => node.data.onOpenEntity(node.data.ontology_uri, node.data.uri)}><i className='fas fa-info' /></button>
                        </div>
                    </NodeToolbar>



                </div>
                <Handle isValidConnection={(connection) => true}
                    onConnect={(params) => node.data.onNodeConnect(params.source, params.target)}
                    type="source"
                    position={node.data.graph_direction === 'BT' ? Position.Top : Position.Left}
                    className={'graph-node-handle left ' + color_class}
                    id="source" />

                {node.data.is_toggled && <span className='node-hidden-count'>{node.data.toggled_data.length}</span>}
            </div>
            {showNodeMenu && <NodeMenu node={node} onClose={() => setShowNodeMenu(false)} />}
        </>
    )
}
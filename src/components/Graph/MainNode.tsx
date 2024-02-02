import * as React from 'react';

import { Handle, Position } from 'reactflow';
import { TNode } from '../../actions/graph/types';
import { getNodeColorClass, getNodeLabel, useOnClickOutside } from '../../utils';
import NodeMenu from './NodeMenu';


export default function MainNode(node: TNode) {
    const [isHovering, setIsHovering] = React.useState(false)
    const [showNodeMenu, setShowNodeMenu] = React.useState(false)
    var className = getNodeColorClass(node)
    className = node.data.is_highlighted ? className + ' highlighted-node' : className
    const locked = !node.data.labels.includes(node.data.ontology_uri)
    className = locked ? className + ' locked_node' : className


    const hangleStyle = {
        background: 'white',
        width: '15px',
        borderRadius: '10px'
    }
    return (
        <>
            <div onMouseEnter={_ => setIsHovering(true)} onMouseLeave={_ => setIsHovering(false)}>

                <Handle isValidConnection={(connection) => true}
                    onConnect={(params) => node.data.onNodeConnect(params.source, params.target)}

                    type="target" position={Position.Bottom} style={{ ...hangleStyle }} id='target' />
                <div style={showNodeMenu ? { zIndex: 8 } : {}} className={'node-meta-container ' + className} >
                    {!isHovering && <p className='node-label'>
                        {getNodeLabel(node)}
                        {locked && <span className='node-locked-marker'><i className='fas fa-lock'></i></span>}
                    </p>}
                    {isHovering && <>
                        <p className='node-label'>
                            {getNodeLabel(node)}
                            {locked && <span className='node-locked-marker'><i className='fas fa-lock'></i></span>}
                        </p>
                        <div className='node-meta-buttons-container'>

                            <button onClick={_ => setShowNodeMenu(true)}><i className='fas fa-cog' /></button>
                            <button onClick={_ => node.data.onToggle(node.data.uri)}><i className='fas fa-eye' /></button>
                            <button onClick={_ => node.data.onOpenEntity(node.data.ontology_uri, node.data.uri)}><i className='fas fa-info' /></button>
                        </div>
                    </>}


                </div>
                <Handle isValidConnection={(connection) => true}
                    onConnect={(params) => node.data.onNodeConnect(params.source, params.target)}

                    type="source" position={Position.Top} style={{ ...hangleStyle }} id="source" />

                {node.data.is_toggled && <span className='node-hidden-count'>{node.data.toggled_data.length}</span>}
            </div>
            {showNodeMenu && <NodeMenu node={node} onClose={() => setShowNodeMenu(false)} />}
        </>
    )
}
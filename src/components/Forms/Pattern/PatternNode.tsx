import * as React from 'react';

import { Handle, Position } from '@xyflow/react';
import { TNode, TPatternNode } from '../../../actions/graph/types';
import { getNodeColorClass, getNodeLabel, getPatternNodeColorClass, useOnClickOutside } from '../../../utils';


export default function PatternNode(node: TPatternNode) {
    var className = getPatternNodeColorClass(node)

    const hangleStyle = {
        background: 'white',
        width: '15px',
        borderRadius: '10px'
    }

    const getType = () => {
        if (node.data.is_main) return 'Основной'
        if (node.data.is_create) return 'Будет создан'
        if (node.data.is_select) return 'Будет выбран'
        if (node.data.is_const) {
            const s = node.data.is_const_filter ? ' (фильтр)' : ''
            if (node.data.is_const_general) return 'Сущ. тип узлов' + s
            return 'Сущ. узел' + s
        }
    }

    return (
        <>
            <div>

                <Handle type="target" position={Position.Bottom} style={{ ...hangleStyle }} />
                <div className={'pattern-node-meta-container ' + className} >
                    <p>{node.data.tag}</p>
                    <div className='pattern-node-meta'>
                        <label>Тип:</label><p>{getType()}</p>
                        {node.data.field_name && <>
                            <label>Имя в форме:</label><p>{node.data.field_name}</p>
                        </>}
                        {node.data.is_const_node && <>
                            <label>Сущ. узел::</label><p>{getNodeLabel(node.data.is_const_node)}</p>
                        </>}
                    </div>
                </div>
                <Handle type="source" position={Position.Top} style={{ ...hangleStyle }} />

            </div>
        </>
    )
}
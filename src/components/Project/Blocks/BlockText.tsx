import * as React from 'react';
import { TPageBlock } from '../../../actions/projects/types';

interface IBlockTextProps {
    block: TPageBlock,
    devMode: boolean
}

const BlockText: React.FunctionComponent<IBlockTextProps> = (props) => {
    return <>
        <div className='project-block-text-area-container'>
            <p className='project-block-text-area' style={{ color: '#414140', fontSize: props.block.data.font_size + 'pt', fontWeight: props.block.data.font_weight ? 'bold' : 'unset' }}>
                {props.block?.data?.text}
            </p>
        </div>
    </>;
};

export default BlockText;

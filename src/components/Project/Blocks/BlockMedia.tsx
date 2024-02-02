import * as React from 'react';
import { TPageBlock } from '../../../actions/projects/types';
import { renderEntityMedia } from '../../../utils';

interface IBlockMediaProps {
    block: TPageBlock
    devMode: boolean

}

const BlockMedia: React.FunctionComponent<IBlockMediaProps> = (props) => {
    return <>
        <div className='block-media'>
            {props.block.data_nodes.nodes.map(node => {
                return <>
                    {renderEntityMedia(node)}
                </>
            })}

        </div>
    </>;
};

export default BlockMedia;

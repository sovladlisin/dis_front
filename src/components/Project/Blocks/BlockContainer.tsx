import * as React from 'react';
import { TPageBlock, TProject } from '../../../actions/projects/types';
import BlockText from './BlockText';
import { useDispatch } from 'react-redux';
import { deletePageBlock } from '../../../actions/projects/projects';
import BlockBulletList from './BlockBulletList';
import BlockCardList from './BlockCardList';
import BlockMedia from './BlockMedia';

interface IBlockContainerProps {
    block: TPageBlock,
    devMode: boolean,
    project: TProject
}

const BlockContainer: React.FunctionComponent<IBlockContainerProps> = (props) => {
    // text
    // card list
    // ontology display (with filter)
    // bullet list

    const dispatch = useDispatch()

    console.log(props.block, 'blockcontainer')

    return <>
        {props.block?.block_type === 'text' && <BlockText devMode={props.devMode} block={props.block} />}
        {props.block?.block_type === 'bullet_list' && <BlockBulletList project={props.project} devMode={props.devMode} block={props.block} />}
        {props.block?.block_type === 'card_list' && <BlockCardList devMode={props.devMode} block={props.block} />}
        {props.block?.block_type === 'media' && <BlockMedia devMode={props.devMode} block={props.block} />}
    </>;
};

export default BlockContainer;

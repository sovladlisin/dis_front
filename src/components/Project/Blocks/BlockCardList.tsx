import * as React from 'react';
import { TPageBlock } from '../../../actions/projects/types';
import { useDispatch } from 'react-redux';
import { SERVER_URL, checkEntityMedia, getNodeLabel, renderEntityMedia } from '../../../utils';
import { openEntity } from '../../../actions/ontology/ontology';
import { TNode } from '../../../actions/graph/types';
import axios from 'axios';

interface IBlockCardListProps {
    block: TPageBlock
    devMode: boolean

}

const BlockCardList: React.FunctionComponent<IBlockCardListProps> = (props) => {
    const dispatch = useDispatch()

    const [items, setItems] = React.useState<TNode[]>([])
    React.useEffect(() => {
        if (!props.block) return;
        if (!props.block.data) return;
        if (!props.block.data.ontology_uri
            || props.block.data.ontology_uri.length === 0
            || !props.block.data.class_uri
            || props.block.data.class_uri.length === 0
            || !props.block.data.class_attributes
            || props.block.data.class_attributes.length === 0) return;
        onLoad(props.block.data.ontology_uri, props.block.data.class_uri)
    }, [, props.block,])


    const onLoad = async (ontology_uri, class_uri) => {
        const body = JSON.stringify({ ontology_uri: ontology_uri, class_uri: class_uri })
        var response = await axios.post(SERVER_URL + 'api/collectClassSimpleSignature', body)
        setItems(response.data)
    }
    return <>
        <div className='block-card-list'>
            {props.block?.data_nodes?.nodes?.map(node => {
                return <>
                    <div className='block-card-list-node-container'
                    // onClick={_ => dispatch(openEntity({ ontology_uri: node.data.ontology_uri, uri: node.data.uri }))}
                    >
                        <div className='block-card-list-node-container-media-background'>
                            {checkEntityMedia(node) ? renderEntityMedia(node) : <div className='block-card-list-node-container-media-background-icon'><i className='fas fa-image'></i></div>}
                        </div>
                        <p className='block-card-list-node-container-title'>{getNodeLabel(node)}</p>
                        {props.block.data.class_attributes && props.block.data.class_attributes.length > 0 && <>
                            <div className='block-card-list-node-container-info'>
                                {props.block.data.class_attributes.map(attr_uri => {
                                    return <>
                                        <label>{getNodeLabel(items.find(n => n.data.uri === attr_uri))}</label>
                                        <p>{node.data.params_values[attr_uri]}</p>
                                    </>
                                })}
                            </div>
                        </>}
                    </div>
                </>
            })}
        </div>
    </>;
};

export default BlockCardList;

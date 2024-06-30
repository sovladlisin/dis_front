import * as React from 'react';
import { TPageBlock, TProject } from '../../../actions/projects/types';
import { SERVER_URL, checkEntityMedia, encode, getNodeLabel, renderEntityMedia } from '../../../utils';
import { useDispatch } from 'react-redux';
import { openEntity } from '../../../actions/ontology/ontology';
import axios from 'axios';
import { TNode } from '../../../actions/graph/types';
import { Link } from 'react-router-dom'
import { setMediaBlock } from '../../../actions/projects/projects';
interface IBlockBulletListProps {
    block: TPageBlock
    devMode: boolean,
    project: TProject

}

const BlockBulletList: React.FunctionComponent<IBlockBulletListProps> = (props) => {
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

    const [search, setSearch] = React.useState('')

    return <>
        <div className='block-bullet-list'>
            <div className='block-bullet-list-node-container-search'>
                <span><i className='fas fa-search'></i></span>
                <input placeholder='Поиск' value={search} onChange={e => setSearch(e.target.value)}></input>
            </div>
            {props.block?.data_nodes?.nodes?.filter(node => getNodeLabel(node).toLocaleLowerCase().includes(search.toLocaleLowerCase())).map(node => {
                return <>
                    <div className='block-bullet-list-node-container'>
                        <div className='block-bullet-list-node-container-title'>
                            <div className='block-bullet-list-node-container-title-icon'>
                                {checkEntityMedia(node) ? renderEntityMedia(node) : <i className='fas fa-circle-notch color-blue'></i>}
                            </div>
                            <p>{getNodeLabel(node)}</p>

                            <div className='block-bullet-list-node-container-controls'>
                                {node.data?.file?.resource_type === 'txt' && <>
                                    <Link target='__blank' className='color-white bg-blue' to={'/neo_graph/project/' + props.project.id + '/textEditor/' + encode(node.data.uri)}><i className='fas fa-book-open'></i></Link>
                                </>}
                                {node.data?.file?.resource_type && <>
                                    <button className='color-white bg-blue' onClick={_ => dispatch(setMediaBlock(node))} ><i className='fas fa-photo-video'></i></button>

                                </>}
                                <button className='color-white bg-blue' onClick={_ => dispatch(openEntity({ ontology_uri: node.data.ontology_uri, uri: node.data.uri }))} ><i className='fas fa-info'></i></button>
                            </div>
                        </div>
                        {props.block.data.class_attributes && props.block.data.class_attributes.length > 0 && <>
                            <div className='block-bullet-list-node-container-info'>
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

export default BlockBulletList;

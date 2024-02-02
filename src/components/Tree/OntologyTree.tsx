import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collectEntity, getOntologyTree } from '../../actions/ontology/ontology';
import { RootStore } from '../../store';
import { TArc, TNode, TNodeData } from '../../actions/graph/types';
import { CLASS, getNodeLabel } from '../../utils';
import EntityForm from '../Forms/EntityForm/EntityForm';

interface IOntologyTreeProps {
    uri: string
}

const OntologyTree: React.FunctionComponent<IOntologyTreeProps> = (props) => {

    const dispatch = useDispatch()
    const ontologyState = useSelector((state: RootStore) => state.ontology)
    React.useEffect(() => {
        dispatch(getOntologyTree(props.uri))
        dispatch(collectEntity(props.uri, props.uri))
    }, [])

    const [currentOntology, setCurrentOntology] = React.useState<TNode>(null)

    React.useEffect(() => {
        if (ontologyState.collected_entity?.data?.uri === props.uri)
            setCurrentOntology(ontologyState.collected_entity)
    }, [, ontologyState.collected_entity])


    const [treeNodes, setTreeNodes] = React.useState<TNode[]>([])

    React.useEffect(() => {
        if (ontologyState.ontology_tree?.ontology_uri === props.uri) {
            const new_tree: TNode[] = buildTree(
                ontologyState.ontology_tree.nodes.filter(n => n.data.labels.includes(CLASS)),
                ontologyState.ontology_tree.arcs.filter(a => a.data.start_node.data.labels.includes(CLASS) && a.data.end_node.data.labels.includes(CLASS)))
            setTreeNodes(new_tree)
        }
    }, [, ontologyState.ontology_tree])


    const buildTree = (nodes: TNode[], arcs: TArc[]): TNode[] => {
        return nodes.map(n => {
            const found_children: TNode[] = arcs.filter(a => a.target === n.data.uri).map(a => a.data.start_node)
            const found_parents: TNode[] = arcs.filter(a => a.source === n.data.uri).map(a => a.data.end_node)
            return { ...n, ontology_tree_children: found_children, ontology_tree_parents: found_parents }
        })
    }

    const [showList, setShowList] = React.useState<string[]>([])
    const toggleShow = (uri: string) => {
        showList.includes(uri) ? setShowList(showList.filter(s => s != uri)) : setShowList([...showList, uri])
    }

    const [selectedEntity, setSelectedEntity] = React.useState<TNode>(null)

    const renderNode = (uri: string, level: number) => {
        const node = treeNodes.find(n => n.data.uri === uri)
        const is_show = !showList.includes(node.data.uri)
        return <>
            <div className='m-ontology-tree-section-title' onClick={_ => toggleShow(node.data.uri)}>
                <p>{getNodeLabel(node)}</p>
                <div className='m-ontology-tree-section-title-controls'>
                    <button onClick={_ => setSelectedEntity(node)}><i className='fas fa-cog'></i></button>
                </div>
            </div>
            {is_show && <>
                <div className='m-ontology-tree-section' style={{ marginLeft: 10 * level + 'px' }}>
                    {node.ontology_tree_children?.map(n => {
                        return <>
                            {renderNode(n.data.uri, level + 1)}
                        </>
                    })}
                </div>
            </>}
        </>
    }
    if (!treeNodes) return <></>
    return <>
        <div className='m-ontology-tree'>
            <div className='m-ontology-tree-left'>


                {treeNodes.filter(tn => tn.ontology_tree_parents.length === 0).map(tn => {
                    return <>
                        {renderNode(tn.data.uri, 1)}
                    </>
                })}
            </div>
            <div className='m-ontology-tree-right'>
                {selectedEntity && <>
                    <EntityForm ontology_uri={selectedEntity.data.ontology_uri} uri={selectedEntity.data.uri} onClose={() => setSelectedEntity(null)} />
                </>}
            </div>
        </div>
    </>;
};

export default OntologyTree;

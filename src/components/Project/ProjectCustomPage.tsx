import * as React from 'react';
import { decode, getNodeLabel } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { TProject } from '../../actions/projects/types';
import { TNode } from '../../actions/graph/types';
import { RootStore } from '../../store';
import EntityForm from '../Forms/EntityForm/EntityForm';
import { getCustomPage } from '../../actions/projects/projects';
import Loading from '../Loading';
import { openEntity } from '../../actions/ontology/ontology';

interface IProjectCustomPageProps {
    project: TProject
}

const ProjectCustomPage: React.FunctionComponent<IProjectCustomPageProps> = (props) => {
    const node_uri = decode(window.location.href.split('customPage')[1].split('/')[1])

    const dispatch = useDispatch()
    const projectState = useSelector((state: RootStore) => state.projects)

    React.useEffect(() => {
        dispatch(getCustomPage(node_uri, props.project.res_ontologies_uris))
    }, [])

    const [pageState, setPageState] = React.useState<{ class_node: TNode, object_nodes: TNode[] }>(null)
    React.useEffect(() => {
        if (projectState.custom_page
            && projectState.custom_page.class_node
            && projectState.custom_page.class_node.data.uri === node_uri
            && projectState.custom_page.object_nodes != null)
            setPageState(projectState.custom_page)
    }, [, projectState.custom_page])

    const [expandedNode, setExpandedNode] = React.useState<TNode>(null)

    const [search1, setSearch1] = React.useState('')

    if (!pageState) return <><Loading height={500} /></>
    return <>
        <h1 className='project-custom-page-title'>{getNodeLabel(pageState.class_node)}</h1>


        <div className='project-custom-page-search-1'>
            {'А,Б,В,Г,Д,Е,Ё,Ж,З,И,Й,К,Л,М,Н,О,П,Р,С,Т,У,Ф,Х,Ц,Ч,Ш,Щ,Ъ,Ы,Ь,Э,Ю,Я'.split(',').map(i => {
                return <button onClick={_ => i === search1 ? setSearch1('') : setSearch1(i)} className={search1 === i && 'color-blue'}>{i}</button>
            })}
        </div>

        <div className='project-custom-page-list-1'>
            {pageState.object_nodes.filter(n => getNodeLabel(n)[0].toLocaleLowerCase().includes(search1.toLocaleLowerCase())).map(n => {
                return <p>
                    <span>{getNodeLabel(n)}</span>
                    <button onClick={_ => setExpandedNode(n)}><i className='fas fa-cog'></i></button>
                    <button onClick={_ => dispatch(openEntity({ ontology_uri: n.data.ontology_uri, uri: n.data.uri }))}><i className='fas fa-list'></i></button>
                </p>
            })}
        </div>


        {expandedNode && <EntityForm ontology_uri={props.project.res_ontologies_uris} uri={expandedNode.data.uri} onClose={() => setExpandedNode(null)} />}
    </>;
};

export default ProjectCustomPage;

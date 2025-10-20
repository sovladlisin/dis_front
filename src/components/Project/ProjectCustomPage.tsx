import * as React from 'react';
import { decode, getNodeLabel } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { TPage, TPageBlock, TProject } from '../../actions/projects/types';
import { TNode } from '../../actions/graph/types';
import { RootStore } from '../../store';
import EntityForm from '../Forms/EntityForm/EntityForm';
import { deletePageBlock, getCustomPage, getPage, updatePage } from '../../actions/projects/projects';
import Loading from '../Loading';
import { openEntity } from '../../actions/ontology/ontology';
import PageBlockForm from '../Forms/PageBlockForm';
import GridLayout = require('react-grid-layout');
import '/node_modules/react-grid-layout/css/styles.css'
import '/node_modules/react-resizable/css/styles.css'
import BlockContainer from './Blocks/BlockContainer';



interface IProjectCustomPageProps {
    project: TProject
}

const ProjectCustomPage: React.FunctionComponent<IProjectCustomPageProps> = (props) => {
    const id = window.location.href.split('customPage')[1].split('/')[1]

    const dispatch = useDispatch()
    const projectState = useSelector((state: RootStore) => state.projects)


    const [devMode, setDevMode] = React.useState(false)


    const [page, setPage] = React.useState<TPage>(null)
    React.useEffect(() => {
        dispatch(getPage(parseInt(id)))
    }, [, id])
    React.useEffect(() => {
        if (projectState.current_page?.id === parseInt(id)) setPage(projectState.current_page)
    }, [, projectState.current_page])


    // BLOCK EFFECTS ------------------------------------------------------------------------------------------
    React.useEffect(() => {
        if (page && page.id === projectState.new_block.page_id)
            setPage({ ...page, blocks: [...page.blocks, projectState.new_block] })
    }, [, projectState.new_block])

    React.useEffect(() => {
        if (page && page.id === projectState.updated_block.page_id)
            setPage({ ...page, blocks: page.blocks.map(b => b.id === projectState.updated_block.id ? projectState.updated_block : b) })
    }, [, projectState.updated_block])

    React.useEffect(() => {
        if (page)
            setPage({ ...page, blocks: page.blocks.filter(b => b.id != projectState.deleted_block) })
    }, [, projectState.deleted_block])
    // BLOCK EFFECTS END ------------------------------------------------------------------------------------------


    // React.useEffect(() => {
    //     setCurrentLayout(page?.blocks.map(b => { return collectPageBlockGrid(b) }))
    // }, [, [, page]])

    React.useEffect(() => { console.log('aaaaaaa', page) }, [page])

    const [currentLayout, setCurrentLayout] = React.useState([])
    const onLayoutChange = (l) => {
        console.log(l)
        var items = []
        var new_blocks = page.blocks
        var change = false
        l.map(item => {
            const id = parseInt(item.i.split('-')[1])
            var new_item = { ...page.blocks.find(b => b.id === id) }
            if (new_item && (new_item.h != item.h || new_item.w != item.w || new_item.x != item.x || new_item.y != item.y)) {
                change = true
            }
            const h = item.h
            const y = item.y
            const x = item.x
            const w = item.w
            new_blocks = new_blocks.map(b => b.id === id ? { ...b, x: x, y: y, w: w, h: h } : b)

        })
        setPage({
            ...page, blocks: new_blocks
        })
        change && dispatch(updatePage({ ...page, blocks: new_blocks }))
    }
    const collectPageBlockGrid = (i: TPageBlock) => {
        var isResizable = true
        const id = 'b-' + i.id
        const h = i.h
        const w = i.w
        const x = i.x
        const y = i.y

        const minH = 2
        const maxH = 12
        const minW = 4
        const maxW = 18

        return { i: id, h, w, x, y, isResizable: devMode, isDraggable: devMode }
    }

    const grid_width = 1435
    const grid_columns = 48


    const [addBlockForm, setAddBlockForm] = React.useState(false)
    const [editBlockForm, setEditblockForm] = React.useState<TPageBlock>(null)

    const [hoverBlock, setHoverBlock] = React.useState(-1)

    if (!page) return <><Loading height={600} /></>
    if (!page.blocks) return <></>
    if (projectState.is_page_loading) return <>
        <Loading height={600} />
    </>



    return <>
        <button className='cp-page-add-block-button color-white bg-blue' onClick={_ => setAddBlockForm(true)}><i className='fas fa-plus'></i><p>Блок</p></button>

        <button onClick={_ => setDevMode(!devMode)} id='flip-page-dev-mode-button'>
            <span className={devMode ? ' color-white bg-blue' : ''}><i className={devMode ? 'fas fa-cog' : 'fas fa-cog color-blue'}></i></span>
            <span className={!devMode ? ' color-white bg-blue' : ''}><i className={!devMode ? 'fas fa-eye' : 'fas fa-eye color-blue'}></i></span>
        </button>


        <GridLayout style={devMode ? { paddingBottom: '200px' } : {}} className="layout" cols={grid_columns} rowHeight={20} width={grid_width}
            onLayoutChange={l => { onLayoutChange(l); }}
            // layout={currentLayout}
            autoSize={true}
            isBounded={false}
            verticalCompact={false}
            preventCollision={true}
            margin={[10, 10]}>
            {page.blocks?.map(block => {
                const grid = collectPageBlockGrid(block)
                const isHover = hoverBlock === block.id

                var style = {}
                style = isHover ? { ...style, borderColor: '#5f9dff', borderStyle: 'double', boxShadow: '0 0 3px #5f9dff' } : style
                style = !devMode ? { border: 'none' } : style

                return <div
                    onMouseEnter={_ => setHoverBlock(block.id)}
                    onMouseLeave={_ => setHoverBlock(-1)}
                    style={style} className='cp-block-container' key={grid.i} data-grid={grid}>
                    {devMode && hoverBlock === block.id && <>
                        <div className='cp-block-container-controls'>
                            <button onClick={_ => setEditblockForm(block)}><i className='fas fa-cog color-blue'></i></button>
                            <button onClick={_ => dispatch(deletePageBlock(block.id))}><i className='fas fa-trash color-red'></i></button>
                        </div>
                    </>}

                    <BlockContainer project={props.project} devMode={devMode} block={block} />
                </div>
            })}
        </GridLayout>


        {addBlockForm && <PageBlockForm project={props.project} onClose={() => setAddBlockForm(false)} page={page} />}
        {editBlockForm && <PageBlockForm page_block={editBlockForm} project={props.project} onClose={() => setEditblockForm(null)} page={page} />}
    </>;
};

export default ProjectCustomPage;

import * as React from 'react';
import { TProject } from '../../actions/projects/types';
import { useDispatch } from 'react-redux';
import { setMediaBlock } from '../../actions/projects/projects';
import EntityInfo from '../Forms/EntityForm/EntityInfo';
import { TNode } from '../../actions/graph/types';
import ReactPlayer from 'react-player'
import { SERVER_URL_FILES } from '../../utils';
import { Document, Page } from 'react-pdf';
import Loading from '../Loading';
interface IProjectMediaBlockProps {
    node: TNode,
}

const ProjectMediaBlock: React.FunctionComponent<IProjectMediaBlockProps> = (props) => {
    const dispatch = useDispatch()

    const [numPages, setNumPages] = React.useState<number>();
    const [pageNumber, setPageNumber] = React.useState<number>(1);

    const [file, setFile] = React.useState<string>('')
    const [localLoading, setLocalLoading] = React.useState(true)
    React.useEffect(() => {
        props.node.data.file.resource_type === 'pdf' && fetch(SERVER_URL_FILES + props.node.data.file.url).then((r) => r.blob()).then(text => {
            const newBlob = new Blob([text], { type: 'application/pdf' });
            var fileURL = window.URL.createObjectURL(newBlob);
            setFile(fileURL)
            setLocalLoading(false)
        })
    }, [, props.node])

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    const [text, setText] = React.useState('')
    React.useEffect(() => {
        fetch(SERVER_URL_FILES + props.node.data?.file?.url).then((r) => r.text()).then(text_r => {
            setText(text_r)
        })
    }, [, props.node])

    const renderResource = () => {
        if (props.node.data.file.resource_type === 'mp4')
            return <ReactPlayer controls={true} width='660px' height='250px' url={SERVER_URL_FILES + props.node.data.file.url} />
        if (props.node.data.file.resource_type === 'pdf')
            return <>
                {localLoading && <Loading height={300} />}
                {!localLoading && <iframe src={file}></iframe>}
            </>

        if (props.node.data.file.resource_type === 'txt') {
            return <>
                <div className='project-media-block-text-container'>{text}</div>
            </>
        }



    }
    return <>
        <div className='m-background' onClick={() => dispatch(setMediaBlock(null))}>


        </div>
        <div className='project-media-block-container'>
            <div className='project-media-block-player'>{renderResource()}</div>
            <EntityInfo node={props.node} />
        </div>
    </>;
};

export default ProjectMediaBlock;

import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collectProjectEmbeddings, getProjectEmbedding, getProjectMessage } from '../../actions/projects/projects';
import { TProject, TProjectEmbedding, TProjectMessage } from '../../actions/projects/types';
import { RootStore } from '../../store';
import Loading from '../Loading';
import { getNodeLabel } from '../../utils';
import { openEntity } from '../../actions/ontology/ontology';

interface IProjectLearnProps {
    project: TProject
}

const ProjectLearn: React.FunctionComponent<IProjectLearnProps> = (props) => {
    const dispatch = useDispatch()
    const projectState = useSelector((state: RootStore) => state.projects)
    React.useEffect(() => {
        dispatch(getProjectEmbedding(props.project.id))
    }, [])

    const [emb, setEmb] = React.useState<TProjectEmbedding>(null)
    React.useEffect(() => {
        if (projectState.project_embedding && projectState.project_embedding.project_id === props.project.id) setEmb(projectState.project_embedding)
    }, [, projectState.project_embedding])


    const [input, setInput] = React.useState('')
    const [currentMessage, setCurrentMessage] = React.useState<TProjectMessage>(null)

    React.useEffect(() => {
        if (projectState.new_project_message && projectState.new_project_message.project_id === props.project.id)
            setCurrentMessage(projectState.new_project_message)
    }, [, projectState.new_project_message])

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const updateEmb = async () => {
        // await sleep(3000);
        // dispatch(getProjectEmbedding(props.project.id))
    }

    React.useEffect(() => {
        if (emb && emb.is_running)
            updateEmb()
    })

    return <>
        {emb && <>
            <div className='project-embedding-container'>
                <div className='project-embedding-container-progress'>
                    <div className='project-embedding-container-progress-number'>
                        <p>{Math.round(emb.progress * 100)}</p>
                        <i className="fas fa-percentage"></i>
                    </div>
                    {emb.is_running && <span className='project-embedding-container-progress-loading'>
                        <Loading inner_height={30} inner_width={30} height={30} />
                    </span>}
                </div>
                <div className='project-embedding-container-controls'>
                    <button style={emb.is_running ? { cursor: 'wait' } : { cursor: 'pointer' }} className={emb.is_running ? 'bg-grey color-white' : 'bg-blue color-white'} onClick={_ => {
                        if (!emb.is_running)
                            dispatch(collectProjectEmbeddings(props.project.id))
                    }}>
                        <p>Скан проекта</p>
                        <i className="fas fa-qrcode"></i>
                    </button>
                </div>
            </div>
        </>}

        <div className='project-chat-container'>
            <div className='project-chat-container-input'>
                <span><i className='fas fa-search'></i></span>
                <input placeholder='Запрос' value={input} onChange={e => setInput(e.target.value)}></input>
                <button className='bg-blue color-white' onClick={_ => dispatch(getProjectMessage(props.project.id, input))}><i className='fas fa-search'></i></button>

            </div>


            <div className='project-chat-container-output'>
                {projectState.is_project_chat_loading && !currentMessage && <Loading height={300} />}
                {!projectState.is_project_chat_loading && currentMessage && <>
                    <div className='project-chat-container-output-message-container'>
                        <p className='project-chat-container-output-message'>{currentMessage.message}</p>
                        <div className='project-chat-container-output-message-nodes'>
                            {currentMessage.nodes && currentMessage.nodes.map(node => {
                                return <>
                                    <div className='project-chat-container-output-message-nodes-node bg-blue'>
                                        <p>{getNodeLabel(node)}</p>
                                        <button className='color-white' onClick={_ => dispatch(openEntity({ ontology_uri: node.data.ontology_uri, uri: node.data.uri }))}>
                                            <i className='fas fa-info'></i>
                                        </button>
                                    </div>
                                </>
                            })}
                        </div>
                    </div>
                </>}
            </div>
        </div>
    </>;
};

export default ProjectLearn;

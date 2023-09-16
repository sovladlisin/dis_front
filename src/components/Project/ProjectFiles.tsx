import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store';
import { getFiles } from '../../actions/files/files';
import { TProject } from '../../actions/projects/types';
import FilePin from '../Forms/Files/FilePin';
import UploadFileForm from '../Forms/Files/UploadFileForm';

interface IProjectFilesProps {
    project: TProject
}

const ProjectFiles: React.FunctionComponent<IProjectFilesProps> = (props) => {
    const fileState = useSelector((state: RootStore) => state.files)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getFiles(props.project.res_ontologies_uris))
    }, [])

    const [search, setSearch] = React.useState('')

    const [uploadWindow, setUploadWindow] = React.useState(false)

    return <>
        <h1 className='project-custom-page-title'>Файлы</h1>

        <div className='project-files-search'>
            <span><i className='fas fa-search'></i></span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder='Поиск по файлам базы данных'></input>
        </div>

        <div className='project-files-list'>
            {fileState.files.map(f => {
                return <FilePin file={f} />
            })}
        </div>

        <button className='project-files-upload-file' onClick={_ => setUploadWindow(true)}>Загрузить файл</button>

        {uploadWindow && <UploadFileForm onClose={() => setUploadWindow(false)} project={props.project} />}
    </>;
};

export default ProjectFiles;

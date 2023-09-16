import * as React from 'react';
import { useDispatch } from 'react-redux';
import { uploadFile } from '../../../actions/files/files';
import { TProject } from '../../../actions/projects/types';
import { useOnClickOutside } from '../../../utils';

interface IUploadFileFormProps {
    project: TProject,
    onClose: () => void
}

const UploadFileForm: React.FunctionComponent<IUploadFileFormProps> = (props) => {
    const dispatch = useDispatch()

    const [name, setName] = React.useState('')
    const [file, setFile] = React.useState<File>()
    const upload = () => {
        dispatch(uploadFile(name, file, [], props.project.res_ontologies_uris))
    }

    const ref = React.useRef()
    useOnClickOutside(ref, () => props.onClose())

    return <>
        <div className='m-form' ref={ref}>
            <p className='m-form-title'>Загрузить файл</p>
            <div className='m-form-fields'>
                <label>Название</label>
                <input value={name} onChange={e => setName(e.target.value)}></input>
                <label>Файл</label>
                <input type='file' onChange={e => setFile(e.target.files[0])}></input>
            </div>
            <div className='m-form-controls'>
                <button className='bg-blue' onClick={upload}>Загрузить</button>
                <button className='bg-red' onClick={props.onClose}>Отмена</button>
            </div>
        </div>

    </>;
};

export default UploadFileForm;

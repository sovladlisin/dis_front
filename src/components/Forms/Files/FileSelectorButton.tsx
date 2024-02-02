import * as React from 'react';
import { TFile } from '../../../actions/files/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../../store';
import { useOnClickOutside } from '../../../utils';
import { getFiles } from '../../../actions/files/files';

interface IFileSelectorButtonProps {
    link: string,
    onSelect: (file: TFile) => void,
    ontology_uri: string
}

const FileSelectorButton: React.FunctionComponent<IFileSelectorButtonProps> = (props) => {
    const dispatch = useDispatch()
    const fileState = useSelector((state: RootStore) => state.files)

    const [search, setSearch] = React.useState('')

    React.useEffect(() => {
        dispatch(getFiles(props.ontology_uri))
    }, [])

    const [selectedFile, setSelectedFile] = React.useState<TFile>(null)

    React.useEffect(() => {
        const found = fileState.files.find(f => f.link === props.link)
        found && setSelectedFile(found)
    }, [, props.link])

    const [isSelecting, setIsSelecting] = React.useState(false)

    return <>

        <label>Файл</label>
        <div className='form-main-item-selector-button-container'>
            {isSelecting && <>
                <div className='form-main-item-selector-button-window'>
                    <div className='form-main-item-selector-button-window-search'>
                        <span><i className='fas fa-search'></i></span>
                        <input placeholder='Поиск' value={search} onChange={e => setSearch(e.target.value)}></input>
                    </div>
                    <div className='form-main-item-selector-button-window-items'>
                        <button className={!selectedFile ? 'form-main-item-selector-button-window-items-selected' : ''} onClick={_ => { props.onSelect(null); setIsSelecting(false) }}>Не указано</button>
                        {fileState.files.filter(file => file.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())).map(file => {
                            const selected = selectedFile?.id === file.id ? 'form-main-item-selector-button-window-items-selected' : ''
                            return <button className={selected} onClick={_ => { props.onSelect(file); setIsSelecting(false) }}>{file.name}</button>
                        })}
                    </div>
                </div>
            </>}
            <button onClick={_ => setIsSelecting(true)} className='form-main-item-selector-button'>
                {selectedFile ? selectedFile.name : 'Не указано'}
            </button>
        </div>
    </>;
};

export default FileSelectorButton;

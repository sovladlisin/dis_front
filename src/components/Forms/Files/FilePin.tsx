import * as React from 'react';
import { TFile } from '../../../actions/files/types';
import { SERVER_URL, SERVER_URL_FILES } from '../../../utils';

interface IFilePinProps {
    file: TFile
}

const FilePin: React.FunctionComponent<IFilePinProps> = (props) => {


    return <>
        <div className='file-pin-container'>
            <label className='file-pin-id'>{props.file.id}</label>
            <p className='file-pin-title'>{props.file.name}</p>
            <span className='file-pin-background'>
                <i className='fas fa-file'></i>
            </span>
            <div className='file-pin-container-controls'>
                <a className='file-pin-download-link' href={SERVER_URL_FILES + props.file.link}><i className='fas fa-share'></i></a>
            </div>
        </div>
    </>;
};

export default FilePin;

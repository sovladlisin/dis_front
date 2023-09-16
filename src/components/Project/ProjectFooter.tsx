import * as React from 'react';
import { TProject } from '../../actions/projects/types';

interface IProjectFooterProps {
    project: TProject
}

const ProjectFooter: React.FunctionComponent<IProjectFooterProps> = (props) => {
    return <>
        <div className='project-footer'></div>
    </>;
};

export default ProjectFooter;

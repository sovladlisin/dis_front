import * as React from 'react';
import { TProject } from '../../actions/projects/types';

interface IProjectHomeProps {
    project: TProject
}

const ProjectHome: React.FunctionComponent<IProjectHomeProps> = (props) => {
    return <><span className='project-home-span'>Домашняя страница</span></>;
};

export default ProjectHome;

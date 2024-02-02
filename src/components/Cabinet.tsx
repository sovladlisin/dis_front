import * as React from 'react';
import LeftPanel from './LeftPanel';
import OntologiesPage from './OntologiesPage';
import ResOntologiesPage from './ResOntologiesPage';
import PatternsPage from './PatternsPage';
import ProjectsPage from './ProjectsPage';

interface ICabinetProps {
}

const Cabinet: React.FunctionComponent<ICabinetProps> = (props) => {



    const [mode, setMode] = React.useState(1)
    console.log('HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
    return <>
        <LeftPanel mode={mode} onModeChange={(mode: number) => setMode(mode)} />
        <div className='m-main-container'>
            {mode === 1 && <ProjectsPage />}
            {mode === 2 && <OntologiesPage />}
            {mode === 3 && <ResOntologiesPage />}
            {mode === 4 && <PatternsPage />}
        </div>
    </>;
};

export default Cabinet;

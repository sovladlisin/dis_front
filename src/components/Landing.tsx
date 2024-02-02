import * as React from 'react';
import LoginButton from './Auth/LoginButton';
import { useSelector } from 'react-redux';
import { RootStore } from '../store';
import { HOST } from '../utils';

interface ILandingProps {
}

const Landing: React.FunctionComponent<ILandingProps> = (props) => {
    const authState = useSelector((state: RootStore) => state.auth)

    React.useEffect(() => {
        if (authState.account?.id) window.location.replace(HOST + 'cabinet')
    }, [, authState])

    return <>
        <div className='landing-main-window'>
            <p>Конструктор порталов</p>
            <LoginButton />
        </div>
    </>;
};

export default Landing;

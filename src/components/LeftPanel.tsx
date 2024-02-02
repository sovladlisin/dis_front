import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../store';
import { HOST } from '../utils';
import { logout } from '../actions/auth/auth';

interface ILeftPanelProps {
    mode: number,
    onModeChange: (mode: number) => void
}

const LeftPanel: React.FunctionComponent<ILeftPanelProps> = (props) => {
    const dispatch = useDispatch()
    const authState = useSelector((state: RootStore) => state.auth.account)
    // React.useEffect(() => {
    // if (!authState) window.location.replace(HOST)
    // }, [, authState])

    // if (!authState) return <></>


    return <>
        <div className='m-left-panel'>
            <div className='m-left-panel-auth'>
                <img src={authState?.vk_avatar}></img>
                <p>{authState?.vk_name}</p>
                <button className='color-blue' onClick={_ => dispatch(logout())}><i className='fas fa-sign-out-alt'></i></button>
            </div>

            <button onClick={_ => props.onModeChange(1)} className={props.mode === 1 ? ' bg-blue color-white' : ''}>
                <i className='fas fa-cog'></i>
                <p>Проекты</p>
            </button>

            <button onClick={_ => props.onModeChange(2)} className={props.mode === 2 ? ' bg-blue color-white' : ''}>
                <i className='fas fa-scroll'></i>
                <p>Онтологии пр. области</p>
            </button>

            <button onClick={_ => props.onModeChange(3)} className={props.mode === 3 ? ' bg-blue color-white' : ''}>
                <i className='fas fa-scroll'></i>
                <p>Онтологии ресурсов</p>
            </button>

            <button onClick={_ => props.onModeChange(4)} className={props.mode === 4 ? ' bg-blue color-white' : ''}>
                <i className='fas fa-paste'></i>
                <p>Паттерны</p>
            </button>

        </div>
    </>;
};

export default LeftPanel;

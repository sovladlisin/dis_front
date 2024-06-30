import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation
} from "react-router-dom"
import { login } from '../../actions/auth/auth';
import { RootStore } from '../../store';
import { HOST } from '../../utils';
import Loading from '../Loading';
interface ILoginProps {
}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
    console.log('HEEEEEEEEEEEEEEEEEEEEEEEEEEEE99999999')
    const location = useLocation()
    const queryParameters = new URLSearchParams(location.search)
    console.log(JSON.parse(queryParameters.get('payload'))['user'], 1)
    const user = JSON.parse(queryParameters.get('payload'))['user']
    const name = user['first_name'] + ' ' + user['last_name']
    const id = user['id']
    const avatar = user['avatar']
    const dispatch = useDispatch()
    const authState = useSelector((state: RootStore) => state.auth)

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    React.useEffect(() => {
        dispatch(login(id, name, avatar))
    }, [])


    const redirect = async () => {
        await sleep(2000)
        if (authState.account != null && authState.account.token) window.location.replace(HOST + 'neo_graph/cabinet')
    }

    React.useEffect(() => {
        redirect()
    }, [, authState.account])
    return <>

        <div className='vk_auth_loading'>
            <Loading height={100} />
            <p>Выполняется вход</p>
        </div>
    </>;
};

export default Login;

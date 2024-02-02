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
    dispatch(login(id, name, avatar))

    React.useEffect(() => {
        if (authState.account?.id) window.location.replace(HOST + 'cabinet')
    }, [, authState.account])
    return <></>;
};

export default Login;

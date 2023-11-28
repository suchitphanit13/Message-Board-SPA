import {useDispatch, useSelector} from "react-redux";
import {ON_LOGIN, SET_PWD_LOGIN, SET_USER_LOGIN} from "../../modules/message-board";
import {Button, Card} from "react-bootstrap";


export function Login({_useDispatch = useDispatch, _useSelector = useSelector}) {
    const dispatch = _useDispatch();
    const user = _useSelector(state => state.userLog)
    const pwd = _useSelector(state => state.pwdLog)
    const msg = _useSelector(state => state.loginMsg)

    function onUserChange(event) {
        dispatch({type: SET_USER_LOGIN, value: event.target.value})
    }

    function onPwdChange(event) {
        dispatch({type: SET_PWD_LOGIN, value: event.target.value})
    }

    return <Card style={{width: '18rem'}} border="dark">
        <Card.Body>
            <Card.Title> Login Below! </Card.Title>
            <Card.Text>
                <input onChange={onUserChange} value={user} type={'text'} placeholder={'Username Login'}/>
                <input onChange={onPwdChange} value={pwd} type={'password'} placeholder={'Password Login'}/>
                <br/>
                <span>{msg}</span>
            </Card.Text>
            <Button variant="primary" size={'sm'} onClick={() => dispatch({type: ON_LOGIN})}>Login!</Button>
        </Card.Body>
    </Card>
}

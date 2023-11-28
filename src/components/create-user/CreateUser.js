import {useDispatch, useSelector} from "react-redux";
import {CREATE_USER, UPDATE_NEW_PWD, UPDATE_NEW_USER} from "../../modules/message-board";
import {Button, Card} from "react-bootstrap";


export function CreateUser({_useDispatch = useDispatch, _useSelector = useSelector}) {
    const dispatch = _useDispatch();
    const user = _useSelector(state => state.newUser)
    const pwd = _useSelector(state => state.newPwd)
    const msg = _useSelector(state => state.createMsg)

    function onUserChange(event) {
        dispatch({type: UPDATE_NEW_USER, value: event.target.value})
    }
    function onPwdChange(event) {
        dispatch({type: UPDATE_NEW_PWD, value: event.target.value})
    }

    return <Card style={{width: '18rem'}} border="dark">
        <Card.Body>
            <Card.Title> Create a new account below! </Card.Title>
            <Card.Text>
                <input onChange={onUserChange} value={user} type={'text'} placeholder={"Create Username"}/>
                <input onChange={onPwdChange} value={pwd} type={'password'} placeholder={"Create Password"}/>
                <br/>
                <span>{msg}</span>
            </Card.Text>
            <Button variant="primary" size={'sm'} onClick={() => dispatch({type: CREATE_USER})}> Create a new
                account!</Button>
        </Card.Body>
    </Card>
}
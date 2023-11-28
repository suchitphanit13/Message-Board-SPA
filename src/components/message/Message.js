import {useDispatch, useSelector} from "react-redux";
import {SEND_MSG, UPDATE_MSG, UPDATE_USER_MSG} from "../../modules/message-board";
import {Button, Card} from "react-bootstrap";


export function Message({_useDispatch = useDispatch, _useSelector = useSelector}) {
    const dispatch = _useDispatch();
    const msg = _useSelector(state => state.msg)
    const user = _useSelector(state => state.userToMsg)
    const inboxMsg = _useSelector(state => state.inboxMsg)


    function onMsgChange(event) {
        dispatch({type: UPDATE_MSG, value: event.target.value})
    }

    function onUserChange(event) {
        dispatch({type: UPDATE_USER_MSG, value: event.target.value})
    }

    return <Card style={{width: '18rem'}} border="dark">
        <Card.Title>Message a user below!</Card.Title>
        <input onChange={onUserChange} value={user} placeholder={'Enter the user you want to message!'} type={'text'}/>
        <br/>
        <textarea onChange={onMsgChange} value={msg} placeholder={'Enter your message here'}/>
        <br/>
        {inboxMsg}
        <br/>
        <Button size={"sm"} onClick={() => dispatch({type: SEND_MSG})}>Send!</Button>
    </Card>
}

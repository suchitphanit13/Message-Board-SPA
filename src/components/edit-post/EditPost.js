import {useDispatch, useSelector} from "react-redux";
import {SET_POST, UPDATE_POST} from "../../modules/message-board";
import {Button, Card} from "react-bootstrap";


export function EditPost({_useDispatch = useDispatch, _useSelector = useSelector}) {
    const dispatch = _useDispatch();
    const msg = _useSelector(state => state.post)

    function onMsgChange(event) {
        dispatch({type: SET_POST, value: event.target.value})
    }
    return <Card style={{width: '18rem'}} border="dark" className={'m-5'}>
        <Card.Title>Edit your Post below!</Card.Title>
        <input onChange={onMsgChange} value={msg} type={'text'} placeholder={'Edit your message'}/>
        <Button size={'sm'} variant={"secondary"} onClick={() => dispatch({type: UPDATE_POST})}>Edit</Button>
    </Card>
}

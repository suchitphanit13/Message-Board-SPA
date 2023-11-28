import {SET_TITLE, UPDATE_THREAD} from "../../modules/message-board";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card} from "react-bootstrap";


export function EditThread({_useDispatch = useDispatch, _useSelector = useSelector}) {
    const dispatch = _useDispatch();

    const title = _useSelector(state => state.title)

    function onTitleChange(event) {
        dispatch({type: SET_TITLE, value: event.target.value})
    }

    return <Card style={{width: '18rem'}} border="dark">
        <Card.Title>Edit your Thread Below!</Card.Title>
        <input onChange={onTitleChange} value={title} type={'text'} placeholder={"Title"}/>
        <Button onClick={() => dispatch({type: UPDATE_THREAD})}>Edit</Button>
    </Card>
}
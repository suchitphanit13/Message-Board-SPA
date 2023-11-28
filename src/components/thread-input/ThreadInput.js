import {useDispatch, useSelector} from "react-redux";
import {CREATE_THREAD, SET_TITLE} from "../../modules/message-board";
import {Button, Card} from "react-bootstrap";


export function ThreadInput({_useDispatch = useDispatch, _useSelector = useSelector}) {
    const dispatch = _useDispatch();
    const title = _useSelector(state => state.title)

    function onTitleChange(event) {
        dispatch({type: SET_TITLE, value: event.target.value})
    }

    return <Card style={{width: '18rem'}} border="dark">
        <Card.Body>
            <Card.Title>Create a Thread Below!</Card.Title>
            <Card.Text>
                <input onChange={onTitleChange} value={title} type={'text'} placeholder={"Title"}/>
            </Card.Text>
            <Button size={'sm'} onClick={() => dispatch({type: CREATE_THREAD})}>Create!</Button>
        </Card.Body>
    </Card>
}

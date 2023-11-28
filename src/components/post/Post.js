import {useDispatch, useSelector} from "react-redux";
import {ON_POST, SET_POST} from "../../modules/message-board";
import {Button, Card} from "react-bootstrap";


export function Post({_useDispatch = useDispatch, _useSelector = useSelector}) {

    const dispatch = _useDispatch();
    const msg = _useSelector(state => state.post)


    function onMsgChange(event) {
        dispatch({type: SET_POST, value: event.target.value})
    }

    return <Card style={{width: '18rem'}} border="dark">
        <input onChange={onMsgChange} value={msg} placeholder={'Message'} type={'text'}/>
        <Button size={'sm'} onClick={() => dispatch({type: ON_POST})}>Post</Button>
    </Card>
}
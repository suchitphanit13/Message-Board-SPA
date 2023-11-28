import {useDispatch} from "react-redux";
import {ON_LOGOUT} from "../../modules/message-board";
import {Button} from "react-bootstrap";


export function Logout({_useDispatch = useDispatch}) {
    const dispatch = _useDispatch();
    return <>
        <Button size={"sm"} variant={'danger'} onClick={() => dispatch({type: ON_LOGOUT})}>Logout</Button>
    </>
}
import {useSelector} from "react-redux";
import {Card} from "react-bootstrap";


export function Inbox({_useSelector = useSelector}) {
    const userList = _useSelector(state => state.userList)
    const currUser = _useSelector(state => state.currUser)
    const msgList = userList?.find(user => user.user === currUser)?.msgList
    return <Card style={{width: '18rem'}} border="dark">
        <Card.Header>See your messages below!</Card.Header>
        <Card.Text>
            {
                msgList?.map((msg, idx) => {
                    return <span className="d-flex flex-column " key={idx}>
                    <span className="d-flex justify-content-between">{msg.sentBy} sent: {msg.msg}</span>
                </span>
                })
            }
        </Card.Text>
    </Card>
}
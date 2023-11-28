import {useSelector} from "react-redux";
import {Card} from "react-bootstrap";


export function UserList({_useSelector = useSelector}) {
    const userList = _useSelector(state => state.userList)
    return <Card style={{width: '18rem'}} border="dark">
        <Card.Title>List of registered users</Card.Title>
        {
            userList?.map((user, idx) => {
                return <div key={idx}>
                    {user.user}
                </div>
            })
        }
    </Card>
}

import {useSelector} from "react-redux";
import {Thread} from "../thread/Thread";
import {Card} from "react-bootstrap";


export function ThreadList({_useSelector = useSelector, _Thread = Thread}) {
    const list = _useSelector(state => state.threadList)

    function sortThreadList(a, b) {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
    }

    const sortList = list?.sort(sortThreadList)
    return <Card style={{width: '18rem'}} border="dark">
        {
            sortList?.map((thread, idx) => {
                return <div key={idx}>
                    <_Thread thread={thread}/>
                </div>
            })
        }
    </Card>
}


// return <Card style={{width: '18rem'}} border="dark" >
//     <Card.Body>
//         <Card.Title> Create a new account below! </Card.Title>
//         <Card.Text>
//             <input onChange={onUserChange} value={user} type={'text'} placeholder={"Create Username"}/>
//             <input onChange={onPwdChange} value={pwd} type={'password'} placeholder={"Create Password"}/>
//             <br/>
//             <span>{msg}</span>
//         </Card.Text>
//         <Button variant="primary" size={'sm'} onClick={() => dispatch({type: CREATE_USER})}> Create a new account!</Button>
//     </Card.Body>
// </Card>
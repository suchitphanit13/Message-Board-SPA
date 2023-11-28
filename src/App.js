import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CreateUser} from "./components/create-user/CreateUser";
import {Login} from "./components/login/Login";
import {useSelector} from "react-redux";
import {Logout} from "./components/logout/Logout";
import {ThreadInput} from "./components/thread-input/ThreadInput";
import {ThreadList} from "./components/thread-list/ThreadList";
import {Post} from "./components/post/Post";
import {EditThread} from "./components/edit-thread/EditThread";
import {UserList} from "./components/user-list/UserList";
import {Message} from "./components/message/Message";
import {Inbox} from "./components/inbox/Inbox";
import {EditPost} from "./components/edit-post/EditPost";
import {Col, Container, Row} from "react-bootstrap";


function App(props) {
    const {
        _useSelector = useSelector,
        _CreateUser = CreateUser,
        _Login = Login,
        _Logout = Logout,
        _ThreadInput = ThreadInput,
        _ThreadList = ThreadList,
        _Post = Post,
        _EditThread = EditThread,
        _UserList = UserList,
        _Message = Message,
        _Inbox = Inbox,
        _EditPost = EditPost
    } = props;

    const loggedIn = _useSelector(state => state.currUser)
    const replyState = _useSelector(state => state.replyState)
    const editThread = _useSelector(state => state.editThreadId)
    const editPost = _useSelector(state => state.editPostId)

    if (replyState) {
        return <div className="d-flex justify-content-center m-5">
            <_Post/>
        </div>
    }

    if (editPost && editThread) {
        return <div className="d-flex justify-content-center m-5">
            <_EditPost/>
        </div>
    }

    if (editThread) {
        return <div className="d-flex justify-content-center m-5">
            <_EditThread/>
        </div>
    }

    if (loggedIn) {
        return <Container className="d-flex justify-content-center m-5">
            <Row>
                <Col xs={6} md={6}>
                    <_ThreadInput/>
                    <_ThreadList/>
                </Col>
                <Col xs={6} md={6}>
                    <_UserList/>
                    <_Message/>
                    <br/>
                    <_Inbox/>
                    <_Logout/>
                </Col>
            </Row>
        </Container>
    }

    return (
        <div className="col-xs-1 m-5" align="center">
            <_CreateUser/>
            <br/>
            <_Login/>
        </div>

    );
}

export default App;

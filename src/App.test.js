import {render, screen} from '@testing-library/react';
import App from './App';


test(
    'should show CreateUser comp, and Login comp when loggedIn, replyState, editThread, and editPost is null',
    () => {
        const _CreateUser = () => <div>MOCK</div>
        const _Login = () => <div>MOCK2</div>
        const _useSelector = ((fn) => fn({
            currUser: null,
            replyState: null,
            editThreadId: null,
            editPostId: null,

        }))
        render(<App _CreateUser={_CreateUser} _Login={_Login} _useSelector={_useSelector}/>)
        expect(screen.getByText('MOCK')).toBeInTheDocument()
        expect(screen.getByText('MOCK2')).toBeInTheDocument()
    }
)

test(
    'should show Post comp when replyState is not null',
    () => {
        const _Post = () => <div>MOCK</div>
        const _useSelector = ((fn) => fn({
            replyState: true,
        }))
        render(<App _Post={_Post}  _useSelector={_useSelector}/>)
        expect(screen.getByText('MOCK')).toBeInTheDocument()
    }
)

test(
    'should show EditPost comp when editPost and editThread are not null and replyState is null',
    () => {
        const _EditPost = () => <div>MOCK</div>
        const _useSelector = ((fn) => fn({
            replyState: null,
            editThreadId: true,
            editPostId: true,
        }))
        render(<App _EditPost={_EditPost} _useSelector={_useSelector}/>)
        expect(screen.getByText('MOCK')).toBeInTheDocument()
    }
)

test(
    'should show EditThread comp when editThread is not null and replyState and editPost are null',
    () => {
        const _EditThread = () => <div>MOCK</div>
        const _useSelector = ((fn) => fn({
            replyState: null,
            editThreadId: true,
            editPostId: null,
        }))
        render(<App _EditThread={_EditThread} _useSelector={_useSelector}/>)
        expect(screen.getByText('MOCK')).toBeInTheDocument()
    }
)

test(
    'should show ThreadInput comp, ThreadList comp, UserList comp, Message comp,' +
    'Inbox comp, and Logout comp when loggedIn is not null and  replyState, ' +
    'editThread, and editPost is null',
    () => {
        const _ThreadInput = () => <div>MOCK</div>
        const _ThreadList = () => <div>MOCK2</div>
        const _UserList = () => <div>MOCK3</div>
        const _Message = () => <div>MOCK4</div>
        const _Inbox = () => <div>MOCK5</div>
        const _Logout = () => <div>MOCK6</div>
        const _useSelector = ((fn) => fn({
            currUser: 'user',
            replyState: null,
            editThreadId: null,
            editPostId: null,

        }))
        render(<App _ThreadInput={_ThreadInput} _ThreadList={_ThreadList} _UserList={_UserList}
                    _Message={_Message} _Inbox={_Inbox} _Logout={_Logout} _useSelector={_useSelector}/>)
        expect(screen.getByText('MOCK')).toBeInTheDocument()
        expect(screen.getByText('MOCK2')).toBeInTheDocument()
        expect(screen.getByText('MOCK3')).toBeInTheDocument()
        expect(screen.getByText('MOCK4')).toBeInTheDocument()
        expect(screen.getByText('MOCK5')).toBeInTheDocument()
        expect(screen.getByText('MOCK6')).toBeInTheDocument()

    }
)


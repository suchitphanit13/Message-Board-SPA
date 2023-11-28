import {screen, render} from "@testing-library/react";
import {Inbox} from "./Inbox";


test(
    'should display text "See your messages below!"',
    () => {
        render(<Inbox _useSelector={() => {
        }}/>)
        expect(screen.getByText('See your messages below!')).toBeInTheDocument()
    }
)

test(
    'should render a message for each item in the user message list state',
    () => {
        const _useSelector = ((fn) => fn({
            userList: [{user: 'user', msgList: [{sentBy: 'user', msg: 'msg'}]}],
            currUser: 'user'
        }))
        render(<Inbox _useSelector={_useSelector}/>)
        const msg = screen.getByText('user sent: msg')
        expect(msg).toBeInTheDocument()

    }
)
import {screen, render} from "@testing-library/react";
import {UserList} from "./UserList";

test(
    'should show text "List of registered users"',
    () => {
        render(<UserList _useSelector={() => {
        }}/>)
        expect(screen.getByText('List of registered users')).toBeInTheDocument()
    }
)

test(
    'should render a user for each item in the userList state',
    () => {
        const _useSelector = ((fn) => fn({userList: [{user:'user1'}, {user: 'user2'}]}))
        render(<UserList _useSelector={_useSelector}/>)
        expect(screen.getByText('user1')).toBeInTheDocument()
        expect(screen.getByText('user2')).toBeInTheDocument()
    }
)


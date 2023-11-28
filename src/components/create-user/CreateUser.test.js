import {screen, render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {CreateUser} from "./CreateUser";
import {CREATE_USER, UPDATE_NEW_PWD, UPDATE_NEW_USER} from "../../modules/message-board";

test(
    'should show the text "Create a new account below!"',
    () => {
        render(<CreateUser _useDispatch={() => {
        }} _useSelector={() => {
        }}/>)
        expect(screen.getByText("Create a new account below!")).toBeInTheDocument()
    }
)

test(
    'Should show an input field type text with placeholder "Create Username" that dispatches' +
    'UPDATE_NEW_USER on change with the correct value',
    () => {
        const dispatch = jest.fn()
        render(<CreateUser _useDispatch={() => dispatch} _useSelector={() => {
        }}/>)
        const input = screen.getByPlaceholderText('Create Username')
        expect(input.tagName).toBe('INPUT')
        expect(input).toHaveAttribute('type', 'text')
        userEvent.type(input, 'user');
        expect(dispatch).toHaveBeenCalledWith({
            type: UPDATE_NEW_USER,
            value: 'user'
        })
    }
)

test(
    'Should show an input field type password with placeholder "Create Password" that dispatches' +
    'UPDATE_NEW_PWD on ',
    () => {
        const dispatch = jest.fn()
        render(<CreateUser _useDispatch={() => dispatch} _useSelector={() => {
        }}/>)
        const input = screen.getByPlaceholderText('Create Password')
        expect(input.tagName).toBe('INPUT')
        expect(input).toHaveAttribute('type', 'password')
        userEvent.type(input, 'pass');
        expect(dispatch).toHaveBeenCalledWith({
            type: UPDATE_NEW_PWD,
            value: 'pass'
        })
    }
)

test(
    'should show a button with text"Create a new account!"',
    () => {

        render(<CreateUser _useDispatch={() => {
        }} _useSelector={() => {
        }}/>)
        const button = screen.getByText('Create a new account!')
        expect(button.tagName).toBe('BUTTON')
    }
)

test(
    'button with text "Create a new account!" should dispatch CREATE_USER when clicked',
    () => {
        const dispatch = jest.fn()
        render(<CreateUser _useDispatch={() => dispatch} _useSelector={() => {
        }}/>)
        const button = screen.getByText('Create a new account!')
        userEvent.click(button)
        expect(dispatch).toHaveBeenCalledWith({type: CREATE_USER})
    }
)

test(
    'should show createMsg when createMsg is not ""',
    () => {
        const _useSelector = ((fn) => fn({
            createMsg: 'something'
        }))
        render(<CreateUser _useDispatch={() => {} } _useSelector={_useSelector}/>)
        expect(screen.getByText('something')).toBeInTheDocument()
    }
)


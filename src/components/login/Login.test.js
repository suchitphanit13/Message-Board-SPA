import {render, screen} from "@testing-library/react";
import {Login} from "./Login";
import userEvent from "@testing-library/user-event";
import {ON_LOGIN, SET_PWD_LOGIN, SET_USER_LOGIN} from "../../modules/message-board";


test(
    'should display a header with text "Login Below!"',
    () => {
        render(<Login _useDispatch={() => {
        }} _useSelector={() => {
        }}/>)
        expect(screen.getByText("Login Below!")).toBeInTheDocument()
    }
)

test(
    'should show an input with placeholder "Username Login" and type text' +
    'that dispatches SET_USER_LOGIN on change with the correct value',
    () => {
        const dispatch = jest.fn()
        render(<Login _useDispatch={() => dispatch} _useSelector={() => {
        }}/>)

        const input = screen.getByPlaceholderText("Username Login")
        expect(input).toHaveAttribute('type', 'text')
        userEvent.type(input, 'user')
        expect(dispatch).toHaveBeenCalledWith({
            type: SET_USER_LOGIN,
            value: 'user'
        })
    }
)

test(
    'should show an input with placeholder "Password Login" and type password' +
    'that dispatches SET_PWD_LOGIN on change with the correct value',
    () => {
        const dispatch = jest.fn()
        render(<Login _useDispatch={() => dispatch} _useSelector={() => {
        }}/>)
        const input = screen.getByPlaceholderText("Password Login")
        expect(input).toHaveAttribute('type', 'password')
        userEvent.type(input, 'pass')
        expect(dispatch).toHaveBeenCalledWith({
            type: SET_PWD_LOGIN,
            value: 'pass'
        })
    }
)

test(
    'should show a button with text "Login!" that dispatches ON_LOGIN when clicked',
    () => {
        const dispatch = jest.fn()
        render(<Login _useDispatch={() => dispatch} _useSelector={() => {
        }}/>)
        const button = screen.getByText("Login!")
        expect(button.tagName).toBe("BUTTON")
        userEvent.click(button)
        expect(dispatch).toHaveBeenCalledWith({
            type: ON_LOGIN
        })
    }
)

test(
    'should show loginMsg when loginMsg is set',
    () => {
        const _useSelector = ((fn) => fn({
            loginMsg: 'something'
        }))
        render(<Login _useDispatch={() => {} } _useSelector={_useSelector}/>)
        expect(screen.getByText('something')).toBeInTheDocument()
    }
)
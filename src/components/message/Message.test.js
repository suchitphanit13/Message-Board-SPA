import {screen, render} from "@testing-library/react";
import {Message} from "./Message";
import userEvent from "@testing-library/user-event";
import {SEND_MSG, UPDATE_MSG, UPDATE_USER_MSG} from "../../modules/message-board";


test(
    'should show an input of type text with placeholder "Enter the user you want to message!" that dispatches' +
    'UPDATE_USER_MSG on change with the correct value',
    () => {
        const dispatch = jest.fn()
        render(<Message _useDispatch={() => dispatch} _useSelector={() => {
        }}/>)
        const input = screen.getByPlaceholderText("Enter the user you want to message!")
        expect(input.tagName).toBe("INPUT")
        expect(input).toHaveAttribute('type', 'text')
        userEvent.type(input, 'user')
        expect(dispatch).toBeCalledWith({
            type: UPDATE_USER_MSG,
            value: 'user'
        })
    }
)

test(
    'should show an textarea with placeholder "Enter your message here" that dispatches' +
    'UPDATE_MSG on change with the correct value',
    () => {
        const dispatch = jest.fn()
        render(<Message _useDispatch={() => dispatch} _useSelector={() => {
        }}/>)
        const input = screen.getByPlaceholderText("Enter your message here")
        expect(input.tagName).toBe("TEXTAREA")
        userEvent.type(input, 'hello')
        expect(dispatch).toBeCalledWith({
            type: UPDATE_MSG,
            value: 'hello'
        })
    }
)

test(
    'should show a button with text "Send!" that dispatches SEND_MSG on click',
    ()=>{
        const dispatch = jest.fn()
        render(<Message _useDispatch={() => dispatch} _useSelector={() => {}}/>)
        const button = screen.getByText('Send!')
        expect(button.tagName).toBe("BUTTON")
        userEvent.click(button)
        expect(dispatch).toBeCalledWith({
            type: SEND_MSG
        })
    }
)


import {screen, render} from "@testing-library/react";
import {EditPost} from "./EditPost";
import userEvent from "@testing-library/user-event";
import {SET_POST, UPDATE_POST} from "../../modules/message-board";


test(
    'Should show the text with "Edit your Post below!"',
    () => {
        render(<EditPost _useDispatch={() => {
        }} _useSelector={() => {
        }}/>)
        expect(screen.getByText('Edit your Post below!')).toBeInTheDocument()
    }
)

test(
    'Should show an input field of type text with placeholder"Edit your message" that dispatches' +
    'SET_POST on change with the correct value',
    () => {
        const dispatch = jest.fn()

        render(<EditPost _useDispatch={() => dispatch} _useSelector={() => {
        }}/>)
        const input = screen.getByPlaceholderText('Edit your message')
        expect(input.tagName).toBe('INPUT')
        expect(input).toHaveAttribute('type', 'text')
        userEvent.type(input, 'msg')
        expect(dispatch).toHaveBeenCalledWith({
            type: SET_POST,
            value: 'msg'
        })
    }
)

test(
    'should show a button with text "Edit" that dispatches UPDATE_POST on click',
    () => {
        const dispatch = jest.fn()
        render(<EditPost _useDispatch={() => dispatch} _useSelector={() => {
        }}/>)
        const button = screen.getByText('Edit')
        expect(button.tagName).toBe('BUTTON')
        userEvent.click(button)
        expect(dispatch).toHaveBeenCalledWith({
            type: UPDATE_POST
        })
    }
)


import {screen, render} from "@testing-library/react";
import {EditThread} from "./EditThread";
import userEvent from "@testing-library/user-event";
import {SET_TITLE, UPDATE_THREAD} from "../../modules/message-board";


test(
    'should show text "Edit your Thread Below!"',
    () => {
        render(<EditThread _useDispatch={() => {
        }} _useSelector={() => {
        }}/>)
        expect(screen.getByText("Edit your Thread Below!")).toBeInTheDocument()
    }
)

test(
    'should show input of type text with placeholder "Title" that dispatches' +
    'SET_TITLE on change with the correct value',
    () => {
        const dispatch = jest.fn()
        render(<EditThread _useDispatch={() => dispatch} _useSelector={() => {
        }}/>)
        const input = screen.getByPlaceholderText('Title')
        expect(input.tagName).toBe('INPUT')
        expect(input).toHaveAttribute('type', 'text')
        userEvent.type(input, 'title')
        expect(dispatch).toHaveBeenCalledWith({
            type: SET_TITLE,
            value: 'title'
        })
    }
)

test(
    'should show a button with text "Edit" that dispatches UPDATE_THREAD when clicked',
    () => {
        const dispatch = jest.fn()
        render(<EditThread _useDispatch={() => dispatch} _useSelector={() => {
        }}/>)
        const button = screen.getByText('Edit')
        expect(button.tagName).toBe('BUTTON')
        userEvent.click(button)
        expect(dispatch).toHaveBeenCalledWith({
            type: UPDATE_THREAD
        })
    }
)


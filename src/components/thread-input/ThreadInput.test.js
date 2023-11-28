import {screen, render} from "@testing-library/react";
import {ThreadInput} from "./ThreadInput";
import userEvent from "@testing-library/user-event";
import {CREATE_THREAD, SET_TITLE} from "../../modules/message-board";


test(
    'should show text "Create a Thread Below!"',
    () => {
        render(<ThreadInput _useDispatch={() => {
        }} _useSelector={() => {
        }}/>)
        expect(screen.getByText('Create a Thread Below!')).toBeInTheDocument()
    }
)

test(
    'should show input of type text with placeholder "Title" that dispatches SET_TITLE on change with the correct value',
    () => {
        const dispatch = jest.fn()
        render(<ThreadInput _useDispatch={() => dispatch} _useSelector={() => {
        }}/>)
        const input = screen.getByPlaceholderText('Title')
        expect(input.tagName).toBe('INPUT')
        expect(input).toHaveAttribute('type', 'text')
        userEvent.type(input, 'title');
        expect(dispatch).toHaveBeenCalledWith({
            type: SET_TITLE,
            value: 'title'
        })
    }
)

test(
    'should show button with text "Create! that dispatches CREATE_THREAD on click"',
    ()=>{
        const dispatch = jest.fn()
        render(<ThreadInput _useDispatch={() => dispatch} _useSelector={() => {
        }}/>)
        const button = screen.getByText('Create!')
        expect(button.tagName).toBe('BUTTON')
        userEvent.click(button)
        expect(dispatch).toHaveBeenCalledWith({
            type: CREATE_THREAD
        })
    }
)

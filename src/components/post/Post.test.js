import {screen, render} from "@testing-library/react";
import {Post} from "./Post";
import userEvent from "@testing-library/user-event";
import {ON_POST, SET_POST} from "../../modules/message-board";

test(
    'should show an input of type text with placeholder "Message" that dispatches ' +
    'SET_POST on change with the correct value',
    ()=>{
        const dispatch = jest.fn()
        render(<Post _useDispatch={()=>dispatch} _useSelector={()=>{}}/>)
        const input = screen.getByPlaceholderText('Message')
        expect(input.tagName).toBe('INPUT')
        expect(input).toHaveAttribute('type', 'text')
        userEvent.type(input, 'msg')
        expect(dispatch).toBeCalledWith({
            type: SET_POST,
            value: 'msg'
        })
    }
)

test(
    'should show a button with text "Post" that dispatches ON_POST on click',
    ()=>{
        const dispatch = jest.fn()
        render(<Post _useDispatch={()=>dispatch} _useSelector={()=>{}}/>)
        const button = screen.getByText('Post')
        expect(button.tagName).toBe('BUTTON')
        userEvent.click(button)
        expect(dispatch).toBeCalledWith({
            type: ON_POST
        })
    }
)


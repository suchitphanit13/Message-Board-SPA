import {screen, render} from "@testing-library/react";
import {Logout} from "./Logout";
import userEvent from "@testing-library/user-event";
import {ON_LOGOUT} from "../../modules/message-board";

test(
    'should show a button with text "Logout" that dispatches ON_LOGOUT',
    () => {
        const dispatch = jest.fn()
        render(<Logout _useDispatch={() => dispatch}/>)
        const button = screen.getByText('Logout')
        expect(button.tagName).toBe('BUTTON')
        userEvent.click(button)
        expect(dispatch).toBeCalledWith({
            type: ON_LOGOUT
        })

    }
)


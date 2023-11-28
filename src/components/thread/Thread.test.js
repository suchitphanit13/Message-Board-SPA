import {screen, render} from "@testing-library/react";
import {Thread} from "./Thread";
import userEvent from "@testing-library/user-event";
import {ON_POST_DELETE, ON_POST_EDIT, ON_REPLY, ON_THREAD_DELETE, ON_THREAD_EDIT} from "../../modules/message-board";

test(
    'should show title, date, user',
    () => {
        const newThread = {
            title: 'title',
            date: '06-10-2022',
            user: 'user'
        }
        render(<Thread thread={newThread} _useDispatch={() => {
        }}/>)

        expect(screen.getByText(`Thread: ${newThread.title}`)).toBeInTheDocument()
        expect(screen.getByText(newThread.date)).toBeInTheDocument()
        expect(screen.getByText(`Created by ${newThread.user}`)).toBeInTheDocument()
    }
)

test(
    'should show button with text "Edit" that dispatches ON_THREAD_EDIT on click with the correct value',
    () => {
        const dispatch = jest.fn()
        const newThread = {
            id: 1
        }
        render(<Thread thread={newThread} _useDispatch={() => dispatch}/>)
        const button = screen.getByText('Edit')
        expect(button.tagName).toBe('BUTTON')
        userEvent.click(button)
        expect(dispatch).toBeCalledWith({
            type: ON_THREAD_EDIT,
            value: newThread.id
        })
    }
)

test(
    'should show button with text "Delete" that dispatches ON_THREAD_DELETE on click with the correct value',
    () => {
        const dispatch = jest.fn()
        const newThread = {
            id: 1
        }
        render(<Thread thread={newThread} _useDispatch={() => dispatch}/>)
        const button = screen.getByText('Delete')
        expect(button.tagName).toBe('BUTTON')
        userEvent.click(button)
        expect(dispatch).toBeCalledWith({
            type: ON_THREAD_DELETE,
            value: newThread.id
        })
    }
)

test(
    'should show button with text "Reply" that dispatches ON_REPLY on click with the correct value',
    () => {
        const dispatch = jest.fn()
        const newThread = {
            id: 1
        }
        render(<Thread thread={newThread} _useDispatch={() => dispatch}/>)
        const button = screen.getByText('Reply')
        expect(button.tagName).toBe('BUTTON')
        userEvent.click(button)
        expect(dispatch).toBeCalledWith({
            type: ON_REPLY,
            value: newThread.id
        })
    }
)

test(
    'should show the text "Posts for"',
    () => {
        render(<Thread thread={{}} _useDispatch={() => {
        }}/>)
        expect(screen.getByText('Posts for')).toBeInTheDocument()
    }
)

test(
    'should display a div with a user, date, and message for each post in the posts property' +
    ' in the given thread object',
    () => {
        const newThread = {
            posts: [{user: 'user1', date: '06-10-2022', msg: 'msg1'}, {user: 'user2', date: '06-11-2022', msg: 'msg2'}]
        }
        render(<Thread thread={newThread} _useDispatch={() => {
        }}/>)
        expect(screen.getByText('Posted by user1')).toBeInTheDocument()
        expect(screen.getByText('06-10-2022')).toBeInTheDocument()
        expect(screen.getByText('msg1')).toBeInTheDocument()
        expect(screen.getByText('Posted by user2')).toBeInTheDocument()
        expect(screen.getByText('06-11-2022')).toBeInTheDocument()
        expect(screen.getByText('msg2')).toBeInTheDocument()
    }
)

test(
    'should display a button with text "Edit Post" that dispatches ON_POST_EDIT on click for each post',
    () => {
        const newThread = {
            posts: [{id: '1', threadId: '2'}, {id: '3', threadId: '4'}]
        }
        const dispatch = jest.fn()
        render(<Thread thread={newThread} _useDispatch={() => dispatch}/>)

        const [button1, button2] = screen.getAllByText('Edit Post')
        expect(button1.tagName).toBe('BUTTON')
        expect(button2.tagName).toBe('BUTTON')
        userEvent.click(button1)
        userEvent.click(button2)
        expect(dispatch).toBeCalledTimes(2)
        expect(dispatch).toHaveBeenCalledWith({
            type: ON_POST_EDIT,
            id: '1',
            threadId: '2'
        })
        expect(dispatch).toHaveBeenCalledWith({
            type: ON_POST_EDIT,
            id: '3',
            threadId: '4'
        })
    }
)

test(
    'should display a button with text "Delete Post" that dispatches ON_POST_DELETE on click for each post',
    () => {
        const newThread = {
            posts: [{id: '1', threadId: '2'}, {id: '3', threadId: '4'}]
        }
        const dispatch = jest.fn()
        render(<Thread thread={newThread} _useDispatch={() => dispatch}/>)
        const [button1, button2] = screen.getAllByText('Delete Post')
        expect(button1.tagName).toBe('BUTTON')
        expect(button2.tagName).toBe('BUTTON')
        userEvent.click(button1)
        userEvent.click(button2)
        expect(dispatch).toBeCalledTimes(2)
        expect(dispatch).toHaveBeenCalledWith({
            type: ON_POST_DELETE,
            id: '1',
            threadId: '2'
        })
        expect(dispatch).toHaveBeenCalledWith({
            type: ON_POST_DELETE,
            id: '3',
            threadId: '4'
        })
    }
)


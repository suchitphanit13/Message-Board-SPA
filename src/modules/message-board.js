import {v4 as uid} from 'uuid';

export const CREATE_USER = 'message-board/CREATE_USER'
export const UPDATE_NEW_USER = 'message-board/UPDATE_NEW_USER'
export const UPDATE_NEW_PWD = 'message-board/UPDATE_NEW_PWD'
export const SET_USER_LOGIN = 'message-board/SET_USER_LOGIN'
export const SET_PWD_LOGIN = 'message-board/SET_PWD_LOGIN'
export const ON_LOGIN = 'message-board/ON_LOGIN'
export const ON_LOGOUT = 'message-board/ON_LOGOUT'
export const ON_THREAD_EDIT = 'message-board/ON_THREAD_EDIT'
export const ON_THREAD_DELETE = 'message-board/ON_THREAD_DELETE'
export const ON_REPLY = 'message-board/ON_REPLY'
export const SET_TITLE = 'message-board/SET_TITLE'
export const CREATE_THREAD = 'message-board/CREATE_THREAD'
export const SET_POST = 'message-board/SET_POST'
export const ON_POST = 'message-board/ON_POST'
export const UPDATE_THREAD = 'message-board/UPDATE_THREAD'
export const UPDATE_MSG = 'message-board/UPDATE_MSG'
export const SEND_MSG = 'message-board/SEND_MSG'
export const UPDATE_USER_MSG = 'message-board/UPDATE_USER_MSG'
export const ON_POST_EDIT = 'message-board/ON_POST_EDIT'
export const ON_POST_DELETE = 'message-board/ON_POST_DELETE'
export const UPDATE_POST = 'message-board/UPDATE_POST'


const initState ={
    newUser: '', //stores new username
    newPwd: '', // stores new user password
    userList:[],    // stores list of users with password and id
    userLog: '',
    pwdLog: '',
    currUser: null,
    title: '',
    threadList: [], // list of threads to render
    replyState: null,
    post: '',
    threadId: null,
    editThreadId: null,
    msg: '',
    userToMsg: '',
    editPostId: null,
    createMsg: '',
    loginMsg: '',
    inboxMsg: ''

}

export function reducer(state =initState, action, _uid = uid, _Date = Date){
    switch(action?.type){
        case CREATE_USER:
            if(state.userList.find(user => user.user === state.newUser)){
                return{
                    ...state,
                    createMsg: 'This user name is taken!'
                }
            }
            return {
                ...state,
                userList: [
                    ...state.userList,
                    {user: state.newUser, pwd: state.newPwd, id: _uid(), msgList:[] }
                ],
                createMsg: 'Account Created!',
                newUser: '',
                newPwd: ''
            }
        case UPDATE_NEW_USER:
            return {
                ...state,
                newUser: action.value
            }
        case UPDATE_NEW_PWD:
            return {
                ...state,
                newPwd: action.value
            }
        case SET_USER_LOGIN:
            return {
                ...state,
                userLog: action.value
            }
        case SET_PWD_LOGIN:
            return {
                ...state,
                pwdLog: action.value
            }
        case ON_LOGIN:
            const valUser = state.userList.find(
                user => user.user === state.userLog && user.pwd === state.pwdLog
            )
            if(valUser){
                return {
                    ...state,
                    currUser: valUser.user
                }
            }
            return {
                ...state,
                loginMsg: 'Invalid Log in!'
            }
        case ON_LOGOUT:
            return {
                ...state,
                currUser: null,
                loginMsg: '',
                createMsg: '',
                inboxMsg: '',
                userToMsg: '',
                userLog: '',
                pwdLog: ''
            }
        case ON_REPLY:
            return {
                ...state,
                replyState: true,
                threadId: action.value
            }
        case SET_TITLE:
            return {
                ...state,
                title: action.value
            }
        case CREATE_THREAD:
            return {
                ...state,
                threadList: [
                    ...state.threadList,
                    {title: state.title, date: _Date(), user: state.userLog, posts:[], id: _uid() }
                ],
                title: ''
            }
        case SET_POST:
            return {
                ...state,
                post: action.value
            }
        case ON_POST:
            return {
                ...state,
                replyState: null,
                threadList: state.threadList.map(
                    (thread)=> {
                        if(thread.id === state.threadId){
                            return{
                                ...thread,
                                posts: [
                                    ...thread.posts,
                                    {msg: state.post, date: _Date(), user: state.userLog, id: _uid(), threadId: thread.id}
                                ]
                            }
                        }
                        return thread
                    }
                ),
                post: ''
            }
        case ON_THREAD_EDIT:
            const threadUser = state.threadList.find(thread => thread.id === action.value).user
            if(state.currUser === threadUser){
                return {
                    ...state,
                    editThreadId: action.value
                }
            }
            return {
                ...state,
            }
        case UPDATE_THREAD:
            return {
                ...state,
                threadList: state.threadList.map(
                    (thread) =>{
                        if(thread.id === state.editThreadId){
                            return{
                                ...thread,
                                title: state.title
                            }
                        }
                        return thread
                    }
                ),
                editThreadId: null,
                title: ''
            }
        case ON_THREAD_DELETE:
            const user = state.threadList.find(thread => thread.id === action.value)?.user
            if(state.currUser === user){
                return {
                    ...state,
                    threadList: state.threadList.filter(thread => thread.id !== action.value)
                }
            }
            return {
                ...state
            }
        case UPDATE_MSG:
            return {
                ...state,
                msg: action.value
            }
        case UPDATE_USER_MSG:
            return {
                ...state,
                userToMsg: action.value
            }
        case SEND_MSG:
            const valAct = state.userList.find(
                user => user.user === state.userToMsg
            )
            if(valAct){
                return {
                    ...state,
                    userList: state.userList.map(
                        (user)=>{
                            if(user.user === valAct.user){
                                return{
                                    ...user,
                                    msgList: [
                                        ...user.msgList,
                                        {msg: state.msg, sentBy: state.currUser}
                                    ]
                                }
                            }
                            return user
                        }
                    ),
                    msg: '',
                    inboxMsg: 'Message sent!'
                }
            }
            return {
                ...state,
                inboxMsg: 'User does not exist!'
            }
        case ON_POST_DELETE:
            const postList = state.threadList?.find(thread => thread.id === action.threadId)?.posts
            const postUser = postList?.find(post => post.id === action.id)?.user
            if (postUser === state.currUser){
                return {
                    ...state,
                    threadList: state.threadList.map(
                        (thread)=>{
                            if(thread.id === action.threadId){
                                return{
                                    ...thread,
                                    posts: thread.posts.filter(post => post.id !== action.id)
                                }
                            }
                            return thread
                        }
                    )
                }
            }
            return {
                ...state
            }
        case ON_POST_EDIT:
            const pList = state.threadList.find(thread => thread.id === action.threadId).posts
            const pUser = pList.find(post => post.id === action.id).user
            if (pUser === state.currUser){
                return{
                    ...state,
                    editPostId: action.id,
                    editThreadId: action.threadId
                }
            }
            return {
                ...state
            }
        case UPDATE_POST:
            return {
                ...state,
                threadList: state.threadList.map(
                    (thread) =>{
                        if(thread.id === state.editThreadId){
                            return{
                                ...thread,
                                posts: thread.posts.map(
                                    (post) =>{
                                        if(post.id === state.editPostId){
                                            return{
                                                ...post,
                                                msg: state.post
                                            }
                                        }
                                        return post
                                    }
                                )
                            }
                        }
                        return thread
                    }
                ),
                editThreadId: null,
                editPostId: null
            }
        default:
            return{
                ...state
            }
    }
}
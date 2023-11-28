import {
    CREATE_THREAD,
    CREATE_USER,
    ON_LOGIN, ON_LOGOUT, ON_POST, ON_POST_DELETE, ON_POST_EDIT, ON_REPLY, ON_THREAD_DELETE, ON_THREAD_EDIT,
    reducer, SEND_MSG, SET_POST,
    SET_PWD_LOGIN, SET_TITLE,
    SET_USER_LOGIN, UPDATE_MSG,
    UPDATE_NEW_PWD,
    UPDATE_NEW_USER, UPDATE_POST, UPDATE_THREAD, UPDATE_USER_MSG
} from "./message-board";

test(
    'should init to correct state',
    () => {
        const state = reducer();
        expect(state).toStrictEqual({
            newUser: '',
            newPwd: '',
            userList: [],
            userLog: '',
            pwdLog: '',
            currUser: null,
            title: '',
            threadList: [],
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
        })
    }
)

test(
    'should add a new user object to userList with the properties "user", "pwd", "id", and "msgList" the value of ' +
    '"user" and "pwd" should be newUser state and newPwd state respectively, set createMsg to "Account Created!, and set' +
    ' newUser and newPwd to "" when CREATE_USER action is dispatched',
    () => {
        const initState = reducer({
            newUser: 'user',
            newPwd: 'pass',
            userList: [],
            createMsg: ''
        });
        const state = reducer(initState, {type: CREATE_USER}, () => 1)
        expect(state).toStrictEqual({
            ...initState,
            userList: [{user: 'user', pwd: 'pass', id: 1, msgList: []}],
            createMsg: 'Account Created!',
            newUser: '',
            newPwd: ''
        })
    }
)

test(
    'Should set createMsg to "This user name is taken!" when CREATE_USER action is dispatched and a duplicate' +
    'user is found in userList',
    () => {
        const initState = reducer({
            newUser: 'user',
            newPwd: 'pass',
            userList: [{user: 'user'}],
            createMsg: ''
        })
        const state = reducer(initState, {type: CREATE_USER}, () => 1)
        expect(state).toStrictEqual({
            ...initState,
            createMsg: 'This user name is taken!'
        })
    }
)

test(
    'should set newUser when UPDATE_NEW_USER is called',
    () => {
        const initState = reducer();
        const state = reducer(initState, {type: UPDATE_NEW_USER, value: 'user'})
        expect(state).toStrictEqual({
            ...initState,
            newUser: 'user'
        })
    }
)

test(
    'should set newPwd when UPDATE_NEW_PWD is called',
    () => {
        const initState = reducer();
        const state = reducer(initState, {type: UPDATE_NEW_PWD, value: 'pass'})
        expect(state).toStrictEqual({
            ...initState,
            newPwd: 'pass'
        })
    }
)

test(
    'should set userLog when SET_USER_LOGIN is called',
    () => {
        const initState = reducer();
        const state = reducer(initState, {type: SET_USER_LOGIN, value: 'user'})
        expect(state).toStrictEqual({
            ...initState,
            userLog: 'user'
        })
    }
)

test(
    'should set userLog when SET_PWD_LOGIN is called',
    () => {
        const initState = reducer();
        const state = reducer(initState, {type: SET_PWD_LOGIN, value: 'pass'})
        expect(state).toStrictEqual({
            ...initState,
            pwdLog: 'pass'
        })
    }
)

test(
    'should set currUser to the user if userLog and pwdLog correspond to a valid user in userList' +
    'when ON_LOGIN is called',
    () => {
        const initState = reducer({
            userList: [{user: 'user', pwd: 'pwd'}],
            userLog: 'user',
            pwdLog: 'pwd',
            currUser: null,
        });
        const state = reducer(initState, {type: ON_LOGIN})
        expect(state).toStrictEqual({
            ...initState,
            currUser: 'user'
        })
    }
)

test(
    'should set loginMsg to "Invalid Log in!" if userLog or pwdLog do not correspond to a valid user in userList' +
    'when ON_LOGIN is called',
    () => {
        const initState = reducer({
            userList: [{user: 'user1', pwd: 'pwd'}, {user: 'user', pwd: 'pwd3'}],
            userLog: 'user',
            pwdLog: 'pwd',
            loginMsg: ''
        });
        const state = reducer(initState, {type: ON_LOGIN})
        expect(state).toStrictEqual({
            ...initState,
            loginMsg: 'Invalid Log in!'
        })
    }
)
test(
    'should set currUser to null; loginMsg, createMsg, and inboxMsg to empty strings when ON_LOGOUT is called',
    () => {
        const initState = reducer({
            currUser: 'user',
            loginMsg: 'something',
            createMsg: 'something',
            inboxMsg: 'something',
            userToMsg: 'something',
            userLog: 'something',
            pwdLog: 'something'
        })
        const state = reducer(initState, {type: ON_LOGOUT})
        expect(state).toStrictEqual({
            ...initState,
            currUser: null,
            loginMsg: '',
            createMsg: '',
            inboxMsg: '',
            userToMsg: '',
            userLog: '',
            pwdLog: ''
        })
    }
)

test(
    'should set replyState to true and set threadId when ON_REPLY is called',
    () => {
        const initState = reducer()
        const state = reducer(initState, {type: ON_REPLY, value: 1})
        expect(state).toStrictEqual({
            ...initState,
            replyState: true,
            threadId: 1
        })
    }
)

test(
    'should set title when SET_TITLE is called',
    () => {
        const initState = reducer()
        const state = reducer(initState, {type: SET_TITLE, value: 'title'})
        expect(state).toStrictEqual({
            ...initState,
            title: 'title',
        })
    }
)

test(
    'should add a new thread object with properties title, date, user, posts, and id to threadList' +
    'with the values of title state, current date, userLog, [], and unique id respectively and set title to ""' +
    ' when CREATE_THREAD is called',
    () => {
        const initState = reducer({
            userList: [],
            userLog: 'user',
            title: 'title',
            threadList: [],
        })
        const state = reducer(initState, {type: CREATE_THREAD}, () => 1, () => '03/03/2022')
        expect(state).toStrictEqual({
            ...initState,
            threadList: [{title: 'title', date: '03/03/2022', user: 'user', posts: [], id: 1}],
            title: ''
        })
    }
)

test(
    'should set post when SET_POST is called',
    () => {
        const initState = reducer()
        const state = reducer(initState, {type: SET_POST, value: 'something'})
        expect(state).toStrictEqual({
            ...initState,
            post: 'something'
        })
    }
)

test(
    'should add a new post object to the array "posts" in the thread with the corresponding threadId ' +
    'the object should have properties msg, date, user, id and threadId; with values of the post state, a date, userLog' +
    'an id and a thread id respectively, set replyState to null and post to "" when ON_POST is called',
    () => {
        const initState = reducer({
            userLog: 'user',
            title: '',
            threadList: [
                {title: 'title', date: '03/03/2022', user: 'user', posts: [], id: 1234},
                {title: 'title2', date: '03/04/2022', user: 'user', posts: [], id: 456}
            ],
            replyState: true,
            post: 'post',
            threadId: 1234,
            editThreadId: null,
        })
        const state = reducer(initState, {type: ON_POST}, () => 987, () => '06/11/2022')
        expect(state).toStrictEqual({
            ...initState,
            replyState: null,
            threadList: [
                {
                    title: 'title', date: '03/03/2022', user: 'user', posts: [
                        {msg: 'post', date: '06/11/2022', user: 'user', id: 987, threadId: 1234}
                    ], id: 1234
                },
                {title: 'title2', date: '03/04/2022', user: 'user', posts: [], id: 456}
            ],
            post: ''
        })
    }
)
test(
    'should set editThreadId if the currUser created the thread to edit when ON_THREAD_EDIT is called',
    () => {
        const initState = reducer({
            currUser: 'user',
            editThreadId: null,
            threadList: [{title: 'title', date: '03/03/2022', user: 'user', posts: [], id: 1234}]
        })

        const state = reducer(initState, {type: ON_THREAD_EDIT, value: 1234})

        expect(state).toStrictEqual({
            ...initState,
            editThreadId: 1234
        })
    }
)

test(
    'should not change state if the currUser did not create the thread to edit when ON_THREAD_EDIT is called',
    () => {
        const initState = reducer({
            currUser: 'user123',
            editThreadId: null,
            threadList: [{title: 'title', date: '03/03/2022', user: 'user', posts: [], id: 1234}]
        })
        const state = reducer(initState, {type: ON_THREAD_EDIT, value: 1234})
        expect(state).toStrictEqual({
            ...initState
        })
    }
)

test(
    'should set title property of the thread that has a matching id with the state editThreadId,' +
    ' set editThreadId to null, and title to "" when UPDATE_THREAD is called',
    () => {
        const initState = reducer({
            title: 'new title',
            editThreadId: 1234,
            threadList: [
                {title: 'title', date: '03/03/2022', user: 'user', posts: [], id: 1234},
                {title: 't', date: '03/03/2022', user: 'user', posts: [], id: 456}
            ]
        })
        const state = reducer(initState, {type: UPDATE_THREAD})

        expect(state).toStrictEqual({
            ...initState,
            threadList: [
                {title: 'new title', date: '03/03/2022', user: 'user', posts: [], id: 1234},
                {title: 't', date: '03/03/2022', user: 'user', posts: [], id: 456}
            ],
            editThreadId: null,
            title: ''
        })
    }
)

test(
    'should delete the selected thread with matching thread id and user when ON_THREAD_DELETE is called',
    () => {
        const initState = reducer({
            currUser: 'user',
            editThreadId: 1234,
            threadList: [{title: 'title', date: '03/03/2022', user: 'user', posts: [], id: 1234}]
        })
        const state = reducer(initState, {type: ON_THREAD_DELETE, value: 1234})
        expect(state).toStrictEqual({
            ...initState,
            threadList: []
        })
    }
)

test(
    'should return the original state if the selected thread does not have a matching thread id ' +
    'when ON_THREAD_DELETE is called',
    () => {
        const initState = reducer({
            currUser: 'user',
            threadList: [{title: 'title', date: '03/03/2022', user: 'user', posts: [], id: 1234}]
        })
        const state = reducer(initState, {type: ON_THREAD_DELETE, value: 123})
        expect(state).toStrictEqual({
            ...initState
        })
    }
)

test(
    'should return the original state if the selected thread does not have a matching user ' +
    'when ON_THREAD_DELETE is called',
    () => {
        const initState = reducer({
            currUser: 'user1',
            threadList: [{title: 'title', date: '03/03/2022', user: 'user', posts: [], id: 1234}]
        })
        const state = reducer(initState, {type: ON_THREAD_DELETE, value: 1234})
        expect(state).toStrictEqual({
            ...initState,
        })
    }
)

test(
    'should set msg when UPDATE_MSG is called',
    () => {
        const initState = reducer();
        const state = reducer(initState, {type: UPDATE_MSG, value: 'msg'})
        expect(state).toStrictEqual({
            ...initState,
            msg: 'msg'
        })
    }
)

test(
    'should set userToMsg when UPDATE_USER_MSG is called',
    () => {
        const initState = reducer();
        const state = reducer(initState, {type: UPDATE_USER_MSG, value: 'user'})
        expect(state).toStrictEqual({
            ...initState,
            userToMsg: 'user'
        })
    }
)

test(
    'should set msg to "",inboxMsg to "Message sent!", and  add a msg object to msgList with the' +
    ' properties msg and sentBy and values msg and currUser respectively to the user object that corresponds ' +
    'to userToMsg when SEND_MSG is called',
    () => {
        const initState = reducer({
            userList: [
                {user: 'user2', pwd: 'pass', id: 1, msgList: []},
                {user: 'user4', pwd: 'pass', id: 663, msgList: []}
            ],
            currUser: 'user1',
            msg: 'msg',
            userToMsg: 'user2',
            inboxMsg: ''
        });
        const state = reducer(initState, {type: SEND_MSG})
        expect(state).toStrictEqual({
            userList: [
                {user: 'user2', pwd: 'pass', id: 1, msgList: [{msg: 'msg', sentBy: 'user1'}]},
                {user: 'user4', pwd: 'pass', id: 663, msgList: []}
            ],
            currUser: 'user1',
            msg: '',
            userToMsg: 'user2',
            inboxMsg: 'Message sent!'

        })
    }
)

test(
    'should set inboxMsg to "User does not exist!" if a valid user cannot be found in userList ' +
    'when SEND_MSG is called',
    () => {
        const initState = reducer({
            userList: [{user: 'user2', pwd: 'pass', id: 1, msgList: []}],
            currUser: 'user1',
            msg: 'msg',
            userToMsg: 'user4',
            inboxMsg: ''
        });
        const state = reducer(initState, {type: SEND_MSG})
        expect(state).toStrictEqual({
            ...initState,
            inboxMsg: 'User does not exist!'

        })
    }
)

test(
    'should delete post with corresponding thread id, user and post id when ON_POST_DELETE is called',
    () => {
        const initState = reducer({
            threadList: [
                {
                    title: 'title', date: '03/03/2022', user: 'user', posts: [
                        {msg: 'post', date: '06/11/2022', user: 'user', id: 987, threadId: 1234}
                    ], id: 1234
                },
                {
                    title: 'title2', date: '03/03/2022', user: 'user8', posts: [
                        {msg: 'post', date: '06/11/2022', user: 'user', id: 977, threadId: 1238}
                    ], id: 1238
                }
            ],
            currUser: 'user'
        })
        const state = reducer(initState, {type: ON_POST_DELETE, id: 987, threadId: 1234})
        expect(state).toStrictEqual({
            ...initState,
            threadList: [
                {title: 'title', date: '03/03/2022', user: 'user', posts: [], id: 1234},
                {
                    title: 'title2', date: '03/03/2022', user: 'user8', posts: [
                        {msg: 'post', date: '06/11/2022', user: 'user', id: 977, threadId: 1238}
                    ], id: 1238
                }
            ],

        })
    }
)

test(
    'return the original state if with corresponding thread id does not match when ON_POST_DELETE is called',
    () => {
        const initState = reducer({
            threadList: [
                {
                    title: 'title', date: '03/03/2022', user: 'user', posts: [
                        {msg: 'post', date: '06/11/2022', user: 'user', id: 987, threadId: 1234}
                    ], id: 1234
                }
            ],
            currUser: 'user'
        })
        const state = reducer(initState, {type: ON_POST_DELETE, id: 987, threadId: 123})
        expect(state).toStrictEqual({
            ...initState,
        })
    }
)
test(
    'return the original state if with corresponding user does not match when ON_POST_DELETE is called',
    () => {
        const initState = reducer({
            threadList: [
                {
                    title: 'title', date: '03/03/2022', user: 'user', posts: [
                        {msg: 'post', date: '06/11/2022', user: 'user', id: 987, threadId: 1234}
                    ], id: 1234
                }
            ],
            currUser: 'user2'
        })
        const state = reducer(initState, {type: ON_POST_DELETE, id: 987, threadId: 1234})
        expect(state).toStrictEqual({
            ...initState,
        })
    }
)
test(
    'return the original state if with corresponding post id does not match when ON_POST_DELETE is called',
    () => {
        const initState = reducer({
            threadList: [
                {
                    title: 'title', date: '03/03/2022', user: 'user', posts: [
                        {msg: 'post', date: '06/11/2022', user: 'user', id: 987, threadId: 1234}
                    ], id: 1234
                }
            ],
            currUser: 'user'
        })
        const state = reducer(initState, {type: ON_POST_DELETE, id: 9878, threadId: 1234})
        expect(state).toStrictEqual({
            ...initState,
        })
    }
)

test(
    'should set editPostId and editThreadId if original post user is the currUser when ON_POST_EDIT is called',
    () => {
        const initState = reducer({
            currUser: 'user',
            threadList: [
                {
                    title: 'title', date: '03/03/2022', user: 'user', posts: [
                        {msg: 'post', date: '06/11/2022', user: 'user', id: 987, threadId: 1234}
                    ], id: 1234
                }
            ],
            editThreadId: null,
            editPostId: null,
        })
        const state = reducer(initState, {type: ON_POST_EDIT, id: 987, threadId: 1234})
        expect(state).toStrictEqual({
            ...initState,
            editThreadId: 1234,
            editPostId: 987,
        })
    }
)
test(
    'should return original state if original post user is the not currUser when ON_POST_EDIT is called',
    () => {
        const initState = reducer({
            currUser: 'user34',
            threadList: [
                {
                    title: 'title', date: '03/03/2022', user: 'user', posts: [
                        {msg: 'post', date: '06/11/2022', user: 'user', id: 987, threadId: 1234}
                    ], id: 1234
                }
            ],
            editThreadId: null,
            editPostId: null,
        })
        const state = reducer(initState, {type: ON_POST_EDIT, id: 987, threadId: 1234})
        expect(state).toStrictEqual({
            ...initState,
        })
    }
)

test(
    'should set editThreadId and editPostId to null and post state for the post for the corresponding' +
    ' post id and thread id when UPDATE_POST is called',
    () => {
        const initstate = reducer({
            threadList: [
                {
                title: 'title', date: '03/03/2022', user: 'user', posts: [
                    {msg: 'post', date: '06/11/2022', user: 'user', id: 456, threadId: 123},
                    {msg: 'post', date: '06/11/2022', user: 'user', id: 459, threadId: 123}
                ], id: 123
            },
                {
                    title: 'title', date: '03/03/2022', user: 'user', posts: [], id: 129
                }
            ],
            editThreadId: 123,
            editPostId: 456,
            post: 'new msg'
        })
        const state = reducer(initstate,{type: UPDATE_POST})
        expect(state).toStrictEqual({
            ...initstate,
            editThreadId: null,
            editPostId: null,
            threadList: [
                {
                    title: 'title', date: '03/03/2022', user: 'user', posts: [
                        {msg: 'new msg', date: '06/11/2022', user: 'user', id: 456, threadId: 123},
                        {msg: 'post', date: '06/11/2022', user: 'user', id: 459, threadId: 123}
                    ], id: 123
                },
                {
                    title: 'title', date: '03/03/2022', user: 'user', posts: [], id: 129
                }
            ]

        })
    }
)

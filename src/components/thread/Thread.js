import {useDispatch} from "react-redux";
import {
    ON_POST_DELETE,
    ON_POST_EDIT,
    ON_REPLY,
    ON_THREAD_DELETE,
    ON_THREAD_EDIT
} from "../../modules/message-board";
import {Button, Card} from "react-bootstrap";

export function Thread({thread, _useDispatch = useDispatch}) {
    const dispatch = _useDispatch();
    const posts = thread.posts

    const postList = posts?.map((post, idx) => {
        return <Card.Text key={idx}>
            <span> Posted by {post?.user}</span>
            <br/>
            <span>{post?.date}</span>
            <br/>
            <span>{post?.msg}</span>
            <br/>
            <Button size={"sm"} variant={'secondary'}
                    onClick={() => dispatch({type: ON_POST_EDIT, id: post.id, threadId: post.threadId})}>Edit Post
            </Button>
            <Button variant={'danger'} size={"sm"}
                    onClick={() => dispatch({type: ON_POST_DELETE, id: post.id, threadId: post.threadId})}>Delete Post
            </Button>
        </Card.Text>
    })
    return <>
        <Card>
            <Card.Title style={{backgroundColor: '#bd50de'}}>Thread: {thread?.title}</Card.Title>
            <Card.Text>
                <span>{thread?.date}</span>
                <br/>
                <span>Created by {thread?.user}</span>
                <br/>
                <Button size={"sm"} variant={'secondary'}
                        onClick={() => dispatch({type: ON_THREAD_EDIT, value: thread.id})}>Edit</Button>
                <Button size={"sm"} variant={'danger'}
                        onClick={() => dispatch({type: ON_THREAD_DELETE, value: thread.id})}>Delete</Button>
                <Button size={"sm"} onClick={() => dispatch({type: ON_REPLY, value: thread.id})}>Reply</Button>
            </Card.Text>
        </Card>
        <Card>
            <Card.Header> Posts for {thread?.title} </Card.Header>
            {postList}
        </Card>
    </>
}

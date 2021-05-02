import classes from './comment-list.module.css';

function CommentList(props) {
    console.log(props);
    const { eventId } = props;
    const comments = props.comments?.filter(x => x.eventId === eventId);
    return (
        <ul className={classes.comments}>
            {comments?.map(comment => (
                <li key={comment._id}>
                    <p>{comment.text}</p>
                    <div>
                        By <address>{comment.name}</address>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default CommentList;
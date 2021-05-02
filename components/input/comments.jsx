import { useEffect, useState, useContext } from 'react';
import useSWR from 'swr';

import CommentList from './comment-list';
import NewComment from './new-comment';
import NotificationContext from '../../store/notification-context';
import classes from './comments.module.css';

function Comments(props) {
    const notificationCtx = useContext(NotificationContext);

    const { eventId } = props;

    const [showComments, setShowComments] = useState(false);

    const { data: commentsData, error, revalidate } = useSWR(`/api/comments/${eventId}`);

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    function addCommentHandler(commentData) {
        // send data to API
        console.log(commentData);
        // show pending notification
        notificationCtx.showNotification({
            title: 'Adding comment',
            message: 'Commenting on the post',
            status: 'pending'
        });
        fetch(`/api/comments/${eventId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentData)
        }).then(res => res.json()).then(data => {
            console.log(data);
            revalidate();
            notificationCtx.showNotification({
                title: 'Success',
                message: 'Commented on the post',
                status: 'success'
            })
        });
    }

    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
      </button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && <CommentList comments={commentsData?.comments} eventId={eventId} />}
        </section>
    );
}

export default Comments;
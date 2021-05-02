import { useRef, useContext } from 'react';

import classes from './newsletter-registration.module.css';
import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
    const notificationCtx = useContext(NotificationContext);

    const emailInputRef = useRef();
    function registrationHandler(event) {
        event.preventDefault();

        const email = emailInputRef.current.value;

        const bodyData = JSON.stringify({ email });

        notificationCtx.showNotification({
            message: 'Registering for newsletter',
            title: 'Signing up...',
            status: 'pending'
        })

        fetch('/api/newsletter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: bodyData
        }).then(res => {
            if (res.ok) {
                res.json()
            } else {
                res.json().then(data => {
                    throw new Error(data.message || 'Something went wrong!')
                })
            }
        }).then(data => (notificationCtx.showNotification({
            message: 'Newsletter registered successfully',
            title: 'Success!',
            status: 'success'
        }))).catch(error => {
            notificationCtx.showNotification({
                message: 'Newsletter failed to register',
                title: 'Error',
                status: 'error'
            })
        });

        // fetch user input (state or refs)
        // optional: validate input
        // send valid data to API
    }

    return (
        <section className={classes.newsletter}>
            <h2>Sign up to stay updated!</h2>
            <form onSubmit={registrationHandler}>
                <div className={classes.control}>
                    <input
                        type='email'
                        id='email'
                        placeholder='Your email'
                        aria-label='Your email'
                        ref={emailInputRef}
                    />
                    <button>Register</button>
                </div>
            </form>
        </section>
    );
}

export default NewsletterRegistration;
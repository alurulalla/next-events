import React from 'react';
import Head from 'next/head';
// import { useRouter } from 'next/router';

// import { getEventById } from '../../dummy-data';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import { getAllEvents, getEventById, getFeaturedEvents } from '../../helpers/api-util';
import Comments from '../../components/input/comments';

const EventDetailPage = ({ event }) => {
    // const router = useRouter();

    // const event = getEventById(router.query.eventId);
    if (!event) {
        return <div className='center'>
            <p>Loading...</p>
        </div>
    }
    return (
        <>
            <Head>
                <title>{event.title}</title>
                <meta name='description' content={event.description} />
            </Head>
            <EventSummary title={event.title} />
            <EventLogistics
                image={event.image}
                imageAlt={event.title}
                date={event.date}
                address={event.location} />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
            <Comments eventId={event.id} />
        </>
    )
}

export async function getStaticProps(context) {
    const eventId = context.params.eventId;
    const event = await getEventById(eventId);

    return {
        props: {
            event,
            revalidate: 30
        }
    }
}

export async function getStaticPaths() {
    const events = await getFeaturedEvents();

    const paths = events.map(event => ({
        params: {
            eventId: event.id
        }
    }))
    return {
        paths,
        fallback: true
    }
}

export default EventDetailPage;
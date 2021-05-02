import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Head from 'next/head';

import { getFilteredEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';

const FilteredEventsPage = (props) => {
    const router = useRouter();

    // const [events, setEvents] = useState([]);

    // const filterData = router.query.slug;

    // const { data, error } = useSWR('https://next-events-cf4f7-default-rtdb.firebaseio.com/events.json');

    // useEffect(() => {
    //     if (data) {
    //         const data = await response.json();

    //         const events = [];

    //         for (const key in data) {
    //             events.push({
    //                 id: key,
    //                 ...data[key],
    //             });
    //         }

    //         setEvents(events);
    //     }
    // }, [data]);

    // if (!filterData) {
    //     return <p className='center'>Loading...</p>
    // }

    // const filteredYear = +filterData[0];
    // const filteredMonth = +filterData[1];

    if (props.hasError) {
        return (
            <div className='center'>
                <p>Invalid Filters. Please adjust your values.</p>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </div>
        )
    }

    const filteredEvents = props.filteredEvents;

    if (!filteredEvents || filteredEvents.length === 0) {
        return <div className='center'>
            <p>No Events found.</p>
            <div className='center'>
                <Button link='/events'>Show All Events</Button>
            </div>
        </div>
    }

    const date = new Date(props.date.year, props.date.month - 1);

    return (
        <>
            <Head>
                <title>Filtered Events</title>
                <meta name='description' content={`All events for ${props.date.month}/${props.date.year}`} />
            </Head>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </>
    )
}

export async function getServerSideProps(context) {
    const { params } = context;

    const filterData = params.slug;

    const filteredYear = +filterData[0];
    const filteredMonth = +filterData[1];

    if (isNaN(filteredMonth) || isNaN(filteredYear) || filteredYear > 2030 || filteredYear < 2021 || filteredMonth < 1 || filteredMonth > 12) {
        return {
            props: {
                hasError: true
            },
            notFound: true,
            // redirect: {
            //     destination: '/error'
            // }
        }
    }

    const filteredEvents = await getFilteredEvents({
        year: filteredYear,
        month: filteredMonth
    });


    return {
        props: {
            filteredEvents,
            date: {
                year: +filteredYear,
                month: +filteredMonth
            }
        }
    }
}

export default FilteredEventsPage;
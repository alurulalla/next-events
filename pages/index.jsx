import React from 'react';
import Head from 'next/head';

import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-util';
import NewsLetterRegister from '../components/input/newsletter-registration';

// import { getFeaturedEvents } from '../dummy-data';

const HomePage = ({ featuredEvents }) => {
  return (
    <>
      <Head>
        <title>NextJS Events</title>
        <meta name='description' content='Find a lot of great events that allow you to evolve...' />
      </Head>
      <NewsLetterRegister />
      {featuredEvents && <EventList items={featuredEvents} />}
    </>
  )
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents
    },
    revalidate: 1800
  }
}

export default HomePage;
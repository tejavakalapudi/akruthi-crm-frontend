/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { Helmet } from 'react-helmet';

export default () => {
    return (
        <div>
            <Helmet>
                <title>Home Page</title>
                <meta name="description" content="Place to increase counter" />
            </Helmet>
            <div>Dashboard</div>
        </div>
    );
};
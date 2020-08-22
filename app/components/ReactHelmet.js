import React from 'react';
import { Helmet } from 'react-helmet';

export default ({title, meta}) => (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={meta} />
    </Helmet>
);
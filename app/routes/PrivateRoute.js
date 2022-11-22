/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

export default ({ component: Component, ...rest }) => {
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  return (
    <div className="routes-wrapper authorized">
      {isAuthorized ? <Component {...props} /> : <Navigate to="/login" />}
    </div>
  );
};

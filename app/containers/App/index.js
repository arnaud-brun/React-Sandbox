/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from 'components/Header';
import Map from 'components/Map';
import Chat from 'containers/Chat/Loadable';
import Apartment from 'components/Apartment';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import BookingPage from 'containers/BookingPage/Loadable';

export default function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/map" component={Map} />
        <Route exact path="/booking" component={BookingPage} />
        <Route path="/booking/apartment/:id" component={Apartment} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

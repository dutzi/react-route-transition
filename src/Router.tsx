import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import FirstView from './FirstView';
import MidView from './MidView';
import LastView from './LastView';
import { RouteTransitionProvider } from 'react-route-transition';
import './index.css';

export default () => {
  const content = (
    <>
      <Route path="/" exact>
        <FirstView />
      </Route>
      <Route path="/mid">
        <MidView />
      </Route>
      <Route path="/last">
        <LastView />
      </Route>
    </>
  );

  return (
    <BrowserRouter>
      <RouteTransitionProvider>{content}</RouteTransitionProvider>
    </BrowserRouter>
  );
};

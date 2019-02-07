import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home';

const AppRouter = () => (
  <Router>
    <React.Fragment>
      <Route path="/" exact component={Home} />
    </React.Fragment>
  </Router>
)

export default AppRouter;
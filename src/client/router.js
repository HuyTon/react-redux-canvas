import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Introduce from './components/views/demo-introduce';

// Layouts
import MainLayout from './components/layouts/main-layout';
import CanvasLayout from './components/layouts/canvas-layout';

// Pages
import CanvasContainer from './components/containers/canvas-container';

export default (
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      
        <Route path="/">
          <Route component={CanvasLayout}>
            <IndexRoute component={CanvasContainer} />
          </Route>
        </Route>

        <Route path="/introduce" component={Introduce} />

    </Route>
  </Router>
);

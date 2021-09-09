import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import NotFound from 'components/NotFound';
import ProjectPage from 'pages/Project';
import ProjectProvider from 'contexts/ProjectContext';

export default function ProjectRoutes(props) {
  const match = useRouteMatch();
  return (
    <ProjectProvider>
      <Switch>
        <Route exact path={`${match.url}`} component={ProjectPage} />
        {/* <Route exact path={`${match.url}/:id`} component={ProjectDetailPage} /> */}
        <Route component={NotFound} />
      </Switch>
    </ProjectProvider>
    
  )
}
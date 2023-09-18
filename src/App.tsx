import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Graph from './components/Graph';
import Home from './components/Home';
import Project from './components/Project';
import ProjectHome from './components/Project/ProjectHome';
import ProjectOntologies from './components/Project/ProjectOntologies';
import ProjectResources from './components/Project/ProjectResources';
import GraphLinked from './components/GraphLinked';
import ProjectCustomPage from './components/Project/ProjectCustomPage';
import { useSelector } from 'react-redux';
import { RootStore } from './store';
import EntityInfo from './components/EntityInfo';
import ProjectFiles from './components/Project/ProjectFiles';
import DDD from './components/DDD';

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = (props) => {
  const [authWindow, setauthWindow] = React.useState(false)
  const ontologyState = useSelector((state: RootStore) => state.ontology)
  return <Router>


    <Switch>
      <Route path="/project/:id/home" render={(props) => <Project slot={ProjectHome} {...props} />} />
      <Route path="/project/:id/ontologies" render={(props) => <Project slot={ProjectOntologies} {...props} />} />
      <Route path="/project/:id/resources" render={(props) => <Project slot={ProjectResources} {...props} />} />
      <Route path="/project/:id/files" render={(props) => <Project slot={ProjectFiles} {...props} />} />
      <Route path="/project/:id/customPage/:uri" render={(props) => <Project slot={ProjectCustomPage} {...props} />} />
      <Route path="/graph/:uri" component={GraphLinked} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/" component={Home} />
      <Route exact path="/ddd" component={DDD} />



    </Switch>
    {ontologyState.opened_entity && <EntityInfo />}


  </Router>

}

export default App;

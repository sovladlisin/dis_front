import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootStore } from './store';
import Login from './components/Auth/Login';
import EntityInfo from './components/Forms/EntityForm/EntityInfo';
import GraphLinked from './components/Graph/GraphLinked';
import Landing from './components/Landing';
import Project from './components/Project/Project';
import ProjectCustomPage from './components/Project/ProjectCustomPage';
import ProjectFiles from './components/Project/ProjectFiles';
import ProjectHome from './components/Project/ProjectHome';
import ProjectOntologies from './components/Project/ProjectOntologies';
import ProjectResources from './components/Project/ProjectResources';
import Cabinet from './components/Cabinet';
import OntologyTree from './components/Tree/OntologyTree';
import OntologyTreePage from './components/Tree/OntologyTreePage';
import ProjectLearn from './components/Project/ProjectLearn';
import TextWorkspace from './components/Project/TextWorkspace/TextWorkspace';


interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = (props) => {
  const [authWindow, setauthWindow] = React.useState(false)
  const ontologyState = useSelector((state: RootStore) => state.ontology)
  return <Router
  // basename="/dis_front"
  >


    <Switch>
      <Route path="/neo_graph/project/:id/home" render={(props) => <Project slot={ProjectHome} {...props} />} />
      <Route path="/neo_graph/project/:id/ontologies" render={(props) => <Project slot={ProjectOntologies} {...props} />} />
      <Route path="/neo_graph/project/:id/learn" render={(props) => <Project slot={ProjectLearn} {...props} />} />
      <Route path="/neo_graph/project/:id/resources" render={(props) => <Project slot={ProjectResources} {...props} />} />
      <Route path="/neo_graph/project/:id/files" render={(props) => <Project slot={ProjectFiles} {...props} />} />
      <Route path="/neo_graph/project/:id/customPage/:id" render={(props) => <Project slot={ProjectCustomPage} {...props} />} />
      <Route path="/neo_graph/graph/:uri" component={GraphLinked} />

      <Route path="/neo_graph/project/:id/textEditor/:id" render={(props) => <Project slot={TextWorkspace} {...props} />} />


      <Route exact path="/neo_graph/cabinet" component={Cabinet} />

      <Route path="/neo_graph/ontology/tree/:uri" component={OntologyTreePage} />




      <Route exact path="/neo_graph" component={Landing} />
      <Route exact path="/neo_graph/login" component={Login} />



    </Switch>
    {ontologyState.opened_entity && <EntityInfo />}


  </Router>

}

export default App;

import React from 'react';
import Contacts from './component/Contacts/Contacts';
import Header from './component/Layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from './Context';
import AddContact from './component/Contacts/AddContact';
import EditContact from './component/Contacts/EditContact';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import About from './component/pages/About';
import NotFound from './component/pages/NotFound';
import Test from './component/test/Test';



function App() {

  return (
    <Provider>
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <Header branding="Contact Manager" />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Contacts} />
              <Route exact path="/Contact/edit/:id" component={EditContact} />
              <Route exact path="/Contact/add" component={AddContact} />
              <Route exact path="/About" component={About} />
              <Route exact path="/test" component={Test} />
              <Route component={NotFound} />

            </Switch>
          </div>
        </div>
      </Router>
    </Provider>

  );
}

export default App;

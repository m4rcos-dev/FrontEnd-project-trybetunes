import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import ThemeProvider from './context/ThemeProvider';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <ThemeProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/home" component={ Home } />
          <Route exact path="*" component={ NotFound } />
        </Switch>
      </ThemeProvider>
    );
  }
}

export default App;

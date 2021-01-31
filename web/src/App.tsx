import React from 'react';
import './App.css';
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from '@apollo/client';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Users from './components/users';
import Home from './components/Home';
import Register from './components/Register';
import {setContext} from 'apollo-link-context'

const httpLink = new HttpLink({uri:'http://localhost:4000'});
const authLink = setContext(async(req, {headers}) =>{
  const token = localStorage.getItem('token');

  return{
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null
    }
  }
})


const link = authLink.concat(httpLink as any);
const client = new ApolloClient({
  link: (link as any),
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client = {client}>
      <Router>
        <Switch>


          <Route path = '/home'>
            <Home />
          </Route>

          <Route path = '/register'>
            <Register />
          </Route>

          <Route  path ='/'>
            <Users />
          </Route>
        </Switch>
      </Router>
</ApolloProvider>
);
    
}

export default App;

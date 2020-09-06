import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import { ItemDetail } from './components/ItemDetail/ItemDetail';
import { Search } from './components/Search/Search';
import { ResultsPage } from './components/ResultsPage/ResultsPage';

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Search />
        <Switch>
          <>
            <div className="page-content">
              <Route exact path='/items' component={ResultsPage} />
              <Route exact path='/items/:id' component={ItemDetail} />
            </div>
          </>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;

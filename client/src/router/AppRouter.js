import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import HomePage from '../components/Home/HomePage';
import FormPage from '../components/Form/FormPage';
import DisplayPage from '../components/Display/DisplayPage';

const AppRouter = (props) => {
    return (
        <BrowserRouter basename="/MovieApp">
            <Switch>
                {/* <Route path="/" exact render={({ location }) => 
                                                { return <HomePage loggedIn={location.state ? location.state.loggedIn : false} /> }}                             
                /> */}
                <Route path="/" exact render={() => 
                                                { return <HomePage /> }}                             
                />
                <Route path="/login" render={() => { return <FormPage signUp={false} />} } />
                <Route path="/register" component={FormPage} />
                <Route path="/search" render={({ location }) => <DisplayPage search={true} query={location.state ? location.state.query : '' } />} />
                <Route path="/movies" render={() => <DisplayPage popularMovies={true} />} />
                <Route path="/series" render={() => <DisplayPage topSeries={true} />} />
                <Route path="/episodes" render={() => <DisplayPage popularSeries={true} />} />
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouter;
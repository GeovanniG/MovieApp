import React, { Suspense } from 'react';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import loggedInConnect from '../stores/loggedIn';

// Code splitting
const Home = React.lazy(() => import('../components/Home/HomePage'));
const LoginForm = React.lazy(() => import('../components/Form/FormPage'));
const SignInForm = React.lazy(() => import('../components/Form/FormPage'));
const SearchDisplay = React.lazy(() => import('../components/Display/DisplayPage'));
const MoviesPopularDisplay = React.lazy(() => import('../components/Display/DisplayPage'));
const SeriesTopRatedDisplay = React.lazy(() => import('../components/Display/DisplayPage'));
const SeriesPopularDisplay = React.lazy(() => import('../components/Display/DisplayPage'));
const User = React.lazy(() => import('../components/User/UserPage'));

const Routes = ({ location, loggedIn }) => {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact>
              <Home />
          </Route>

          <Route path="/user">
            {loggedIn ? <User /> : <Redirect to="/" />}
          </Route>

          <Route path="/login" >
            {loggedIn ? <Redirect to="/" /> : <LoginForm signUp={false} />}
          </Route>
          <Route path="/register">
            {loggedIn ? <Redirect to="/" /> : <SignInForm signUp={true} />}
          </Route>

          <Route path="/search">
            <SearchDisplay search={true} query={location.state ? location.state.query : '' } />
          </Route>
          <Route path="/moviespop">
            {/* Different components must be used for /moviespop, /series... in order to obtain new cards components on each page  */}
            {/* <AsyncDisplay popularMovies={true} /> */}
            <MoviesPopularDisplay popularMovies={true} />
          </Route>
          <Route path="/seriestop">
            {/* <AsyncDisplay topSeries={true} /> */}
            <SeriesTopRatedDisplay topSeries={true} />
          </Route>
          <Route path="/seriespop">
            {/* <AsyncDisplay popularSeries={true} /> */}
            <SeriesPopularDisplay popularSeries={true} />
          </Route>
        </Switch>
      </Suspense>
  )
}

const mapStateToProps = ({loggedIn, id}) => {
  return {
      loggedIn,
      id
  };
}

const mapDispatchToProps = (dispathLoggedIn) => {
  return {}
}

export default loggedInConnect(mapStateToProps, mapDispatchToProps)(withRouter(Routes));
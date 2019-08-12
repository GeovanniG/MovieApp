import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import loggedInConnect from '../../stores/loggedIn'; 

const Nav = ({ history, loggedIn, dispatchLogout }) => {
    const [search, setSearch] = useState('');

    // Cannot use  because will cause infinite rerenders
    // useEffect(() => {
    //     if (!localStorage.getItem('token')) dispatchLogout();
    // }, [dispatchLogout])

    return (
        <nav className="nav">
            <NavLink to="/"
                exact className="nav__link nav__link-title" 
                activeClassName="nav__link--active" 
            >
                <span className="nav__link--yellow">Mo</span>
                <span className="nav__link--brown">Venue</span>
            </NavLink>
            
            <div className="nav__link-user">
                {loggedIn ? (
                    <>
                    <span onClick={dispatchLogout}>
                        <NavLink to="/" className="nav__link">
                            Logout
                        </NavLink>
                    </span>
                    </>
                    
                ) : (
                    <>
                        <NavLink to="/register" className="nav__link" activeClassName="nav__link--active">Register</NavLink>
                        <NavLink to="/login" className="nav__link" activeClassName="nav__link--active">Login</NavLink>
                    </>
                )}    
            </div>

            <div className="nav__link-search" onKeyPress={e => e.key === 'Enter' ? history.push('/search', { query: search }) : '' }>
                <input type="text" className="nav__link-search-input" value={search} onChange={(e) => setSearch(e.target.value)} />
                
                <NavLink to={{
                    pathname: "/search",
                    state: { query: search }
                    }} className="nav__link-search-icon" activeClassName="nav__link--active"
                >
                    <FaSearch />
                </NavLink>
            </div>

            <div className="nav__link-type">
                <NavLink to="/moviespop" className="nav__link" activeClassName="nav__link--active">Popular Movies</NavLink>
                <NavLink to="/seriestop" className="nav__link" activeClassName="nav__link--active">Top Rated Series</NavLink>
                <NavLink to="/seriespop" className="nav__link" activeClassName="nav__link--active">Popular Series</NavLink>
                {loggedIn && <NavLink to="/user" className="nav__link" activeClassName="nav__link--active">My Likes</NavLink> }
            </div>
        </nav>
    )
}


const mapStateToProps = ({ loggedIn }) => {
    return {
        loggedIn
    };
}

const mapDispatchToProps = (dispathLoggedIn) => {
    return {
        dispatchLogout: () => dispathLoggedIn({type: 'LOGOUT'})
    }
}

export default loggedInConnect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));
// export default withRouter(Nav);
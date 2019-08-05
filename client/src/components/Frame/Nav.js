import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const Nav = ({ history }) => {
    const [search, setSearch] = useState('');

    return (
        <nav className="nav">
            <NavLink to={{
                    pathname: "/",
                    // state: { loggedIn }
                }}
                exact className="nav__link nav__link-title" 
                activeClassName="nav__link--active" 
            >
                <span className="nav__link--yellow">Mo</span>
                <span className="nav__link--brown">Venue</span>
            </NavLink>
            
            <div className="nav__link-user">
                {true ? (
                    <>
                        <NavLink to="/register" className="nav__link" activeClassName="nav__link--active">Register</NavLink>
                        <NavLink to="/login" className="nav__link" activeClassName="nav__link--active">Login</NavLink>
                    </>
                ) : (
                    <NavLink to={{
                        pathname: "/",
                        // state: { loggedIn: false }
                        }} 
                        className="nav__link"
                    >
                        Logout
                    </NavLink>
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
                <NavLink to="/movies" className="nav__link" activeClassName="nav__link--active">Popular Movies</NavLink>
                <NavLink to="/series" className="nav__link" activeClassName="nav__link--active">Top Rated Series</NavLink>
                <NavLink to="/episodes" className="nav__link" activeClassName="nav__link--active">Popular Series</NavLink>
            </div>
        </nav>
    )
}

export default withRouter(Nav);
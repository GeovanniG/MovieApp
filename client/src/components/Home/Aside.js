import React from 'react';
import { Link } from 'react-router-dom';

const Aside = ({ className }) => {
    return (
        <aside className={`aside ${className}`}>
            <h2>Welcome</h2>
            <h3>Ratings Contributed</h3>
            <ul className="aside__list">
                <li className="aside__list-item">
                    <span className="aside__list-item-title">Likes:</span>
                    {/* <span className="aside__list-item-num">0</span> */}
                    <Link to={{
                        pathname: '/user',
                        hash: '#likes'
                        }} 
                        className="aside__list-item-link"
                    >
                        <button className="btn aside__list-item-btn">View Likes</button>
                    </Link>
                </li>
                <li className="aside__list-item">
                    <span className="aside__list-item-title">Dislikes:</span>
                    {/* <span className="aside__list-item-num">0</span> */}
                    <Link to={{
                        pathname: '/user',
                        hash: '#dislikes'
                        }} 
                        className="aside__list-item-link"
                    >
                        <button className="btn aside__list-item-btn">View Dislikes</button>
                    </Link>
                </li>
                <li className="aside__list-item">
                    <span className="aside__list-item-title">Favorites:</span>
                    {/* <span className="aside__list-item-num">0</span> */}
                    <Link to={{
                        pathname: '/user',
                        hash: '#favorites'
                        }} 
                        className="aside__list-item-link"
                    >
                        <button className="btn aside__list-item-btn">View Favorites</button>
                    </Link>
                </li>
            </ul>
        </aside>
    )
}

export default Aside;
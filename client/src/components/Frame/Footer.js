import React from 'react';
import { Link } from 'react-router-dom';
import logo from './moviedb.svg';

const Footer = () => {
    return (
        <footer className="footer">
            <section className="footer__column">
                <h2 className="footer__title footer__title--center">About MoVenue</h2>
                <p className="footer__text">MoVenu, a site dedicated to satisfying all your movie/tv needs.</p>
            </section>
            <section className="footer__column">
                <h2 className="footer__title">Site Info</h2>
                <ul className="footer__link-list">
                    <li className="footer__link-list-item"><Link className="footer__link" to="/">About Us</Link></li>
                    <li className="footer__link-list-item"><Link className="footer__link" to="/">Contact Us</Link></li>
                </ul>
                
            </section>
            <section className="footer__column">
                <h2 className="footer__title">Follow Me</h2>
                <ul className="footer__link-list">
                    <li className="footer__link-list-item"><a className="footer__link" href="https://github.com/GeovanniG">Github</a></li>
                    <li className="footer__link-list-item"><a className="footer__link" href="/">Twitter</a></li>
                </ul>
            </section>
            <section className="footer-icon-wrapper">
               <img src={logo} alt="movie-logo" className="footer-icon" />
            </section>
        </footer>
    )
}

export default Footer;
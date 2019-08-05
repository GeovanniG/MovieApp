import React from 'react';
import Nav from './Nav';
import Footer from './Footer';

const Frame = ({ children }) => {
  return (
    <div className="frame">
      <Nav />
      { children }
      <Footer />
    </div>
  )
}

export default Frame;
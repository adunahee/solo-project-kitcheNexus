import React from 'react';
import './Footer.css'

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const Footer = () => (
  <footer>
    <h2>Created By Anthony Dunahee </h2>
    
    <a href="https://www.edamam.com/"
      target="_blank"
      rel="noopener noreferrer">
      <img src="https://www.edamam.com/assets/img/small-logo.png" alt='Edamam Logo'></img>
      Powered By Edamam 
       </a>
  </footer>
);

export default Footer;

import React from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as Github } from '../../assets/github.svg';
import './styles.css';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="main-header">
    <Logo />
    <Link to="/">
    <div className="logo-text">
      <span className="logo-text-1">Big game</span>
      <span className="logo-text-2"> Survey</span>
    </div>
    </Link>
    <a className="gitHubLink" href="https://github.com/opapito/dspesquisa" target="_new">
      <Github className="gitHubLogo" />
    </a>
  </header>
);

export default Header;

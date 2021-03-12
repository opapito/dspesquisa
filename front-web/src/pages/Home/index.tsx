import React from 'react';
import './styles.css';
import { ReactComponent as ArrowIcon } from '../../assets/arrow.svg';
import { ReactComponent as GamerImage } from '../../assets/gamer.svg';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="home-container">
    <div className="home-text">
      <h1 className="home-text-title">
        Which games do you guys like most?
      </h1>
      <h3 className="home-text-subtitle">
        Click the button below and find out what games gamers are choosing!
      </h3>
      <Link to="/records">
        <div className="home-actions">
          <button className="home-btn">
            I want to know which they are
        </button>
          <div className="home-btn-icon">
            <ArrowIcon />
          </div>
        </div>
      </Link>
    </div>
    <GamerImage className="home-image" />
  </div>
)

export default Home;
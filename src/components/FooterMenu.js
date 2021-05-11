import React from 'react';
import { Link } from 'react-router-dom';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/FooterMenu.css';

function FooterMenu() {
  return (
    <div data-testid="footer" className="footer">
      <Link to="/bebidas">
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drink icon"
        />
      </Link>
      <Link to="/explorar">
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="search icon"
        />
      </Link>
      <Link to="/comidas">
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="meal icon"
        />
      </Link>
    </div>
  );
}

export default FooterMenu;

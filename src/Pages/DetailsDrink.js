import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../Context/Context';
import useFetch from '../hooks/useFetch';
import RecomendationCardDrinks from '../components/RecomendationCardDrinks';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../css/Button.css';
import useHandleFavorite from '../hooks/useHandleFavorite';

function DetailsDrink() {
  const { detailsRecipe, drinkStateButton, favoriteDrink } = useContext(RecipeContext);
  const [loading, setLoading] = useState(true);
  const { recipeDetailsAPI } = useFetch();
  const { handleFavDrink, drinkDidMount } = useHandleFavorite();
  const [spanHidden, setSpanHidden] = useState(false);

  const url = document.URL;
  const newUrlId = url.split('/')[4];
  const newUrlType = url.split('/')[3];

  useEffect(() => {
    recipeDetailsAPI(newUrlId, newUrlType)
      .then(() => setLoading(false));
  }, []);

  if (loading) {
    return (<div>Loading...</div>);
  }

  const { strCategory,
    strDrink,
    strDrinkThumb,
    strAlcoholic,
    strYoutube,
    strInstructions,
  } = detailsRecipe.drinks[0];

  const currentRecipe = {
    name: strDrink,
  };

  drinkDidMount(currentRecipe);

  const drink = detailsRecipe.drinks[0];
  const keysDrink = Object.keys(drink);
  const filterDrink = keysDrink
    .filter((key) => key.toLowerCase().includes('ingredient'));
  const filterMeasure = keysDrink.filter((key) => key
    .toLowerCase().includes('measure'));
  const allIngredients = filterDrink
    .map((item, index) => ({
      ingredient: drink[item], measure: drink[filterMeasure[index]],
    })).filter((item) => item.ingredient !== '' && item.ingredient !== null);

  function copyToClipBoard(text) {
    navigator.clipboard.writeText(text);
    setSpanHidden(true);
  }

  return (
    <div>
      <img src={ strDrinkThumb } data-testid="recipe-photo" alt={ strDrink } />
      <h1 data-testid="recipe-title">{strDrink}</h1>
      <button
        onClick={ () => copyToClipBoard(url) }
        type="button"
      >
        <img
          src={ shareIcon }
          alt="icone de cora????o, para favoritar receita"
          data-testid="share-btn"
        />
      </button>
      <span hidden={ !spanHidden }>Link copiado!</span>
      <button onClick={ () => handleFavDrink() } type="button">
        <img
          src={ favoriteDrink ? blackHeartIcon : whiteHeartIcon }
          alt="icone de cora????o, para favoritar receita"
          data-testid="favorite-btn"
        />
      </button>
      <p data-testid="recipe-category">{strCategory}</p>
      <p data-testid="recipe-category">{strAlcoholic}</p>
      <ul>
        {
          allIngredients && allIngredients.map((item, index) => (
            <li key={ item } data-testid={ `${index}-ingredient-name-and-measure` }>
              {
                `${index + 1} - ${item.ingredient}: ${item.measure}`
              }
            </li>))
        }
      </ul>
      <p data-testid="instructions">{strInstructions}</p>
      <video data-testid="video" width="100">
        <source src={ strYoutube } type="video/mp4" />
        <track default kind="captions" srcLang="en" src={ strYoutube } />
      </video>

      <RecomendationCardDrinks />
      <br />
      { drinkStateButton && (
        <Link to={ `/bebidas/${newUrlId}/in-progress` }>
          <button
            className="buttn-bottom"
            type="button"
            data-testid="start-recipe-btn"
          >
            Iniciar receita
          </button>
        </Link>
      )}
    </div>
  );
}

export default DetailsDrink;

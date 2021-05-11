import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('0');

  function dataVerify() {
    const minLength = 6;
    if (/[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i
      .test(email) && password.length > minLength) {
      return true;
    }
    return false;
  }

  function handleClick() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
  }

  return (
    <div>
      <label htmlFor="email">
        Email
        <input
          data-testid="email-input"
          type="input"
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="senha">
        Senha
        <input
          placeholder="Password"
          type="password"
          data-testid="password-input"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <Link to="/comidas">
        <button
          disabled={ !dataVerify() }
          onClick={ handleClick }
          type="submit"
          data-testid="login-submit-btn"
        >
          Entrar
        </button>
      </Link>
    </div>);
}

export default Login;

import React, { useState } from 'react';

export default function PasswordHook() {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`Password ${password}, Repeat Password ${repeatPassword}`)
  };

  const handlePasswordChange = (evt, callback) => {
    evt.preventDefault();
    callback(evt.target.value);
    isValid(password, repeatPassword);
  };

  const isValid = (password, repeatPassword) => {
    return password.length >= 10 && repeatPassword === password;
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Password:
        <input
          type="text"
          value={password}
          onChange={e => handlePasswordChange(e, setPassword)}
        />
      </label><br />
      <label>
        Repeat Password:
        <input
          type="text"
          value={repeatPassword}
          onChange={e => handlePasswordChange(e, setRepeatPassword)}
        />
      </label>
      <input type="submit" value="Submit" disabled={!isValid(password, repeatPassword)} />
    </form>
  );
}

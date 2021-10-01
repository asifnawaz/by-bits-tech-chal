import React, { useState } from 'react';
import axios from 'axios';
import { getToken, setUserSession } from './Utils/Common';

function Wireframe(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
   

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('https://api.bybits.co.uk/auth/token', {type:'USER_PASSWORD_AUTH', username: username.value, password: password.value },{headers:{'content-type': 'text/json','environment':'mock'}}).then(response => {
      setLoading(false);
      console.log(response.data);
      setUserSession(response.data.access_token, response.data.username);
      props.history.push('/userstory');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401 || error.response.status === 422) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
    <div>
      Login<hr/><br /><br />
      <div>
        Username<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Wireframe;
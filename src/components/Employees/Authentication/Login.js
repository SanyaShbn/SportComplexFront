import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import EmployeeTable from '../Employees/EmployeeTable.js';
import Snackbar from '@mui/material/Snackbar';

function Login() {
  const [user, setUser] = useState({
    user_login: '', 
    user_password: ''
  });
  const [isAuthenticated, setAuth] = useState(false);
  const [open, setOpen] = useState(false);
  
  const handleChange = (event) => {
    setUser({...user, [event.target.name] : event.target.value});
  }
  
  const login = () => {
    fetch('login', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(user)
    })
    .then(res => {
      const jwtToken = res.headers.get('Authorization');
      if (jwtToken !== null) {
        sessionStorage.setItem("jwt", jwtToken);
        setAuth(true);
      }
      else {
        setOpen(true);
      }
    })
    .catch(err => console.error(err))
  }

  if (isAuthenticated) {
    return <EmployeeTable />;
  }
  else {  
    return(
      <div>
        <Stack spacing={2} alignItems='center' mt={2}>
          <TextField 
            name="user_login"
            label="Username" 
            onChange={handleChange} />
          <TextField 
            type="password"
            name="user_password"
            label="Password"
            onChange={handleChange}/>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={login}>
              Login
          </Button>
        </Stack>
        <Snackbar 
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          message="Ошибка аутентификации: Неверный логин или пароль"
        />
      </div>
    );
  }
}

export default Login;

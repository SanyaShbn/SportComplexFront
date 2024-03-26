import { Close, Send } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Snackbar,
  Stack
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useValue } from '../../context/ContextProvider';
import GoogleOneTapLogin from './GoogleOneTapLogin';
import PasswordField from './PasswordField';
import { SERVER_URL } from '../../constants';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../MainPage/Dashboard';

const Login = () => {
  const {
    state: { openLogin },
    dispatch,
  } = useValue();
  const [title, setTitle] = useState('Login');
  const [isRegister, setIsRegister] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  let navigate = useNavigate();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_LOGIN' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // testing Loading
    dispatch({ type: 'START_LOADING' });

    setTimeout(() => {
      dispatch({ type: 'END_LOADING' });
    }, 6000);

    //testing Notification
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (password !== confirmPassword) {
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'error',
          message: 'Пароли не совпадают',
        },
      });
    }
  };

  useEffect(() => {
    isRegister ? setTitle('Регистрация') : setTitle('Аутентификация');
  }, [isRegister]);

  const [user, setUser] = useState({
    userLogin: '', 
    userPassword: ''
  });
  const [isAuthenticated, setAuth] = useState(false);
  const [open, setOpen] = useState(false);
  
  const handleChange = (event) => {
    setUser({...user, [event.target.name] : event.target.value});
  }
  
  const login = () => {
    console.log(JSON.stringify(user))
    fetch(SERVER_URL + '/login', {
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
    return navigate("dashboard");
  }
  else {  
    return(
      <div>
        <Stack spacing={2} alignItems='center' mt={2}>
          <TextField 
            name="userLogin"
            label="Username" 
            onChange={handleChange} />
          <TextField 
            type="password"
            name="userPassword"
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
          message="Login failed: Check your username and password"
        />
      </div>
    );
  }

//   const [user, setUser] = useState({
//     userLogin: '', 
//     userPassword: ''
//   });
//   const [isAuthenticated, setAuth] = useState(false);
  
//   const handleChange = (event) => {
//     setUser({...user, [event.target.name] : event.target.value});
//   }
  
//   const login = () => {
//     console.log("login...")
//     fetch(SERVER_URL + 'login',{
//       method: 'GET',
//       headers: { 'Content-Type':'application/json' },
//       body: JSON.stringify(user)
//     })
//     .then(res => {
//       const jwtToken = res.headers.get('Authorization');
//       if (jwtToken !== null) {
//         sessionStorage.setItem("jwt", jwtToken);
//           console.log(user);
//           setAuth(true);
//       }
//       else {
//         dispatch({ type: 'OPEN_LOGIN' });
//       }
//     })
//     .catch(err => console.error(err))
//   }

//   if (isAuthenticated) {
//     navigate('/dashboard');
//   }
//   else {  
//   return (
//     <Dialog open={openLogin} onClose={handleClose}>
//       <DialogTitle>
//         {title}
//         <IconButton
//           sx={{
//             position: 'absolute',
//             top: 8,
//             right: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//           onClick={handleClose}
//         >
//           <Close />
//         </IconButton>
//       </DialogTitle>
//       <form>
//         <DialogContent dividers>
//           <DialogContentText>
//             Пожалуйста, заполните следующие поля:
//           </DialogContentText>
//           {isRegister && (
//             <TextField
//               autoFocus
//               margin="normal"
//               variant="standard"
//               id="name"
//               label="Name"
//               type="text"
//               fullWidth
//               inputRef={nameRef}
//               inputProps={{ minLength: 2 }}
//               required
//             />
//           )}
//           <TextField
//             autoFocus={!isRegister}
//             margin="normal"
//             variant="standard"
//             id="email"
//             label="Email"
//             type="email"
//             fullWidth
//             inputRef={nameRef}
//             required
//             onChange={handleChange}
//           />
//           <PasswordField onChange={handleChange} {...{ passwordRef }} />
//           {isRegister && (
//             <PasswordField
//               passwordRef={confirmPasswordRef}
//               id="confirmPassword"
//               label="Подтверждение пароля"
//             />
//           )}
//         </DialogContent>
//         <DialogActions sx={{ px: '19px' }}>
//           <Button type="submit" variant="contained" endIcon={<Send />}  onClick={console.log("clicked")}>
//             Войти
//           </Button>
//         </DialogActions>
//       </form>
//       <DialogActions sx={{ justifyContent: 'left', p: '5px 24px' }}>
//         {isRegister
//           ? 'Do you have an account? Sign in now '
//           : "Don't you have an account? Create one now "}
//         <Button onClick={() => setIsRegister(!isRegister)}>
//           {isRegister ? 'Login' : 'Register'}
//         </Button>
//       </DialogActions>
//       <DialogActions sx={{ justifyContent: 'center', py: '24px' }}>
//         <GoogleOneTapLogin />
//       </DialogActions>
//     </Dialog>
//   );
// };
}

export default Login;

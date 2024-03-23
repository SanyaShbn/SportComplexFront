import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import { SERVER_URL } from '../../../constants.js';
import {FormControl, InputLabel, MenuItem} from '@mui/material';

function EditClientMembership(props) {

    const [membershipId, setMembershipId] = useState([]);
    const [clientId, setClientId] = useState([]);
    const [memberships, setMemberships] = useState([]);
    const [clients, setClients] = useState([]);
    const [open, setOpen] = useState(false);
  
    useEffect(() => {
      fetchClients();
      fetchMemberships();
    }, []);
  
    const fetchClients = () => {
      // const token = sessionStorage.getItem("jwt");
      fetch(SERVER_URL + '/api/view_clients', {
        // headers: { 'Authorization' : token }
      })
      .then(response => response.json())
      .then(data => setClients(data))
      .catch(err => console.error(err));    
    }
  
      const fetchMemberships = () => {
          // const token = sessionStorage.getItem("jwt");
          fetch(SERVER_URL + '/api/view_memberships', {
            // headers: { 'Authorization' : token }
          })
          .then(response => response.json())
          .then(data => setMemberships(data))
          .catch(err => console.error(err));    
    }


    const handleClickOpen = () => {  
        setOpen(true);
    }
      

  const handleClose = () => {
    setOpen(false);
  };
 
  const handleSave = () => {
    props.updateClientMembership(props.data.id, membershipId, clientId);
    handleClose();
  }

  return(
    <div>
      <button className='shine-button' variant="contained" onClick={handleClickOpen}>
        Обновить
      </button>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle className='dialog'>Обновление информации о продаже абонемента</DialogTitle>
          <DialogContent className='dialog'>
        <Stack spacing={2} mt={1}>
        <FormControl fullWidth>
            <InputLabel>Клиенты</InputLabel>
             <Select
             name='client'
             autoFocus variant="standard"
             label="Клиенты"
             onChange={(event) => { setClientId(event.target.value) }}>
             {clients.map(client => (
               <MenuItem key={client.idClient}
                value={client.idClient}>{client.surName + " " + client.firstName + " " + client.patrSurName + 
                " (" + client.phoneNumber + ")"}</MenuItem>
             ))}
            </Select>
            </FormControl>
            <FormControl fullWidth>
            <InputLabel>Абонементы</InputLabel>
             <Select
             name='client'
             autoFocus variant="standard"
             label="Абонементы"
             onChange={(event) => { setMembershipId(event.target.value) }}>
             {memberships.map(membership => (
               <MenuItem key={membership.idSportComplexMembership}
                value={membership.idSportComplexMembership}>{membership.name}</MenuItem>
             ))}
            </Select>
            </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
         <Button onClick={handleClose}>Отмена</Button>
         <Button onClick={handleSave}>Сохранить</Button>
      </DialogActions>
        </Dialog>            
    </div>
  );  
}

export default EditClientMembership;

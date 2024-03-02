
import React from 'react';
import './nav_main.css';
import logo from "./nav_images/logo.png";
import admin_logo from "./nav_images/admin_logo.png";
import employees from "./nav_images/employees.png";
import clients from "./nav_images/clients.png";
import employees_nav_logo from "./nav_images/employees_nav_logo.png";
import ball_image from "./nav_images/ball.png";
import handshake from "./nav_images/handshake.png";


function AdminMain() {

  const fetchAdminMain = () => {
    fetch('api/admin')
  }
  return (
    <div className='admin_main_body'>
       <style>
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
      </style>
    <div class="top">
    <div class="logout"></div>
           <div class="logo_div">
               <img src= {logo} class="logo"/>
           </div>
       <a class="logout_link">Выход</a>
     </div>
<div class="welcome_text">
   <p>
    Добро пожаловать
   </p>
   <p class="info">
    Система управления спортивно-оздоровительным комплексом
    <br/>
    <span>BestSports</span>
   </p>
</div>
<div class="about_us">
   <div class="element_1">
       <img src={admin_logo} class="admin_logos"/>
       <p class="image1_text">Администрирование</p>
   </div> 
   <div class="element_2">
       <img src={employees} class="admin_logos"/>
        <p class="image2_text">Работа с сотрудниками</p>
   </div>
   <div class="element_3">
       <img src={clients} class="admin_logos"/>
       <p class="image3_text">Работа с клиентами</p>
   </div>
</div>
<div class="nav_div_1">
   <img src={employees_nav_logo} class="link_logo"/>
   <a href="employees" class="navigation_element">Сотрудники</a>
</div> 
<div class="nav_div_2">
   <img src={handshake} class="link_logo"/>
   <a href="facilities" class="navigation_element">Клиенты</a>
</div>
<div class="nav_div_3">
   <img src={ball_image} class="link_logo"/>
   <a href="facilities" class="navigation_element">Сооружения комплекса</a>
</div>
</div>
  );
}

export default AdminMain;


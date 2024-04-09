import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import Main from './Main';
// import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import Login from './components/login/login';
// import Signup from './components/signuppages/SignUppages';
// import StepContext from './StepContext';
// import Redirect from './components/redirect/Redirect';
// import Category from './components/category/Category';
// import Exdetail from './components/exDetail/Exdetail';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },

//   {
//     path: "login",
//     element: <Login />,
//   },

//   {
//     path: "redirect",
//     element: <Redirect />,
//   },
//   {
//     path: "category",
//     element: <Category />,
//   },
//   {
//     path: "exdetail",
//     element: <Exdetail />,
//   },
//   {
//     path: "signup",
//     element: <StepContext> <Signup /></StepContext>,
//   }
// ])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

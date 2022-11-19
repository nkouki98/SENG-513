import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import { Feed } from './Feed';
import { AddPosts } from './AddPosts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <Router>
    //     <Routes>
    //         <Route exact path="/" element={<App />}></Route>
    //         <Route exact path="/feed" element={<Feed />}></Route>
    //         <Route exact path="/addpost" element={<AddPosts />}></Route>
            <React.StrictMode>
  

                <App />


            </React.StrictMode>
        // </Routes>
    // </Router>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
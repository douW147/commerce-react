import React from 'react';
import { createRoot } from 'react-dom/client';
import 'jquery';
import 'popper.js/dist/umd/popper';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';
import App from './App.jsx';
import { Provider } from "react-redux";
import store from "./store";


const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Provider store={store}><App/></Provider>);
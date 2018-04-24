// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

var getBase64 = function getBase64(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = function () {
        return resolve(reader.result);
      };
  
      reader.onerror = function (error) {
        return reject(error);
      };
    });
  };
  

  let el: Element | null = document.getElementById('root')
  if (el) {
    ReactDOM.render(<App />, el)
    registerServiceWorker()
  } else {
    console.log('Root not Found! Restart app')
  }
  
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom"
import App from './App';
import {Provider} from "react-redux";
import {persistStore} from "redux-persist"
import {PersistGate} from "redux-persist/integration/react";
import {store} from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
let persistor = persistStore(store);
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <PersistGate persistor={persistor}>
              <BrowserRouter>
                  <App/>
              </BrowserRouter>
          </PersistGate>
      </Provider>
  </React.StrictMode>
);

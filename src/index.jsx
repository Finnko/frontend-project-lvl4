// @ts-check
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import i18n from 'i18next';
import * as leoProfanity from 'leo-profanity';
import { initReactI18next } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import resources from './locales/index.js';
import App from './components/App/App.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { SocketIoProvider } from './contexts/SocketContext.jsx';
import store from './store';
import setupRollbar from '../config/rollbar.js';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

const init = async () => {
  leoProfanity.loadDictionary('ru');

  await i18n
    .use(initReactI18next)
    .init({
      resources: {
        ru: resources.ru,
      },
      fallbackLng: 'ru',
    });
};

const render = async () => {
  const rollbarConfig = setupRollbar();
  await init();

  const vdom = (
    <React.StrictMode>
      <Provider store={store}>
        <RollbarProvider config={rollbarConfig}>
          <ErrorBoundary>
            <SocketIoProvider>
              <AuthProvider>
                <BrowserRouter>
                  <App />
                  <ToastContainer />
                </BrowserRouter>
              </AuthProvider>
            </SocketIoProvider>
          </ErrorBoundary>
        </RollbarProvider>
      </Provider>
    </React.StrictMode>
  );

  ReactDOM.render(vdom, document.getElementById('chat'));
};

render();

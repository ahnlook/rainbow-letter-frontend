import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from 'App';
import store from 'store/index';
import './index.css';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root')!);

if ('service-worker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then((registration) => {
        console.log(
          'Service Worker registered with scope:',
          registration.scope
        );
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { TDSMobileAITProvider } from '@toss/tds-mobile-ait';

import App from 'App';
import store from 'store/index';
import './index.css';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root')!);

const isAitRuntime = () => {
  if (process.env.REACT_APP_ENABLE_AIT_PROVIDER !== 'true') {
    return false;
  }

  if (typeof window === 'undefined') {
    return false;
  }

  return Boolean(window.ReactNativeWebView);
};

const renderApp = () => {
  const app = (
    <Provider store={store}>
      <App />
    </Provider>
  );

  if (isAitRuntime()) {
    return <TDSMobileAITProvider>{app}</TDSMobileAITProvider>;
  }

  return app;
};

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

root.render(renderApp());

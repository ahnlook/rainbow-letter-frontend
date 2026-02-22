import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from 'App';
import store from 'store/index';
import { isAitRuntime } from 'utils/aitEnv';
import './index.css';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root')!);

const renderApp = async () => {
  const app = (
    <Provider store={store}>
      <App />
    </Provider>
  );

  if (isAitRuntime()) {
    const { TDSMobileAITProvider } = await import('@toss/tds-mobile-ait');
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

renderApp()
  .then((element) => {
    root.render(element);
  })
  .catch((error) => {
    console.error(
      'Failed to render AIT provider. Falling back to app only.',
      error
    );
    root.render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

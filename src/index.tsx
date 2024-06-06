import { createRoot } from 'react-dom/client';

import { Root } from './Root';
import { Provider } from 'react-redux';
import store from './store/store';
import i18next from 'i18next';

import global_en from './translations/en/global.json';
import global_ua from './translations/ua/global.json';
import { I18nextProvider } from 'react-i18next';

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: {
    en: {
      global: global_en,
    },
    ua: {
      global: global_ua,
    },
  },
});

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <I18nextProvider i18n={i18next}>
    <Provider store={store}>
      <Root />
    </Provider>
  </I18nextProvider>,
);

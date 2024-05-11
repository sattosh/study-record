import './App.css';
import { PageRouteHandler } from './components/layout/page_route_handler';
import { z } from 'zod';
import i18next from 'i18next';
import { zodI18nMap } from 'zod-i18n-map';
import translation from 'zod-i18n-map/locales/ja/zod.json';

i18next.init({
  lng: 'ja',
  resources: {
    ja: { zod: translation },
  },
});
z.setErrorMap(zodI18nMap);

function App() {
  return <PageRouteHandler />;
}

export default App;

// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import App from './App.tsx';
import '@assets/pub/css/common.css';
import '@assets/pub/css/primeng.css';
import '@assets/pub/css/splitter.css';
import { store } from '@common/store/store';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <CookiesProvider>
            <App />
        </CookiesProvider>
    </Provider>
  // <StrictMode>
  //
  // </StrictMode>
)

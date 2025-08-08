import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalStyle from './components/GlobalStyle';

// Redux Toolkit
import { Provider } from 'react-redux';
import { store } from '@/redux/store.ts';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <StrictMode>
            <GlobalStyle>
                <App />
            </GlobalStyle>
        </StrictMode>
    </Provider>,
);

import {
    Home,
    Login,
    Register,
    Forgot,
    NotFound,
    Vocabulary,
    CreateVocabulary,
    DetailVocabulary,
    EditVocabulary,
} from '@/pages';
import config from '@/config';

// Layouts
import { MainLayout, DefaultLayout } from '@/layouts';
import type { ComponentType, ReactNode } from 'react';

interface Route {
    path: string;
    component: React.ComponentType;
    layout?: ComponentType<{ children: ReactNode }> | null;
}

const publicRoutes: Route[] = [
    // { path: '/', component: Home, layout: MainLayout },
    // { path: config.routes.home, component: Home, layout: MainLayout },
    // --------- tạm lưu vocabulary làm home
    { path: '/', component: Vocabulary, layout: MainLayout },
    { path: config.routes.home, component: Vocabulary, layout: MainLayout },

    // auth
    { path: config.routes.login, component: Login, layout: DefaultLayout },
    { path: config.routes.register, component: Register, layout: DefaultLayout },
    { path: config.routes.forget, component: Forgot, layout: DefaultLayout },

    // vocabulary
    { path: config.routes.vocabulary, component: Vocabulary, layout: MainLayout },
    { path: config.routes.detailVocabulary, component: DetailVocabulary, layout: MainLayout },
    { path: config.routes.createVocabulary, component: CreateVocabulary, layout: MainLayout },
    { path: config.routes.editVocabulary, component: EditVocabulary, layout: MainLayout },

    // notFound
    { path: config.routes.notFound, component: NotFound, layout: MainLayout },
];

// require login
const privateRoutes: Route[] = [{ path: config.routes.home, component: Home, layout: MainLayout }];

// notFound
const notFoundRoutes: Route[] = [{ path: '*', component: NotFound, layout: MainLayout }];

export { publicRoutes, privateRoutes, notFoundRoutes };

import { Home, Login, Register, Forgot, NotFound } from '@/pages';
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
    { path: '/', component: Home, layout: MainLayout },
    { path: config.routes.home, component: Home, layout: MainLayout },

    { path: config.routes.login, component: Login, layout: DefaultLayout },
    { path: config.routes.register, component: Register, layout: DefaultLayout },
    { path: config.routes.forget, component: Forgot, layout: DefaultLayout },
];

// require login
const privateRoutes: Route[] = [{ path: config.routes.home, component: Home, layout: MainLayout }];

// notFound
const notFoundRoutes: Route[] = [{ path: '*', component: NotFound, layout: MainLayout }];

export { publicRoutes, privateRoutes, notFoundRoutes };

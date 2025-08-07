import { Home, Login, Register, Forgot } from '@/pages';
import config from '@/config';

// Layouts
import { MainLayout, DefaultLayout } from '@/layouts';

interface Route {
    path: string;
    component: React.ComponentType;
    layout?: React.ComponentType;
}

const privateRoutes: Route[] = [
    { path: config.routes.login, component: Login, layout: DefaultLayout },
    { path: config.routes.register, component: Register, layout: DefaultLayout },
    { path: config.routes.forget, component: Forgot, layout: DefaultLayout },
];

// require login
const publicRoutes: Route[] = [{ path: config.routes.home, component: Home, layout: MainLayout }];

export { publicRoutes, privateRoutes };

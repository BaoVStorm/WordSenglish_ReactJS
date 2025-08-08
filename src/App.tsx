// routes
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes, notFoundRoutes } from '@/routes';

// Layouts
import { DefaultLayout } from '@/layouts';

function App() {
    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Layout = route.layout || DefaultLayout;

                    const Page = route.component;

                    return (
                        <Route
                            key={`route-${index}`}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}

                {/* Route 404 */}
                {notFoundRoutes.map((route, index) => {
                    const Layout = route.layout || DefaultLayout;
                    const Page = route.component;

                    return (
                        <Route
                            key={`notFoundRoute-${index}`}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;

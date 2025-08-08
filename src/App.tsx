import BasicExample from '@/components/temp';

// Layouts
import { DefaultLayout } from '@/layouts';

// Redux hooks
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { increment } from '@/redux/slices/counterSlices';

// routes
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes, privateRoutes, notFoundRoutes } from '@/routes';

function App() {
    const dispatch = useAppDispatch();
    const count = useAppSelector((state) => state.counter.value);

    return (
        <Router>
            <div className="card">
                <button onClick={() => dispatch(increment())}>count is {count}</button>

                <BasicExample />
            </div>
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

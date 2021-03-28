import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './modules/top/home/home';
import CommonLayout from './modules/common-layout/common-layout.js';
import Login from './modules/account/components/login/login.js';
import React, { Suspense } from 'react';
import accountRoutes from './modules/account/account-router.js';
const routes = [
    {
        path: "/",
        exact: true,
        component: React.lazy(() => import('./modules/common-layout/common-layout')),
        routes: [
            {
                path: "/",
                component: React.lazy(() => import('./modules/top/home/home')),
            },

        ],
    },
    {
        path: "/account",
        component: React.lazy(() => import('./modules/common-layout/common-layout')),
        routes: accountRoutes,
         
    },
    // {
    //     path: "/account",
    //     component: CommonLayout,
    //     routes: [
    //        {
    //         path: "/account/login",
    //         component: Login
    //        },
    //        {
    //          path: "/account/signup",
    //          component: React.lazy(() => import('./modules/account/components/signup/signup'))
    //        }
    //     ]
    // }
    // accountRoutes

];
class AppRoutes extends React.Component {
    render() {
        return (

            <Router>
                <div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            {routes.map((route, i) => {
                                if (route.exact) {
                                    return <Route
                                        exact
                                        key={i}
                                        path={route.path}
                                        render={props => (
                                            <route.component {...props} routes={route.routes} />
                                        )}
                                    />
                                } else {
                                    return <Route
                                        key={i}
                                        path={route.path}
                                        render={props => (
                                            <route.component {...props} routes={route.routes} />
                                        )}
                                    />
                                }
                            })}
                        </Switch>
                    </Suspense>
                </div>
            </Router>
        )
    }
}
export default AppRoutes


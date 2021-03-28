import React from 'react';
 const accountRoutes = [
   {
      path: "/account/login",
      component: React.lazy(() => import('./components/login/login'))
     },
     {
       path: "/account/signup",
       component: React.lazy(() => import('./components/signup/signup'))
     }
 ];
export default accountRoutes
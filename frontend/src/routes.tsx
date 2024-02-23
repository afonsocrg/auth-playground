import { Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import Home from "@pages/Home";
import NotFound from "@pages/NotFound";
import Login from "@pages/Login";
import Profile from "@pages/Profile";
import Register from "@pages/Register";
import Tasks from "@pages/Tasks";
import { useAuth } from "@hooks/AuthContext";

// import { useCustomAuth, AuthenticationGuard } from './hooks/useCustomAuth'

function PrivateRoute() {
  const { isAuthenticated } = useAuth();
  console.log('isAuthenticated', isAuthenticated)
  if (isAuthenticated) {
    return <Outlet />;
  } else {
    // TODO: return back to previous page
    return <Navigate to="login" />;
  }
}

export function AppRoutes() {
  // prettier-ignore
  return (
    <Suspense fallback={'Loading...'}>
      <Routes>
        <Route path='/'>
          <Route index                  element={<Home/>                        } />
          <Route path='login'           element={<Login/>                       } />
          <Route path='register'        element={<Register/>                    } />
          <Route path='*'               element={<NotFound />                   } />
          <Route element={<PrivateRoute/>}>
            <Route path='profile'         element={<Profile/>                       } />
            <Route path='tasks'         element={<Tasks/>                       } />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}

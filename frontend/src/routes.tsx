import { Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import Home from "@pages/Home";
import NotFound from "@pages/NotFound";
import Login from "@pages/Login";
import Profile from "@pages/Profile";
import Register from "@pages/Register";
import Todos from "@pages/Todos";
import ApiDocs from "@pages/ApiDocs";
import PrivacyPolicy from "@pages/PrivacyPolicy";
import TermsAndConditions from "@pages/TermsAndConditions";
import { useAuth } from "@hooks/AuthContext";

function PrivateRoute() {
  const { isAuthenticated } = useAuth();
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
          <Route index                        element={<Home/>                        } />
          <Route path='docs'                  element={<ApiDocs/>                     } />
          <Route path='privacy_policy'        element={<PrivacyPolicy/>               } />
          <Route path='terms_and_conditions'  element={<TermsAndConditions/>          } />
          <Route path='login'                 element={<Login/>                       } />
          <Route path='register'              element={<Register/>                    } />
          <Route path='*'                     element={<NotFound />                   } />
          <Route element={<PrivateRoute/>}>
            <Route path='profile'         element={<Profile/>                   } />
            <Route path='todos'         element={<Todos/>                       } />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}

import {
  BrowserRouter as Router,
  Route,
  useNavigate,
  Routes,
} from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext, AuthProvider } from "@utils/AuthContext";
import { UserHome } from "./pages/UserHome";
import { SignIn } from "./pages/SignIn";
import { Layout } from "@components/Layout";
import { AdminHome } from "./pages/AdminHome";
import { SignUp } from "./pages/SignUp";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const { userToken } = useContext(AuthContext);
  useEffect(() => {
    if (!userToken) {
      navigate("/auth/signin");
    }
  }, [userToken, navigate]);

  return children;
};

const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const { userToken } = useContext(AuthContext);
  useEffect(() => {
    if (userToken) {
      navigate("/");
    }
  }, [userToken, navigate]);

  return children;
};

const HomePage = () => {
  const { isAdmin } = useContext(AuthContext);
  useEffect(() => {
    if (isAdmin) {
      console.log(isAdmin, "admin");
    }
  }, [isAdmin]);
  return isAdmin ? <AdminHome /> : <UserHome />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/auth/signin/*"
            element={
              <AuthRoute>
                <Routes>
                  <Route index element={<SignIn />} />
                </Routes>
              </AuthRoute>
            }
          />

          <Route
            path="/auth/signup/*"
            element={
              <AuthRoute>
                <Routes>
                  <Route index element={<SignUp />} />
                </Routes>
              </AuthRoute>
            }
          />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                  </Route>
                </Routes>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

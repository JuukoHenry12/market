import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/profile/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PageProtected from "./components/PageProtected";
import Spinner from "./components/Spinner";
import { useSelector } from "react-redux";
function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <BrowserRouter>
      {loading && <Spinner />}
      <Routes>
        <Route
          path="/"
          element={
            <PageProtected>
              <Home />
            </PageProtected>
          }
        />
        <Route
          path="/profile"
          element={
            <PageProtected>
              <Profile />
            </PageProtected>
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./modules/home/Home";
import Details from "./modules/Details/Details";
import NotFound from "./components/NotFound";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Signin from "./modules/Auth/pages/Signin/Signin";
import Signup from "./modules/Auth/pages/Signup/Signup";
import useProvider from "./contexts/UserContext/UserContext";
import UserProvider from "./contexts/UserContext/UserContext";
import ProtectedRoute from "./routers/ProtectedRoute/ProtectedRoute";
import AdminMovie from "./modules/AdminMovie/AdminMovie";
import AdminLayout from "./layouts/AdminLayout";
import UserManagement from "./modules/AdminMovie/User/UserManagement/UserManagement";
import TicketMovie from "./modules/TicketMovie/TicketMovie";
import AdminProtectedMovieRoute from "./routers/AdminProtectedMovieRoute";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="movies/:movieId" element={<Details />} />

            <Route element={<ProtectedRoute />}>
              <Route path="tickets/:showtimeId" element={<TicketMovie />} />
            </Route>
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-up" element={<Signup />} />
          </Route>

          {/* Admin */}
          <Route element={<AdminProtectedMovieRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              {/* <Route  element={<AdminMovie />} /> */}
              <Route path="movies" index element={<AdminMovie />} />
              <Route path="users" element={<UserManagement />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

import { SWRConfig } from "swr";
import { swrFetcher } from "./api";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./pages/PrivateRoute";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Projects from "./pages/Projects";

export default function AllRoutes() {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        fetcher: swrFetcher,
        revalidateFirstPage: false,
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
          if (retryCount >= 10) {
            return;
          }

          return setTimeout(() => revalidate({ retryCount }), 15000);
        },
      }}
    >
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={5000} theme="dark" />
    </SWRConfig>
  );
}

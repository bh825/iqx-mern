import { SWRConfig } from "swr";
import { swrFetcher } from "./api";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./pages/PrivateRoute";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";
import Dashboard from "./pages/Dashboard";

export default function routes() {
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
          <Route element={<Main />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </SWRConfig>
  );
}

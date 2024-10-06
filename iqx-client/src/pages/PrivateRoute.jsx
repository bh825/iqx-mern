import { useUserStore } from "@/store/user";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const data = useUserStore((state) => state.user);
  return data?.tk ? <Outlet /> : <Navigate to="/sign-in" />;
}

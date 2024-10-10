import Loader from "@/components/common/Loader";
import { Navigate, useLocation } from "react-router-dom";
import useSWR from "swr";
import ProjectDetails from "./ProjectDetails";

export default function Projects() {
  const { state } = useLocation();
  const { data, isLoading, error, mutate } = useSWR(
    state?._id && `/projects/${state?._id}`
  );
  const {
    data: clauses,
    isLoading: clausesLoading,
    error: clausesError,
  } = useSWR("/clauses");

  if (isLoading || clausesLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (error || clausesError) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p>There is problem with your peoject, Please try after some time.</p>
      </div>
    );
  }
  if (!data.data) {
    return <Navigate to="/" />;
  }

  return (
    <ProjectDetails
      clauses={clauses?.data}
      project={data?.data}
      project_id={state?._id}
      mutate={mutate}
    />
  );
}

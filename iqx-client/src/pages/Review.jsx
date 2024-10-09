import { useLocation } from "react-router-dom";
import useSWR from "swr";

export default function Review() {
  const { state } = useLocation();
  const { data: clauses } = useSWR("/clauses");

  return (
    <div className="grid h-screen w-screen grid-rows-[70px_auto_1fr_auto_auto]">
      <div className="grid items-center gap-6 border-b bg-white px-12 shadow">
        <p className="text-5xl font-bold tracking-wide">IQX</p>
      </div>
      <div>
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 p-4">
          <p className="text-xl font-semibold">{state?.Domain}</p>
          <p className="text-xl font-semibold">{state?.Framework}</p>
        </div>
        <p className="text-center font-medium">{state?.Control}</p>
      </div>
    </div>
  );
}

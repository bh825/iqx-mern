import Domains from "@/components/common/Domains";
import Loader from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import useSWR from "swr";

export default function Projects() {
  const { state } = useLocation();
  const { data, isLoading, error } = useSWR(
    state?._id && `/projects/${state?._id}`
  );

  const { data: clauses } = useSWR("/clauses");

  const sections = clauses?.data
    ?.map((a) => a.Section)
    ?.filter((a, i, arr) => arr.indexOf(a) === i);

  console.log(clauses);

  const getContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (error || !data?.data?._id) {
      return <p>This is not a valid link. Please, select another project.</p>;
    }
  };
  return (
    <div className="grid h-screen w-screen grid-cols-[22%_1fr] grid-rows-[70px_1fr] bg-[#333333]">
      <div
        className="z-10 col-span-2 grid items-center gap-6 border-b bg-white px-12 shadow"
        style={{
          gridTemplateColumns: `auto 1fr repeat(${sections?.length || 0}, auto) 1fr`,
        }}
      >
        <p className="text-5xl font-bold tracking-wide">IQX</p>
        <div></div>
        {sections?.map((a, i) => (
          <Button
            variant="outline"
            className="rounded-full border-black/20 px-12 font-semibold shadow"
            key={i}
          >
            {a}
          </Button>
        ))}
        <div></div>
      </div>
      <div className="grid h-full grid-rows-[auto_1fr_auto_1fr] overflow-auto bg-[#001F76] p-4">
        <p className="font-bold text-white">Select Domain</p>
        <Domains
          placeholder="Search Domain..."
          domains={clauses?.data
            ?.map((a) => a.Domain)
            ?.filter((a, i, arr) => arr.indexOf(a) === i)}
        />
        <p className="font-bold text-white">Select Framework</p>
        <Domains
          placeholder="Search Framework..."
          domains={clauses?.data
            ?.map((a) => a.Framework)
            ?.filter((a, i, arr) => arr.indexOf(a) === i)}
        />
      </div>
      <div className="bg-white">{getContent()}</div>
    </div>
  );
}

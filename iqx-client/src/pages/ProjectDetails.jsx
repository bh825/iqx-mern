import Domains from "@/components/common/Domains";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Review from "./Review";

export default function ProjectDetails({ clauses }) {
  const [domain, setDomain] = useState([]);
  const [framework, setFrameWork] = useState([]);
  const [status, setStatus] = useState("Planning");
  const [open, setOpen] = useState();
  const controls = clauses
    ?.filter(
      (a) => domain?.includes(a?.domain) && framework.includes(a?.framework)
    )
    .filter(
      (a, i, arr) =>
        arr.findIndex(
          (b) =>
            b.domain === a.domain &&
            a.framework === b.framework &&
            a.control === b.control
        ) === i
    );

  return (
    <div className="grid h-screen w-screen grid-cols-[22%_1fr] grid-rows-[70px_1fr] bg-[#333333]">
      <div
        className="z-10 col-span-2 grid items-center gap-6 border-b bg-white px-12 shadow"
        style={{
          gridTemplateColumns: `auto 1fr repeat(4, auto) 1fr`,
        }}
      >
        <p className="text-5xl font-bold tracking-wide">IQX</p>
        <div></div>
        {[
          "Planning",
          "Initial Days",
          "Fully Operational",
          "Declining Phase",
        ]?.map((a, i) => (
          <Button
            variant="outline"
            className={`rounded-full border-black/20 px-12 font-semibold shadow ${status === a ? "bg-[#001F76] text-white hover:bg-[#001F76] hover:text-white" : ""}`}
            key={i}
            onClick={() => setStatus(a)}
          >
            {a}
          </Button>
        ))}
        <div></div>
      </div>
      <div className="grid h-full grid-rows-[auto_1fr_auto_1fr] overflow-auto bg-[#001F76] p-4">
        <p className="font-bold text-white">Select Domain</p>
        <Domains
          placeholder="Domain"
          domain={domain}
          setData={(checked, a) => {
            if (checked === true) {
              setDomain((prev) => [...prev, a]);
            } else {
              setDomain((prev) => prev.filter((b) => b !== a));
            }
          }}
          domains={clauses
            ?.map((a) => a.domain)
            ?.filter((a, i, arr) => arr.indexOf(a) === i)}
        />
        <p className="font-bold text-white">Select Framework</p>
        <Domains
          placeholder="Framework"
          domain={framework}
          setData={(checked, a) => {
            if (checked === true) {
              setFrameWork((prev) => [...prev, a]);
            } else {
              setFrameWork((prev) => prev.filter((b) => b !== a));
            }
          }}
          domains={clauses
            ?.filter((a) => domain.includes(a.domain))
            ?.map((a) => a.framework)
            ?.filter((a, i, arr) => arr.indexOf(a) === i)}
        />
      </div>
      <div className="relative h-full overflow-auto bg-white">
        <p className="sticky top-0 bg-white p-4 text-center text-2xl font-semibold text-black/60">
          Control Descriptions
        </p>
        <div>
          {controls?.map((a, i) => (
            <div key={i} className="border-b p-6">
              <div className="grid grid-cols-[auto_auto_auto_auto_1fr] items-center gap-4">
                <p className="bg-[#001F76] p-1 leading-none text-white">
                  {i + 1}.
                </p>
                <p>{a.control}</p>
                <p className="rounded-full bg-gray-200 px-3 py-2 leading-none">
                  {a.domain}
                </p>
                <p className="rounded-full bg-gray-200 px-3 py-2 leading-none">
                  {a.framework}
                </p>
                <div></div>
              </div>
              <div className="grid justify-end">
                <Button
                  className="h-8 rounded-full bg-[#001F76]"
                  onClick={() => setOpen(a)}
                >
                  Compliant Checks
                </Button>
                <div className="mx-auto grid grid-cols-[repeat(5,12px)] gap-4 pt-2">
                  {Array.from({ length: 5 }).map((a, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-full bg-[#4ECB71]"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {open && <Review open={open} setOpen={setOpen} clauses={clauses} />}
    </div>
  );
}

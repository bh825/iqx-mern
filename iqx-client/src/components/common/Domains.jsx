import { Input } from "../ui/input";

export default function Domains({ placeholder, domains }) {
  return (
    <div className="overflow-auto rounded-lg bg-white pb-2 shadow-lg">
      <div className="sticky top-0 bg-white px-2 py-2">
        <Input
          className="rounded-full bg-[#D9D9D945] shadow-[0px_1px_1px_0px_#00000040_inset]"
          placeholder={placeholder}
        />
      </div>
      <div className="space-y-2 px-6">
        {domains?.map((a, i) => (
          <div key={i}>{a}</div>
        ))}
      </div>
    </div>
  );
}

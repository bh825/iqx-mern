import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function Domains({ placeholder, domains, setData }) {
  return (
    <div className="overflow-auto rounded-lg bg-white pb-2 shadow-lg">
      <div className="sticky top-0 bg-white px-2 pb-4 pt-2">
        <Input
          className="rounded-full bg-[#D9D9D945] shadow-[0px_1px_1px_0px_#00000040_inset]"
          placeholder={`Search ${placeholder}...`}
        />
      </div>
      <div className="space-y-3 px-6">
        {domains?.length ? (
          domains?.map((a, i) => (
            <div
              key={i}
              className="grid grid-cols-[auto_1fr] items-center gap-4"
            >
              <Checkbox
                id={`${a}${i}`}
                onCheckedChange={(checked) => {
                  if (checked === true) {
                    setData((prev) => [...prev, a]);
                  } else {
                    setData((prev) => prev.filter((b) => b !== a));
                  }
                }}
              />
              <Label htmlFor={`${a}${i}`}>{a}</Label>
            </div>
          ))
        ) : (
          <p className="text-center">No {placeholder} available</p>
        )}
      </div>
    </div>
  );
}

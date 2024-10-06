import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <div className="grid h-screen w-screen grid-cols-[20%_1fr] grid-rows-[70px_1fr] gap-y-4 bg-white">
      <div className="row-span-2 border-2"></div>
      <div className="border-2"></div>
      <div className="overflow-auto px-4">
        <Outlet />
      </div>
    </div>
  );
}

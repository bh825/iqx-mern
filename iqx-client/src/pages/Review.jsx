import Api from "@/api";
import DragItem from "@/components/common/DropItem";
import DropZone from "@/components/common/DropZone";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Review({ open, setOpen, clauses }) {
  const [droppedItems, setDroppedItems] = useState([]);
  const handleDrop = (item) => {
    console.log(item);

    setDroppedItems((prevItems) =>
      [...prevItems, item]?.filter((a, i, arr) => arr.indexOf(a) === i)
    );
  };

  // const handleRemoveItem = (index) => {
  //   const updatedItems = [...droppedItems];
  //   updatedItems.splice(index, 1);
  //   setDroppedItems(updatedItems);
  // };

  const adddata = async (question, marks) => {
    await Api.post("/add-review", { ...open, question, marks });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="bottom">
        <SheetHeader className="grid grid-cols-[auto_auto_auto_1fr] items-center gap-4">
          <SheetTitle className="text-xl">{open?.control}</SheetTitle>
          <p className="rounded-full bg-gray-200 px-3 py-2 text-sm leading-none">
            {open?.domain}
          </p>
          <p className="rounded-full bg-gray-200 px-3 py-2 text-sm leading-none">
            {open?.framework}
          </p>
        </SheetHeader>
        <DndProvider backend={HTML5Backend}>
          <div className="mx-auto grid max-w-7xl grid-cols-2 items-stretch py-12">
            <div className="border-r-2 border-black px-[5%] xl:px-[10%]">
              <h2 className="pb-4 text-center font-bold underline underline-offset-4">
                Available Control Checks
              </h2>
              <div className="space-y-3">
                {clauses
                  .filter(
                    (a) =>
                      a?.domain == open?.domain &&
                      a?.framework === open?.framework &&
                      a?.control === open?.control
                  )
                  .map((a, i) => (
                    <DragItem name={a?.question} key={i} />
                  ))}
              </div>
            </div>
            <DropZone onDrop={handleDrop} length={droppedItems?.length}>
              <h2 className="text-center font-bold underline underline-offset-4">
                Selected Control Checks
              </h2>
              {droppedItems.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_auto] items-center rounded-full border bg-[#00FF1A40] px-4 py-3 leading-none"
                >
                  <p>{item.name}</p>
                  <HoverCard openDelay={200}>
                    <HoverCardTrigger asChild>
                      <Button className="h-min items-center gap-2 rounded-full bg-[#001F76] py-1 text-sm">
                        Drop Down
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_3_9)">
                            <path
                              d="M0 3L6 9L12 3"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_3_9">
                              <rect width="12" height="12" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-min space-y-2 bg-white p-4 shadow-2xl">
                      <Button
                        onClick={() => adddata(item.name, "Fully Compliant")}
                        className="h-min w-full rounded-full bg-green-300 px-3 py-1.5 text-black hover:bg-green-600"
                      >
                        Fully Compliant
                      </Button>
                      <Button
                        onClick={() => adddata(item.name, "Partial Compliant")}
                        className="h-min rounded-full bg-amber-300 px-3 py-1.5 text-black hover:bg-amber-600"
                      >
                        Partial Compliant
                      </Button>
                      <Button
                        onClick={() => adddata(item.name, "Non Compliant")}
                        className="h-min w-full rounded-full bg-red-300 px-3 py-1.5 text-black hover:bg-red-600"
                      >
                        Non Compliant
                      </Button>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              ))}
            </DropZone>
          </div>
        </DndProvider>
        <div className="mx-auto w-min py-8">
          <Button className="h-full rounded-2xl bg-[#001F76] px-5 py-3 text-2xl font-bold">
            Add Control Check
          </Button>
        </div>
        <div className="grid grid-cols-[auto_1fr_auto] items-end">
          <Button
            className="rounded-2xl bg-[#001F76] px-8 py-2 text-xl font-bold"
            onClick={() => setOpen()}
          >
            Back
          </Button>
          <div></div>
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 rounded-3xl bg-[url('/iriswave.png')] bg-cover bg-center p-4">
            <div>
              <p className="font-bold text-white">Partial Compliant</p>
              <p className="pt-1 text-center text-5xl font-bold text-white">
                20
              </p>
            </div>
            <div className="border-l-2"></div>
            <div>
              <p className="font-bold text-white">Non Compliant</p>
              <p className="pt-1 text-center text-5xl font-bold text-white">
                20
              </p>
            </div>
            <div className="border-l-2"></div>
            <div>
              <p className="font-bold text-white">Fully Compliant </p>
              <p className="pt-1 text-center text-5xl font-bold text-white">
                20
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

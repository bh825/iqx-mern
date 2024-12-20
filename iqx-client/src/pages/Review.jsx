import Api from "@/api";
import AddControlCheck from "@/components/common/AddControlCheck";
import DragItem from "@/components/common/DropItem";
import DropZone from "@/components/common/DropZone";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { MessageCirclePlus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AddReview from "./AddReview";

export default function Review({ open, setOpen, clauses, project, mutate }) {
  const [observation, setObservation] = useState();
  const [review, setReview] = useState();
  const [droppedItems, setDroppedItems] = useState(
    project?.clauses_data?.filter(
      (a) =>
        a?.domain == open?.domain &&
        a?.framework === open?.framework &&
        a?.control === open?.control &&
        a?.status === open?.status
    )
  );
  const handleDrop = (item) => {
    setDroppedItems((prevItems) => {
      return [...prevItems, item]?.filter(
        (a, i, arr) => arr.findIndex((b) => b.question === a.question) === i
      );
    });
  };

  // const handleRemoveItem = (index) => {
  //   const updatedItems = [...droppedItems];
  //   updatedItems.splice(index, 1);
  //   setDroppedItems(updatedItems);
  // };

  useEffect(() => {
    setDroppedItems(
      project?.clauses_data?.filter(
        (a) =>
          a?.domain == open?.domain &&
          a?.framework === open?.framework &&
          a?.control === open?.control &&
          a?.status === open?.status
      )
    );
  }, [open, project?.clauses_data]);

  const adddata = async (question, marks) => {
    await Api.post("/add-review", { ...open, question, marks });
    mutate();
  };

  const addRisk = async (question, risk) => {
    await Api.post("/add-review", { ...open, question, risk });
    mutate();
  };

  return (
    <>
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
            <div className="mx-auto grid max-w-7xl grid-cols-[45%_1fr] items-stretch py-12">
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
                      <DragItem name={a} key={i} />
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
                    className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-2 rounded-full border bg-[#00FF1A40] px-4 py-3 leading-none"
                  >
                    <p>{item.question}</p>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button className="h-min items-center gap-2 rounded-full bg-[#001F76] py-1 text-sm">
                          {item?.marks || "Drop Down"}
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
                      </PopoverTrigger>
                      <PopoverContent className="w-min space-y-2 bg-white p-4 shadow-2xl">
                        <Button
                          onClick={() =>
                            adddata(item.question, "Fully Compliant")
                          }
                          className="h-min w-full rounded-full bg-green-300 px-3 py-1.5 text-black hover:bg-green-600"
                        >
                          Fully Compliant
                        </Button>
                        <Button
                          onClick={() =>
                            adddata(item.question, "Partial Compliant")
                          }
                          className="h-min rounded-full bg-amber-300 px-3 py-1.5 text-black hover:bg-amber-600"
                        >
                          Partial Compliant
                        </Button>
                        <Button
                          onClick={() =>
                            adddata(item.question, "Non Compliant")
                          }
                          className="h-min w-full rounded-full bg-red-300 px-3 py-1.5 text-black hover:bg-red-600"
                        >
                          Non Compliant
                        </Button>
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button className="h-min items-center gap-2 rounded-full bg-[#001F76] py-1 text-sm">
                          {item?.risk || "Drop Down"}
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
                      </PopoverTrigger>
                      <PopoverContent className="w-min space-y-2 bg-white p-4 shadow-2xl">
                        <Button
                          onClick={() => addRisk(item.question, "Low")}
                          className="h-min w-full rounded-full bg-green-300 px-3 py-1.5 text-black hover:bg-green-600"
                        >
                          Low
                        </Button>
                        <Button
                          onClick={() => addRisk(item.question, "Medium")}
                          className="h-min rounded-full bg-amber-300 px-3 py-1.5 text-black hover:bg-amber-600"
                        >
                          Medium
                        </Button>
                        <Button
                          onClick={() => addRisk(item.question, "High")}
                          className="h-min w-full rounded-full bg-red-300 px-3 py-1.5 text-black hover:bg-red-600"
                        >
                          High
                        </Button>
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          className="p-0 hover:bg-transparent"
                        >
                          <MessageCirclePlus />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-min space-y-2 bg-white p-4 shadow-2xl">
                        <Button
                          onClick={() =>
                            setObservation({
                              ...open,
                              question: item?.question,
                            })
                          }
                          className="h-min w-full rounded-full bg-green-300 px-3 py-1.5 text-black hover:bg-green-600"
                        >
                          Add Observation
                        </Button>
                        <Button
                          onClick={() =>
                            setReview({ ...open, question: item?.question })
                          }
                          className="h-min w-full rounded-full bg-green-300 px-3 py-1.5 text-black hover:bg-green-600"
                        >
                          Add Review
                        </Button>
                      </PopoverContent>
                    </Popover>
                    <Button
                      variant="icon"
                      className="p-0"
                      onClick={async () => {
                        if (item?._id) {
                          await Api.put("/add-review", {
                            ...item,
                            project_id: open?.project_id,
                          });
                          mutate();
                        }
                      }}
                    >
                      <X />
                    </Button>
                  </div>
                ))}
              </DropZone>
            </div>
          </DndProvider>
          <div className="mx-auto w-min py-8">
            <AddControlCheck openData={open} mutate={mutate} />
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
                  {
                    project?.clauses_data?.filter(
                      (a) => a.marks === "Partial Compliant"
                    )?.length
                  }
                </p>
              </div>
              <div className="border-l-2"></div>
              <div>
                <p className="font-bold text-white">Non Compliant</p>
                <p className="pt-1 text-center text-5xl font-bold text-white">
                  {
                    project?.clauses_data?.filter(
                      (a) => a.marks === "Non Compliant"
                    )?.length
                  }
                </p>
              </div>
              <div className="border-l-2"></div>
              <div>
                <p className="font-bold text-white">Fully Compliant </p>
                <p className="pt-1 text-center text-5xl font-bold text-white">
                  {
                    project?.clauses_data?.filter(
                      (a) => a.marks === "Fully Compliant"
                    )?.length
                  }
                </p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      {observation && (
        <AddReview
          open={observation}
          setOpen={setObservation}
          mutate={mutate}
          reason="observation"
        />
      )}
      {review && (
        <AddReview
          open={review}
          setOpen={setReview}
          mutate={mutate}
          reason="review"
        />
      )}
    </>
  );
}

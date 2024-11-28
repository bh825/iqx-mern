import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import * as xlsx from "xlsx";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Api from "@/api";

export default function AddXlsx({ open, setOpen, mutate }) {
  const [data, setData] = useState();
  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetsData = {};
        workbook.SheetNames.forEach((sheetName) => {
          const worksheet = workbook.Sheets[sheetName];
          sheetsData[sheetName] = xlsx.utils.sheet_to_json(worksheet);
        });
        const finalData = Object.keys(sheetsData)
          .filter((a) => a?.toLowerCase() !== "history")
          .map((a) => sheetsData[a].map((b) => ({ ...b, status: a })))
          .flat();
        setData(finalData);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const changes = data?.filter((a) => {
    const stored = open?.clauses_data?.find((b) =>
      ["status", "domain", "framework", "control", "question"].every(
        (c) => a?.[c] === b?.[c]
      )
    );
    if (!stored) {
      return true;
    }
    if (
      ["marks", "risk", "review", "observation"].some(
        (c) => a?.[c] !== stored?.[c]
      )
    ) {
      return true;
    }
    return false;
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={changes?.length ? "sm:max-w-[725px]" : "sm:max-w-[425px]"}
      >
        <div>
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
            <DialogDescription>Add chnages in {open?.name}.</DialogDescription>
          </DialogHeader>

          {(() => {
            if (changes?.length) {
              return (
                <>
                  <div className="py-4">
                    <div className="max-h-[50vh] space-y-4 overflow-auto">
                      {changes?.map((a, i) => {
                        const stored = open?.clauses_data?.find((b) =>
                          [
                            "status",
                            "domain",
                            "framework",
                            "control",
                            "question",
                          ].every((c) => a?.[c] === b?.[c])
                        );
                        return (
                          <div
                            key={i}
                            className="grid grid-cols-[auto_auto_auto_1fr] items-start gap-2 rounded-lg border p-4"
                          >
                            <div>
                              <p>{a?.question}</p>
                              <p className="text-sm text-gray-500">
                                {a?.control}
                              </p>
                            </div>
                            <p className="rounded-full bg-gray-200 px-2 py-1 text-sm leading-none">
                              {a.domain}
                            </p>
                            <p className="rounded-full bg-gray-200 px-2 py-1 text-sm leading-none">
                              {a.framework}
                            </p>
                            <div></div>
                            <div className="col-span-4 rounded-lg bg-green-50 p-3 text-green-800">
                              <span className="text-black/25">Changes IN:</span>{" "}
                              {["marks", "risk", "review", "observation"]
                                ?.filter((b) => a?.[b] !== stored?.[b])
                                .join(", ")}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={async () => {
                        await Promise.all(
                          changes?.map((a) =>
                            Api.post("/add-review", {
                              ...a,
                              project_id: open?._id,
                            })
                          )
                        );

                        setOpen(false);
                        mutate();
                      }}
                    >
                      Save changes
                    </Button>
                  </DialogFooter>
                </>
              );
            }
            if (data && !changes?.length) {
              return (
                <p className="mt-4 rounded-lg bg-red-100 py-4 text-center font-semibold text-red-900">
                  There is no any chnages in file.{" "}
                </p>
              );
            }
            return (
              <div className="grid gap-4 py-8">
                <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
                  <p className="capitalize">Add File</p>
                  <Input
                    className="col-span-3"
                    type="file"
                    onChange={readUploadFile}
                  />
                </div>
              </div>
            );
          })()}
        </div>
      </DialogContent>
    </Dialog>
  );
}

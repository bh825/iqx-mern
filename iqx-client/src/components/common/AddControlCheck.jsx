import { Form, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Api from "@/api";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const schema = z.object({
  question: z
    .string({ required_error: "Project name is required." })
    .min(3, "Project name must have 3 characters"),
  marks: z.string(),
  risk: z.string().optional(),
});

export default function AddControlCheck({ mutate, openData }) {
  const [open, setOpen] = useState();
  const {
    register,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm({ resolver: zodResolver(schema) });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-full rounded-2xl bg-[#001F76] px-5 py-3 text-2xl font-bold">
          Add Control Check
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form
          control={control}
          onSubmit={async ({ data }) => {
            await Api.post("/add-review", { ...openData, ...data });
            setOpen(false);
            mutate();
          }}
        >
          <DialogHeader>
            <DialogTitle>Create A Question</DialogTitle>
            <DialogDescription>
              Create a Q auestion and track hotel progress safely.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-8">
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <p>Question</p>
              <Input className="col-span-3" {...register("question")} />
              <div></div>
              <p className="col-span-3 text-sm text-red-500">
                {errors?.name?.message}
              </p>
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <p>Complience</p>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full">
                      {watch("marks") || "Select Complience"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-min space-y-2 bg-white p-4 shadow-2xl">
                    <Button
                      onClick={() => setValue("marks", "Fully Compliant")}
                      className="h-min w-full rounded-full bg-green-300 px-3 py-1.5 text-black hover:bg-green-600"
                    >
                      Fully Compliant
                    </Button>
                    <Button
                      onClick={() => setValue("marks", "Partial Compliant")}
                      className="h-min rounded-full bg-amber-300 px-3 py-1.5 text-black hover:bg-amber-600"
                    >
                      Partial Compliant
                    </Button>
                    <Button
                      onClick={() => setValue("marks", "Non Compliant")}
                      className="h-min w-full rounded-full bg-red-300 px-3 py-1.5 text-black hover:bg-red-600"
                    >
                      Non Compliant
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
              <div></div>
              <p className="col-span-3 text-sm text-red-500">
                {errors?.name?.message}
              </p>
            </div>
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <p>Risks</p>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full">
                      {watch("risk") || "Select Risk"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-min space-y-2 bg-white p-4 shadow-2xl">
                    <Button
                      onClick={() => setValue("risk", "Low")}
                      className="h-min w-full rounded-full bg-green-300 px-3 py-1.5 text-black hover:bg-green-600"
                    >
                      Low
                    </Button>
                    <Button
                      onClick={() => setValue("risk", "Medium")}
                      className="h-min rounded-full bg-amber-300 px-3 py-1.5 text-black hover:bg-amber-600"
                    >
                      Medium
                    </Button>
                    <Button
                      onClick={() => setValue("risk", "High")}
                      className="h-min w-full rounded-full bg-red-300 px-3 py-1.5 text-black hover:bg-red-600"
                    >
                      High
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
              <div></div>
              <p className="col-span-3 text-sm text-red-500">
                {errors?.name?.message}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

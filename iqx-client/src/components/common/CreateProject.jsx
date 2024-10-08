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

const schema = z.object({
  name: z
    .string({ required_error: "Project name is required." })
    .min(3, "Project name must have 3 characters"),
});

export default function CreateProject({ mutate }) {
  const [open, setOpen] = useState();
  const {
    register,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-[#19074B]">
          Create new Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form
          control={control}
          onSubmit={async ({ data }) => {
            await Api.post("/projects", data);
            setOpen(false);
            mutate();
          }}
        >
          <DialogHeader>
            <DialogTitle>Create A project</DialogTitle>
            <DialogDescription>
              Create a project and track hotel progress safely.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-8">
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <p className="text-right">Name</p>
              <Input id="name" className="col-span-3" {...register("name")} />
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

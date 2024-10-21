import { Form, useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Api from "@/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddReview({ open, mutate, setOpen, reason }) {
  const schema = z.object({
    [reason]: z.string(),
  });
  const {
    register,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <Form
          control={control}
          onSubmit={async ({ data }) => {
            await Api.post("/add-review", { ...open, ...data });
            setOpen(false);
            mutate();
          }}
        >
          <DialogHeader>
            <DialogTitle>Add {reason}</DialogTitle>
            <DialogDescription>
              Add a {reason} and track hotel progress safely.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-8">
            <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
              <p className="capitalize">{reason}</p>
              <Input className="col-span-3" {...register(reason)} />
              <div></div>
              <p className="col-span-3 text-sm text-red-500">
                {errors?.[reason]?.message}
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

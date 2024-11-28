import Api from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Form, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z
    .string({ required_error: "Password is Required." })
    .min(1, "Password is required"),
});

export default function SignIn() {
  const addUser = useUserStore((state) => state.addUser);
  const navigate = useNavigate();
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    trigger,
    watch,
  } = useForm({ resolver: zodResolver(schema) });
  useEffect(() => {
    addUser({});
  }, [addUser]);
  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-[linear-gradient(180deg,_#2118A0_0%,_#1B0419_100%)]">
      <p className="absolute left-[5%] top-4 text-4xl font-semibold tracking-widest text-white">
        IRIS
      </p>
      <div className="w-[min(90%,400px)] rounded-3xl bg-[linear-gradient(180deg,_#8AC4FF_27.67%,_#FFFFFF_100%)] p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-[0px_4px_4px_0px_#00000040]">
          <svg
            width="28"
            viewBox="0 0 35 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M32.4652 16H2.62567"
              stroke="#001A72"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20.5292 29L32.465 16L20.5292 3"
              stroke="#001A72"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="pt-4 text-center text-2xl font-semibold text-black">
          Sign in with email
        </p>
        <p className="pb-6 pt-2 text-center text-sm">
          Food Security assessment in a smart way
        </p>
        <Form
          control={control}
          onSubmit={async ({ data }) => {
            const user = await Api.post("/login", data);
            addUser(user);
            navigate("/");
          }}
        >
          <div className="pb-4">
            <Input
              size="large"
              {...register("email")}
              className="h-12 rounded-2xl border-none shadow-[0px_4px_4px_0px_#00000040]"
              placeholder="Email (e.g. user@iris.com)"
            />
            <p className="pt-1 text-sm text-red-500">
              {errors?.email?.message}
            </p>
          </div>
          <div className="pb-4">
            <Input
              size="large"
              {...register("password")}
              className="h-12 rounded-2xl border-none shadow-[0px_4px_4px_0px_#00000040]"
              placeholder="Password"
            />
            <p className="pt-1 text-sm text-red-500">
              {errors?.password?.message}
            </p>
          </div>
          <div className="flex justify-end">
            <Button
              id="forget-button"
              variant="ghost"
              type="button"
              className="h-full p-0 hover:bg-transparent"
              onClick={async () => {
                const btn = document.getElementById("forget-button");
                try {
                  btn.disabled = true;
                  const vr = await trigger("email");
                  const email = watch("email");
                  if (vr) {
                    await Api.post("/forget-password", { email });
                    navigate("/verify", {
                      state: { verify: "forget", email },
                    });
                  }
                  btn.disabled = false;
                } catch (error) {
                  btn.disabled = false;
                  console.log(error);
                }
              }}
            >
              Forget Password?
            </Button>
          </div>
          <Button
            size="lg"
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-2xl bg-[#3C18A0]"
          >
            Sign In
          </Button>
          <Button
            size="lg"
            type="button"
            className="mt-4 w-full rounded-2xl bg-[#002776]"
            onClick={() => navigate("/sign-up")}
          >
            Sign UP
          </Button>
        </Form>
      </div>
    </div>
  );
}

import Api from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

const schema = z.object({
  //   first_name: z.string().min(1),
  //   last_name: z.string().min(1),
  email: z.string().email(),
  password: z
    .string()
    .regex(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
      "Your password must contain at least one Uppercase, Lowercase, Digit & Special Characters."
    ),
});

export default function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-[linear-gradient(180deg,_#2118A0_0%,_#1B0419_100%)]">
      <p className="absolute left-[5%] top-4 text-4xl font-semibold tracking-widest text-white">
        IQX
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
          Sign Up with Email
        </p>
        <p className="pb-6 pt-2 text-center text-sm text-transparent">.</p>
        <Form
          control={control}
          onSubmit={async ({ data }) => {
            try {
              const user = await Api.post("/sign-up", data);
              toast.success(user.message);
              navigate("/sign-in");
            } catch (error) {
              toast.error(error.message);
            }
          }}
        >
          {/* <div className="pb-4">
            <Input
              size="large"
              {...register("first_name")}
              className="h-12 rounded-2xl border-none shadow-[0px_4px_4px_0px_#00000040]"
              placeholder="First Name"
            />
            <p className="pt-1 text-sm text-red-500">
              {errors?.first_name?.message}
            </p>
          </div>
          <div className="pb-4">
            <Input
              size="large"
              {...register("last_name")}
              className="h-12 rounded-2xl border-none shadow-[0px_4px_4px_0px_#00000040]"
              placeholder="Last Name"
            />
            <p className="pt-1 text-sm text-red-500">
              {errors?.last_name?.message}
            </p>
          </div> */}
          <div className="pb-4">
            <Input
              size="large"
              {...register("email")}
              className="h-12 rounded-2xl border-none shadow-[0px_4px_4px_0px_#00000040]"
              placeholder="Email (e.g. user@iqx.com)"
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
          <Button
            size="lg"
            type="submit"
            className="mt-2 w-full rounded-2xl bg-[#3C18A0]"
          >
            Get Started
          </Button>
          <Button
            size="lg"
            type="button"
            className="mt-4 w-full rounded-2xl bg-[#002776]"
            onClick={() => navigate("/sign-in")}
          >
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  );
}

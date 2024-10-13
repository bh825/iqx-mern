import Api from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, Form, useForm } from "react-hook-form";
import OTPInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

export default function VerifyOtp() {
  const { state } = useLocation();
  const {
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(z.object({ otp: z.string() })),
  });

  const navigate = useNavigate();
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
          Verify Your OTP
        </p>
        <p className="pb-8 pt-2 text-center text-sm">
          Check your e-mail we have sent an OTP. Enter otp below.
        </p>
        <Form
          control={control}
          onSubmit={async ({ data }) => {
            await Api.post("/verify", { ...data, ...state });
            navigate("/sign-in");
          }}
        >
          <div className="mx-auto max-w-56">
            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <OTPInput
                  value={field.value}
                  onChange={field.onChange}
                  numInputs={4}
                  renderSeparator={<span className="w-4"></span>}
                  renderInput={(props) => (
                    <Input {...props} className="flex-1" />
                  )}
                />
              )}
            />
          </div>
          <p className="pt-1 text-sm text-red-500">{errors?.otp?.message}</p>
          <Button
            size="lg"
            type="submit"
            disabled={isSubmitting}
            className="mt-8 w-full rounded-2xl bg-[#3C18A0]"
          >
            Verify
          </Button>
        </Form>
      </div>
    </div>
  );
}

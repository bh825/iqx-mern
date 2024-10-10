import CreateProject from "@/components/common/CreateProject";
import Loader from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

export default function Dashboard() {
  const { data, isLoading, error, mutate } = useSWR("/projects");
  const navigate = useNavigate();
  const getContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return <p>Something went wrong!</p>;
    }

    return (
      <div className="p-6">
        <div className="grid grid-cols-[1fr_auto_auto] items-center pb-6">
          <p className="text-4xl">Projects</p>
          <CreateProject mutate={mutate} />
        </div>
        {data?.data?.length ? (
          <div className="space-y-6">
            {data?.data?.map((a, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_auto] rounded-xl border p-4"
              >
                <div>
                  <p className="text-2xl font-medium capitalize">{a.name}</p>
                  <div className="flex gap-4">
                    <p className="text-sm">
                      Created: {moment(a?.createdAt).format("DD/MM/YYYY")}
                    </p>
                    <p>Last Edited : {moment(a?.updatedAt).fromNow()}</p>
                  </div>
                </div>
                <div>
                  <Button
                    onClick={() =>
                      navigate("/projects", { state: { _id: a?._id } })
                    }
                    className="block h-full rounded-xl bg-[#182AA0] px-12 text-base shadow-lg"
                  >
                    <p>{a?.is_started ? "Resume" : "Start"}</p>
                    <p>Assessment</p>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <img src="/no-data.svg" className="mx-auto mt-12 block max-w-32" />
            <p className="py-4 text-lg">You are not created any projects</p>
            <CreateProject mutate={mutate} />
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="grid h-screen w-screen grid-cols-[23%_1fr] grid-rows-[70px_1fr] gap-y-4 bg-[#333333]">
      <div className="row-span-2 grid grid-rows-[auto_1fr_auto] gap-12 bg-[#0D2D9F] px-8 py-4 shadow-md">
        <p className="text-4xl font-bold tracking-widest text-white">IQX</p>
        <div className="rounded-xl bg-white shadow-[0px_4px_4px_0px_#00000040_inset]">
          <div className="pt-12"></div>
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b px-4 pb-6 pt-12">
            <svg
              width="2.3vw"
              viewBox="0 0 49 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.1667 28.1992V43.5325H1.5V28.1992H18.1667ZM47.3333 28.1992V43.5325H30.6667V28.1992H47.3333ZM18.1667 1.36584V16.6992H1.5V1.36584H18.1667ZM47.3333 1.36584V16.6992H30.6667V1.36584H47.3333Z"
                stroke="#9747FF"
                strokeWidth="2"
              />
            </svg>
            <p className="text-2xl">Projects</p>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/25">
              <svg
                width="20"
                viewBox="0 0 26 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5228 20.66L25.6667 11L15.5228 1.34001C15.4312 1.22603 15.3148 1.13204 15.1815 1.06438C15.0482 0.99673 14.9011 0.956997 14.7502 0.947876C14.5993 0.938754 14.4481 0.960457 14.3068 1.01151C14.1655 1.06257 14.0374 1.14179 13.9313 1.24381C13.8251 1.34583 13.7433 1.46826 13.6915 1.60283C13.6396 1.7374 13.6189 1.88095 13.6306 2.02377C13.6424 2.16659 13.6865 2.30535 13.7598 2.43064C13.8331 2.55594 13.9339 2.66485 14.0555 2.75001L21.645 10L1.45221 10C1.17226 10 0.903776 10.1054 0.705822 10.2929C0.507866 10.4804 0.396656 10.7348 0.396656 11C0.396656 11.2652 0.507866 11.5196 0.705822 11.7071C0.903776 11.8946 1.17226 12 1.45221 12L21.645 12L14.0555 19.25C13.8582 19.4383 13.7479 19.6932 13.7488 19.9585C13.7498 20.2239 13.8621 20.478 14.0608 20.665C14.2596 20.852 14.5286 20.9565 14.8087 20.9556C15.0888 20.9546 15.3571 20.8483 15.5544 20.66H15.5228Z"
                  fill="#9747FF"
                />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b px-4 pb-6 pt-12">
            <img src="/Reports.png" className="w-[2.3vw]" />
            <p className="text-2xl">Reports</p>
          </div>
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b px-4 pb-6 pt-12">
            <svg
              width="2.3vw"
              viewBox="0 0 53 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M30.9167 41V8.5C30.9167 7.044 30.9123 6.1 30.8107 5.408C30.7135 4.758 30.5567 4.554 30.4309 4.44C30.305 4.326 30.0797 4.184 29.362 4.096C28.5957 4.004 27.5556 4 25.9479 4C24.3403 4 23.2979 4.004 22.5339 4.096C21.8161 4.184 21.5909 4.326 21.465 4.44C21.3391 4.554 21.1824 4.758 21.0852 5.408C20.9836 6.102 20.9792 7.044 20.9792 8.5V41H30.9167Z"
                fill="#699BF7"
              />
              <path
                opacity="0.7"
                d="M17.6667 17.5C17.6667 17.1022 17.4922 16.7206 17.1816 16.4393C16.871 16.158 16.4497 16 16.0104 16H9.38544C8.94617 16 8.5249 16.158 8.21429 16.4393C7.90368 16.7206 7.72919 17.1022 7.72919 17.5V41H17.6667V17.5ZM44.1667 27.5C44.1667 27.1022 43.9922 26.7206 43.6816 26.4393C43.371 26.158 42.9497 26 42.5104 26H35.8854C35.4462 26 35.0249 26.158 34.7143 26.4393C34.4037 26.7206 34.2292 27.1022 34.2292 27.5V41H44.1667V27.5Z"
                fill="#699BF7"
              />
              <path
                opacity="0.5"
                d="M3.86456 41C3.4253 41 3.00402 41.158 2.69342 41.4393C2.38281 41.7206 2.20831 42.1022 2.20831 42.5C2.20831 42.8978 2.38281 43.2794 2.69342 43.5607C3.00402 43.842 3.4253 44 3.86456 44H48.0312C48.4705 44 48.8918 43.842 49.2024 43.5607C49.513 43.2794 49.6875 42.8978 49.6875 42.5C49.6875 42.1022 49.513 41.7206 49.2024 41.4393C48.8918 41.158 48.4705 41 48.0312 41H3.86456Z"
                fill="#699BF7"
              />
            </svg>

            <p className="text-2xl">Dashboard</p>
          </div>
        </div>
        <div>
          <Button className="w-full rounded-xl bg-black/30 text-lg">
            Logout
          </Button>
        </div>
      </div>
      <div className="bg-[#0027F260]"></div>
      <div className="px-6 pb-6">
        <div className="h-full overflow-auto rounded-xl bg-white">
          {getContent()}
        </div>
      </div>
    </div>
  );
}

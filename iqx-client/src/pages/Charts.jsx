import Loader from "@/components/common/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import useSWR from "swr";

const colors = [
  "#8884d8", // Soft violet
  "#82ca9d", // Soft green
  "#ffc658", // Warm yellow-orange
  "#ff7300", // Bright orange
  "#8dd1e1", // Light blue
  "#a4de6c", // Light green
  "#d0ed57", // Soft lime
  "#ff8397", // Soft pinkish-red
  "#b39ddb", // Muted lavender
];

export default function Charts() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data, isLoading } = useSWR(state?._id && `/projects/${state?._id}`);

  if (isLoading) {
    return <Loader />;
  }

  const clauses_data = data?.data?.clauses_data;
  const statuses = clauses_data
    ?.map((a) => a.status)
    .filter((a, i, arr) => arr.indexOf(a) === i);
  const radar_data = clauses_data
    ?.map((a) => a?.domain)
    .filter((a, i, arr) => arr.indexOf(a) === i)
    .map((a) => ({
      domain: a,
      ...statuses?.reduce((acc, cv) => {
        acc[cv] = clauses_data.filter(
          (b) =>
            b.domain === a && cv === b.status && b.marks === "Fully Compliant"
        )?.length;
        return acc;
      }, {}),
    }));

  return (
    <div className="grid h-screen w-screen grid-rows-[70px_1fr]">
      <div className="grid items-center gap-6 border-b bg-white px-12 shadow">
        <p
          className="cursor-pointer text-5xl font-bold tracking-wide"
          onClick={() => navigate("/")}
        >
          IQX
        </p>
      </div>
      <div className="overflow-auto p-4">
        <div className="grid grid-cols-3">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radar_data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="domain" />
                {statuses?.length && (
                  <>
                    {statuses?.map((a, i) => (
                      <Radar
                        key={i}
                        name={a}
                        dataKey={a}
                        stroke={colors[i]}
                        fill={colors[i]}
                        fillOpacity={0.6}
                      />
                    ))}
                  </>
                )}

                <Tooltip />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

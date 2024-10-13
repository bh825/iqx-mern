import Loader from "@/components/common/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useSWR from "swr";
import PieCharts from "./PieCharts";

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
const COLORS = ["#A9D18E", "#FFD966", "#F4B183", "#BFBFBF"];
export default function Charts() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data, isLoading } = useSWR(state?._id && `/projects/${state?._id}`);
  const { data: clauses, isLoading: clausesLoading } = useSWR("/clauses");
  if (isLoading || clausesLoading) {
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
  const risk_data = [
    {
      name: "High",
      value: clauses_data?.filter((a) => a?.risk === "High")?.length,
    },
    {
      name: "Medium",
      value: clauses_data?.filter((a) => a?.risk === "Medium")?.length,
    },
    {
      name: "Low",
      value: clauses_data?.filter((a) => a?.risk === "Low")?.length,
    },
  ];

  const domainWiseComlience = clauses?.data
    ?.map((a) => a.domain)
    .filter((a, i, arr) => arr.indexOf(a) === i)
    ?.map((a) => ({
      name: a,
      value: clauses_data?.filter((b) => b.domain === a)?.length,
    }));

  return (
    <div className="grid h-screen w-screen grid-rows-[70px_1fr]">
      <div className="grid grid-cols-[auto_1fr] items-center gap-6 border-b bg-white px-12 shadow">
        <p
          className="cursor-pointer text-5xl font-bold tracking-wide"
          onClick={() => navigate("/")}
        >
          IQX
        </p>
        <p className="text-center text-4xl tracking-wide">{data?.data?.name}</p>
      </div>
      <div className="overflow-auto p-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-center text-2xl text-[#2F5597]">
              Regultion-Wise Complience Percentage
            </p>
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
          <div>
            <p className="pb-3 text-center text-2xl text-[#2F5597]">
              Control Complience Distribution
            </p>
            <div>
              <PieCharts clauses={clauses} clauses_data={clauses_data} />
            </div>
          </div>
          <div>
            <p className="pb-3 text-center text-2xl text-[#2F5597]">
              Non-Complient Control Risk Distribution
            </p>
            <div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart barCategoryGap="40%" data={risk_data}>
                  <Bar dataKey="value" fill="#8884d8">
                    {risk_data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
                    ))}
                  </Bar>
                  <Tooltip />
                  <XAxis dataKey="name" />
                  <YAxis />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div>
          <p className="text-center text-2xl text-[#2F5597]">
            Domain-wise complience Percentage
          </p>
          <div>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart barCategoryGap="40%" data={domainWiseComlience}>
                <Bar dataKey="value" fill="#8884d8" />
                <Tooltip cursor={false} />
                <XAxis
                  dataKey="name"
                  tickMargin={50}
                  angle={320}
                  height={100}
                />
                <YAxis />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Cell, Pie, PieChart, Tooltip } from "recharts";

const COLORS = ["#A9D18E", "#FFD966", "#F4B183", "#BFBFBF"];

export default function PieCharts({ clauses, clauses_data }) {
  console.log(clauses_data);

  const planning_data = [
    {
      name: "Fully complient",
      value: clauses_data?.filter(
        (a) => a?.status === "Planning" && a?.marks === "Fully Compliant"
      )?.length,
    },
    {
      name: "Partial Compliant",
      value: clauses_data?.filter(
        (a) => a?.status === "Planning" && a?.marks === "Partial Compliant"
      )?.length,
    },
    {
      name: "Non Compliant",
      value: clauses_data?.filter(
        (a) => a?.status === "Planning" && a?.marks === "Non Compliant"
      )?.length,
    },
    {
      name: "Not Apllicable",
      value:
        (clauses?.data?.length || 0) -
        (clauses_data?.filter((a) => a?.status === "Planning")?.length || 0),
    },
  ];

  const initial_days_data = [
    {
      name: "Fully complient",
      value: clauses_data?.filter(
        (a) => a?.status === "Initial Days" && a?.marks === "Fully Compliant"
      )?.length,
    },
    {
      name: "Partial Compliant",
      value: clauses_data?.filter(
        (a) => a?.status === "Initial Days" && a?.marks === "Partial Compliant"
      )?.length,
    },
    {
      name: "Non Compliant",
      value: clauses_data?.filter(
        (a) => a?.status === "Initial Days" && a?.marks === "Non Compliant"
      )?.length,
    },
    {
      name: "Not Apllicable",
      value:
        (clauses?.data?.length || 0) -
        (clauses_data?.filter((a) => a?.status === "Initial Days")?.length ||
          0),
    },
  ];

  const fully_operational_data = [
    {
      name: "Fully complient",
      value: clauses_data?.filter(
        (a) =>
          a?.status === "Fully Operational" && a?.marks === "Fully Compliant"
      )?.length,
    },
    {
      name: "Partial Compliant",
      value: clauses_data?.filter(
        (a) =>
          a?.status === "Fully Operational" && a?.marks === "Partial Compliant"
      )?.length,
    },
    {
      name: "Non Compliant",
      value: clauses_data?.filter(
        (a) => a?.status === "Fully Operational" && a?.marks === "Non Compliant"
      )?.length,
    },
    {
      name: "Not Apllicable",
      value:
        (clauses?.data?.length || 0) -
        (clauses_data?.filter((a) => a?.status === "Fully Operational")
          ?.length || 0),
    },
  ];
  const declining_phase_data = [
    {
      name: "Fully complient",
      value: clauses_data?.filter(
        (a) => a?.status === "Declining Phase" && a?.marks === "Fully Compliant"
      )?.length,
    },
    {
      name: "Partial Compliant",
      value: clauses_data?.filter(
        (a) =>
          a?.status === "Declining Phase" && a?.marks === "Partial Compliant"
      )?.length,
    },
    {
      name: "Non Compliant",
      value: clauses_data?.filter(
        (a) => a?.status === "Declining Phase" && a?.marks === "Non Compliant"
      )?.length,
    },
    {
      name: "Not Apllicable",
      value:
        (clauses?.data?.length || 0) -
        (clauses_data?.filter((a) => a?.status === "Declining Phase")?.length ||
          0),
    },
  ];

  return (
    <div className="mx-auto grid max-w-96 grid-cols-2 gap-4">
      <div>
        <p className="text-center">Planning</p>
        <div className="mx-auto w-min">
          <PieChart width={130} height={130}>
            <Pie
              dataKey="value"
              data={planning_data}
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
            >
              {planning_data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
      <div>
        <p className="text-center">Initial Days</p>
        <div className="mx-auto w-min">
          <PieChart width={130} height={130}>
            <Pie
              dataKey="value"
              data={initial_days_data}
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
            >
              {planning_data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
      <div>
        <p className="text-center">Fully Operational</p>
        <div className="mx-auto w-min">
          <PieChart width={130} height={130}>
            <Pie
              dataKey="value"
              data={fully_operational_data}
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
            >
              {planning_data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
      <div>
        <p className="text-center">Declining Phase</p>
        <div className="mx-auto w-min">
          <PieChart width={130} height={130}>
            <Pie
              dataKey="value"
              data={declining_phase_data}
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
            >
              {planning_data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

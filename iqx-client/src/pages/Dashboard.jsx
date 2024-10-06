import useSWR from "swr";

export default function Dashboard() {
  const { data } = useSWR("/common/data");
  console.log(data);

  return <div>Dashboard</div>;
}

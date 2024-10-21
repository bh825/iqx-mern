import moment from "moment";
import * as xlsx from "xlsx";

export default function exportToExcel(project) {
  const workbook = xlsx.utils.book_new();
  const statuses = project?.clauses_data
    ?.map((a) => a.status)
    ?.filter((a, i, arr) => arr.indexOf(a) === i);
  statuses.forEach((element) => {
    const worksheet = xlsx.utils.json_to_sheet(
      project.clauses_data
        ?.filter((a) => a.status === element)
        ?.map((a) => ({
          domain: a?.domain,
          framework: a?.framework,
          control: a?.control,
          question: a?.question,
          marks: a?.marks,
          risk: a?.risk,
          observation: a?.observation,
          review: a?.review,
        }))
    );
    xlsx.utils.book_append_sheet(workbook, worksheet, element);
  });

  const history = xlsx.utils.json_to_sheet(
    project?.history
      ?.map((a) => ({
        ...a,
        time: moment(a?.time).format("DD-MM-YYYY hh:mm:ss"),
      }))
      ?.map((a) => {
        if (a?._id) delete a._id;
        return a;
      })
  );
  xlsx.utils.book_append_sheet(workbook, history, "History");

  xlsx.writeFile(
    workbook,
    `${project?.name} on ${moment().format("DD-MM-YYYY")}.xlsx`
  );
}

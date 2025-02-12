import { DateTime } from "luxon";

function convertTimeIntoLocal(time) {
  if (!time) {
    return "now";
  }

  const localTime = DateTime.fromISO(time, { zone: "Asia/Dhaka" });
  const formatDate = localTime.toFormat("hh:mm dd:mm:yyyy");

  console.log(formatDate);
  return formatDate;
}

export default convertTimeIntoLocal;

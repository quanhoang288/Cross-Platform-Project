import { format } from "timeago.js";
import { months } from "../constants/months";

const formatDate = (date) => {
  const dateObj = new Date(date);

  var yearPart = dateObj.getFullYear();
  var monthPart = months[dateObj.getMonth()];
  var datePart = dateObj.getDate();

  let formattedDate;

  const now = new Date();
  const diffInDays = (now.getTime() - dateObj.getTime()) / (1000 * 3600 * 24);
  const isSameYear = now.getFullYear() === dateObj.getFullYear();

  if (diffInDays >= 2) {
    formattedDate = monthPart + " " + datePart;
    if (!isSameYear) {
      formattedDate += ", " + yearPart;
    }
  } else {
    formattedDate = format(date);
  }

  return formattedDate;
};

export default formatDate;

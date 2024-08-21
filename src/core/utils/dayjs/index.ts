import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isTodayDate from "dayjs/plugin/isToday";
import isTomorrowDate from "dayjs/plugin/isTomorrow";
import isYesterdayDate from "dayjs/plugin/isYesterday";
import minMax from "dayjs/plugin/minMax";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timeZone from "dayjs/plugin/timezone";

const dayjsExt = dayjs;

dayjs.extend(advancedFormat);
dayjs.extend(utc);
dayjs.extend(timeZone);
dayjs.extend(isTodayDate);
dayjs.extend(isTomorrowDate);
dayjs.extend(isYesterdayDate);
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(minMax);

export { dayjsExt };

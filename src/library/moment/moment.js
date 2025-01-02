import moment from "moment-timezone";

export default function timezone() {
  const serverTime = moment().tz("Asia/Ulaanbaatar").format("YYYY-MM-DD HH:mm:ss");

  return (serverTime);
}
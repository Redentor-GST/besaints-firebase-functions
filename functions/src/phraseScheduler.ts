import { initializeApp } from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { DateTrigger, User } from "./types";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc)
dayjs.extend(timezone)

initializeApp();
const db = getFirestore();

const users = db.collection("users");

export default async () => {
  const dbUsers = await users.where("shouldSendNotifications", "==", true).get() as unknown as User[];
  dbUsers.forEach((user) => {
    const dateTriggered = isDateTriggered(user.dateTrigger);
    console.log(dateTriggered)
  });
}

function isDateTriggered(dateTrigger: DateTrigger) {
  const { hour, minute, timezone } = dateTrigger;

  const UTCNow = dayjs.utc();
  const localDateAsUTC = dayjs()
    .set('hour', hour)
    .set('minute', minute)
    .set('second', 0)
    .set('millisecond', 0)
    .tz(timezone)
    .utc()

  return UTCNow.isSame(localDateAsUTC);
}
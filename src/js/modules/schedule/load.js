import { getSchedules } from "../requests/getSchdules";
import dayjs from "dayjs";

const scheduleListMorning = document.querySelector("[data-hour-gap='09h-12h']");
const scheduleListAfternoon = document.querySelector("[data-hour-gap='13h-18h']");
const scheduleListNight = document.querySelector("[data-hour-gap='18h-21h']");

document.addEventListener("DOMContentLoaded", async () => {
  renderSchedules(dayjs().format("YYYY-MM-DD"));
})

export async function renderSchedules(date) {
  const schedulesByDate = await getSchedules(dayjs(date).format("YYYY-MM-DD"));
  
  scheduleListMorning.innerHTML = "";
  scheduleListAfternoon.innerHTML = "";
  scheduleListNight.innerHTML = "";

  schedulesByDate.forEach(schedule => {
    const scheduleItem = scheduleItemTemplate(schedule);

    if (schedule.hour >= "09:00" && schedule.hour < "12:00") {
      scheduleListMorning.insertAdjacentHTML("beforeend", scheduleItem);
    } else if (schedule.hour >= "13:00" && schedule.hour < "18:00") {
      scheduleListAfternoon.insertAdjacentHTML("beforeend", scheduleItem);
    } else if (schedule.hour >= "18:00" && schedule.hour < "21:00") {
      scheduleListNight.insertAdjacentHTML("beforeend", scheduleItem);
    }
  });
}

function scheduleItemTemplate({ tutor, petName, service, hour }) {
  return `
    <li class="period__schedule">
      <span class="period__hour">${hour}</span>
      <span class="period__patient"><strong>${petName}</strong> / ${tutor}</span>
      <span class="period__service">${service}  </span>
      <a class="period__remove" href="javascript:void(0);"> Remover agendamento</a>
    </li>
  `
}
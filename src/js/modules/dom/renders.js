const scheduleListMorning = document.querySelector("[data-hour-gap='09h-12h']")
const scheduleListAfternoon = document.querySelector("[data-hour-gap='13h-18h']")
const scheduleListNight = document.querySelector("[data-hour-gap='18h-21h']")

export function renderScheduleItems(schedulesByDate) {
  schedulesByDate.forEach((schedule) => {
    const scheduleItem = scheduleItemTemplate(schedule)

    if (schedule.hour >= "09:00" && schedule.hour < "12:00") {
      scheduleListMorning.append(scheduleItem)
    } else if (schedule.hour >= "13:00" && schedule.hour < "18:00") {
      scheduleListAfternoon.append(scheduleItem)
    } else if (schedule.hour >= "18:00" && schedule.hour < "21:00") {
      scheduleListNight.append(scheduleItem)
    }
  })
}

export function clearSchedules() {
  scheduleListMorning.innerHTML = ""
  scheduleListAfternoon.innerHTML = ""
  scheduleListNight.innerHTML = ""
}

function scheduleItemTemplate({ tutor, petName, service, hour }) {
  const nodeLi = document.createElement("li")
  const nodeSpanHour = document.createElement("span")
  const nodeSpanPatient = document.createElement("span")
  const nodeStrong = document.createElement("strong")
  const nodeSpanService = document.createElement("span")
  const nodeAnchorRemove = document.createElement("a")

  nodeLi.classList.add("period__schedule")
  nodeSpanHour.classList.add("period__hour")
  nodeSpanPatient.classList.add("period__patient")
  nodeSpanService.classList.add("period__service")
  nodeAnchorRemove.classList.add("period__remove")
  nodeAnchorRemove.setAttribute("href", "javascript:void(0);")
  nodeAnchorRemove.innerText = "Remover agendamento"

  nodeSpanHour.innerText = hour
  nodeStrong.innerText = petName
  nodeSpanPatient.append(nodeStrong, ` / ${tutor}`)
  nodeSpanService.innerText = service

  nodeLi.append(nodeSpanHour, nodeSpanPatient, nodeSpanService, nodeAnchorRemove)

  return nodeLi
}

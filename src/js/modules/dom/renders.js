import { initDeleteAnchor } from "../dom/initUi"

const scheduleListMorning = document.querySelector("[data-hour-gap='09h-12h']")
const scheduleListAfternoon = document.querySelector("[data-hour-gap='13h-18h']")
const scheduleListNight = document.querySelector("[data-hour-gap='18h-21h']")

function updateSubmitButtonState() {
  const nodeButton = document.querySelector(".modal__button")
  const hasErrors = document.querySelector(".modal__form .error")

  if (!nodeButton) return

  if (hasErrors) {
    nodeButton.setAttribute("disabled", "true")
  } else {
    nodeButton.removeAttribute("disabled")
  }
}

function scheduleItemTemplate({ tutor, petName, service, hour, id }) {
  const nodeLi = document.createElement("li")
  const nodeSpanHour = document.createElement("span")
  const nodeSpanPatient = document.createElement("span")
  const nodeStrong = document.createElement("strong")
  const nodeSpanService = document.createElement("span")
  const nodeAnchorRemove = document.createElement("span")
  const nodeInputHidden = document.createElement("input")

  nodeLi.classList.add("period__schedule")
  nodeSpanHour.classList.add("period__hour")
  nodeSpanPatient.classList.add("period__patient")
  nodeSpanService.classList.add("period__service")
  nodeAnchorRemove.classList.add("period__remove")
  nodeAnchorRemove.onclick = (e) => initDeleteAnchor(e)
  nodeAnchorRemove.innerText = "Remover agendamento"
  nodeInputHidden.setAttribute("type", "hidden")
  nodeInputHidden.setAttribute("value", id)

  nodeSpanHour.innerText = hour
  nodeStrong.innerText = petName
  nodeSpanPatient.append(nodeStrong, ` / ${tutor}`)
  nodeSpanService.innerText = service

  nodeLi.append(nodeInputHidden, nodeSpanHour, nodeSpanPatient, nodeSpanService, nodeAnchorRemove)

  return nodeLi
}

export function renderScheduleItems(schedulesByDate) {
  schedulesByDate.forEach((schedule) => {
    const scheduleItem = scheduleItemTemplate(schedule)

    if (schedule.hour >= "09:00" && schedule.hour <= "12:00") {
      scheduleListMorning.append(scheduleItem)
    } else if (schedule.hour >= "13:00" && schedule.hour < "18:00") {
      scheduleListAfternoon.append(scheduleItem)
    } else if (schedule.hour >= "18:00" && schedule.hour <= "21:00") {
      scheduleListNight.append(scheduleItem)
    }
  })
}

export function clearSchedules() {
  scheduleListMorning.innerHTML = ""
  scheduleListAfternoon.innerHTML = ""
  scheduleListNight.innerHTML = ""
}

export function renderFormInputError(parentNode, message) {
  if (!parentNode) return

  const nodeSpan = document.createElement("span")
  nodeSpan.classList.add("modal__input-error")

  nodeSpan.innerText = message
  removeFormInputError(parentNode)
  parentNode.classList.add("error")
  parentNode.append(nodeSpan)
  updateSubmitButtonState()
}

export function removeFormInputError(parentNode) {
  if (!parentNode) return

  const nodeError = parentNode.querySelector(".modal__input-error")
  parentNode.classList.remove("error")
  nodeError?.remove()
  updateSubmitButtonState()
}

export function clearScheduleForm(inputs) {
  inputs.forEach((input) => {
    if (input.type !== "date" && input.type !== "time") {
      input.value = ""
    }

    removeFormInputError(input.parentNode)
    input.parentNode.classList.remove("error")
  })
}

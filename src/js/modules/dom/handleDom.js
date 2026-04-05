import { initInputDate, initInputTime } from "./initUi"
import { inputsValidation } from "../form/validation"
import { clearScheduleForm } from "../dom/renders"
import services from "../services/handleSchedules"
import { renderSchedules } from "../schedules/load"

const wrappersDate = document.querySelectorAll(".date-picker")

const newScheduleButton = document.querySelector(".footer__schedule")

const modalCloseButton = document.querySelector(".modal__button-close")
const form = document.querySelector(".modal__form")

newScheduleButton.addEventListener("click", () => {
  let modal = document.querySelector(".modal")
  let overlay = document.querySelector(".app-overlay")
  let body = document.querySelector("body")
  modal.classList.toggle("visible")
  overlay.classList.toggle("visible")
  window.scrollTo(0, 0)
  body.classList.toggle("no-scroll")
})

modalCloseButton.addEventListener("click", () => {
  const modal = document.querySelector(".modal")
  const overlay = document.querySelector(".app-overlay")
  const body = document.querySelector("body")
  const formInputs = document.querySelectorAll(".modal__form input")
  const formTextarea = document.querySelector(".modal__form textarea")
  const fields = [...formInputs, formTextarea]

  modal.classList.remove("visible")
  overlay.classList.remove("visible")
  body.classList.remove("no-scroll")

  clearScheduleForm(fields)
})

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  if (!(await inputsValidation())) {
    return
  }

  const form = document.querySelector(".modal__form")
  const formData = new FormData(form)
  const data = Object.fromEntries(formData.entries())

  const result = await services.createSchedule(data)

  if (result.success) {
    modalCloseButton.click()
    alert(result.data)
    renderSchedules(data.modalDate)
  } else {
    alert(result.message)
  }
})

document.addEventListener("DOMContentLoaded", () => {
  initInputDate(wrappersDate)
  initInputTime()
})

import { initInputDate, initInputTime } from "./initUi"
import { inputsValidation } from "../form/validation"
import { clearScheduleForm } from "../dom/renders"
import services from "../services/handleSchedules"
import { renderSchedules } from "../schedules/load"
import dayjs from "dayjs"

const wrappersDate = document.querySelectorAll(".date-picker")
const wrapperTime = document.querySelector(".datetime-picker")

const newScheduleButton = document.querySelector(".footer__schedule")

const modalCloseButton = document.querySelector(".modal__button-close")
const form = document.querySelector(".modal__form")

newScheduleButton.addEventListener("click", () => {
  let modal = document.querySelector(".modal")
  let overlay = document.querySelector(".app-overlay")
  modal.classList.toggle("visible")
  overlay.classList.toggle("visible")
})

modalCloseButton.addEventListener("click", () => {
  const modal = document.querySelector(".modal")
  const overlay = document.querySelector(".app-overlay")
  const formInputs = document.querySelectorAll(".modal__form input")
  const formTextarea = document.querySelector(".modal__form textarea")
  const fields = [...formInputs, formTextarea]

  modal.classList.remove("visible")
  overlay.classList.remove("visible")

  clearScheduleForm(fields)
})

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  if (!inputsValidation()) {
    return
  }

  const form = document.querySelector(".modal__form")
  const formData = new FormData(form)
  const data = Object.fromEntries(formData.entries())

  const result = await services.createSchedule(data)
  if (result) {
    modalCloseButton.click()
    alert("Agendamento criado com sucesso!")
    renderSchedules(dayjs().format("YYYY-MM-DD"))
  } else {
    alert("Ocorreu um erro ao criar o agendamento. Tente novamente.")
  }
})

document.addEventListener("DOMContentLoaded", () => {
  initInputDate(wrappersDate)
  initInputTime(wrapperTime)
})

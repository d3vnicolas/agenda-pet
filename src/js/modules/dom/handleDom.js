import { initInputDate, initInputTime } from "./initUi"
import { inputsValidation } from "../form/validation"
import { clearScheduleForm } from "../dom/renders"

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

form.addEventListener("submit", (event) => {
  event.preventDefault()
  inputsValidation()
})

document.addEventListener("DOMContentLoaded", () => {
  initInputDate(wrappersDate)
  initInputTime(wrapperTime)
})

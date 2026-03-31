import { initInputDate, initInputTime } from "./initUi"

const wrappersDate = document.querySelectorAll(".date-picker")
const wrapperTime = document.querySelector(".datetime-picker")

const newScheduleButton = document.querySelector(".footer__schedule")

const modalCloseButton = document.querySelector(".modal__button-close")

newScheduleButton.addEventListener("click", () => {
  let modal = document.querySelector(".modal")
  let overlay = document.querySelector(".app-overlay")
  modal.classList.toggle("visible")
  overlay.classList.toggle("visible")
})

modalCloseButton.addEventListener("click", () => {
  let modal = document.querySelector(".modal")
  let overlay = document.querySelector(".app-overlay")
  modal.classList.toggle("visible")
  overlay.classList.toggle("visible")
})

document.addEventListener("DOMContentLoaded", () => {
  initInputDate(wrappersDate)
  initInputTime(wrapperTime)
})

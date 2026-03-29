import dayjs from "dayjs"
import { renderSchedules } from "../schedule/load"

const inputs = document.querySelectorAll("input[type='date']")
const generalInputs = document.querySelectorAll(".date-picker")

const inputTime = document.querySelector("input[type='time']")
const timeDisplay = document.querySelector(".time-display span")

document.addEventListener("DOMContentLoaded", () => {
  const today = dayjs().format("YYYY-MM-DD")
  const currentTimeWithTwo = dayjs().add(2, "hour").format("HH:mm")
  
  inputs.forEach((input) => {
    input.value = today
    const text = input.parentNode.querySelector("span")
    const [year, month, day] = today.split("-")
    text.textContent = `${day}/${month}/${year}`
    input.min = today
  })

  inputTime.value = currentTimeWithTwo
  textTime.textContent = currentTimeWithTwo
})

generalInputs.forEach((generalInput) => {
  generalInput.addEventListener("click", () => {
    generalInput.querySelector("input").showPicker()
  })
})

textTime.addEventListener("click", () => {
  inputTime.showPicker()
})

inputs.forEach((input) => {
  input.addEventListener("change", () => {
    const value = input.value
    const text = input.parentNode.querySelector("span")

    if (!value) return

    const [year, month, day] = value.split("-")
    text.textContent = `${day}/${month}/${year}`
    renderSchedules(value)
  })
})

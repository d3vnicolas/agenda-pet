import dayjs from "dayjs"
import { TimepickerUI, PluginRegistry } from "timepicker-ui"
import { WheelPlugin } from "timepicker-ui/plugins/wheel"
import services from "../services/handleSchedules"
import utils from "../utils/scheduleRules"
import { removeFormInputError } from "./renders"
import { renderSchedules } from "../schedules/load"

import "timepicker-ui/main.css"
import "timepicker-ui/theme-dark.css"

export let timerpicker

export function initInputDate(wrapperDates) {
  const today = dayjs().format("YYYY-MM-DD")

  wrapperDates.forEach((dateWrapped) => {
    const inputDate = dateWrapped.querySelector("input[type=date]")
    const labelDate = dateWrapped.querySelector("span")

    if (!inputDate || !labelDate) return

    const [year, month, day] = today.split("-")

    inputDate.value = today
    inputDate.min = today
    labelDate.innerText = `${day}/${month}/${year}`

    inputDate.addEventListener("change", function () {
      const dateValue = inputDate.value
      const [selectedYear, selectedMonth, selectedDay] = dateValue.split("-")
      labelDate.innerText = `${selectedDay}/${selectedMonth}/${selectedYear}`

      document.querySelector(".modal__button")?.removeAttribute("disabled")

      const parentDatePicker = document.querySelector(".modal .date-picker")
      const parentTimePicker = document.querySelector(".modal .time-picker")

      if (parentDatePicker) removeFormInputError(parentDatePicker)
      if (parentTimePicker) removeFormInputError(parentTimePicker)
    })

    dateWrapped.addEventListener("click", function () {
      inputDate.showPicker()
    })
  })
}

export async function initInputTime() {
  const today = dayjs().format("YYYY-MM-DD")
  PluginRegistry.register(WheelPlugin)

  const [unavailableHours, firstAvailableHour] = await Promise.all([
    utils.unavailableHours(today),
    utils.firstScheduleAvailable(today),
  ])

  const input = document.querySelector("#modal-time")

  if (!input) return

  const disabledHours = unavailableHours.success ? unavailableHours.data : []
  const initialHour = firstAvailableHour.success ? firstAvailableHour.data : 9

  timerpicker = new TimepickerUI(input, {
    clock: {
      type: "24h",
      autoSwitchToMinutes: true,
      incrementMinutes: 60,
      currentTime: {
        updateInput: true,
        time: dayjs().hour(initialHour).minute(0),
      },
      disabledTime: {
        hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, ...disabledHours, 22, 23],
      },
    },
    ui: {
      mode: "wheel",
      theme: "dark",
      backdrop: false,
      animation: false,
      mobile: false,
      cssClass: "purple-dark-theme",
      editable: false,
    },
    labels: {
      ok: "Confirmar",
      cancel: "Fechar",
      time: "Escolher horário",
    },
    callbacks: {
      onConfirm: function () {
        handleCloseTimepicker()
      },
      onCancel: function () {
        handleCloseTimepicker()
      },
      onOpen: () => {
        const nodeForm = document.querySelector("section.modal")
        nodeForm?.classList.add("blur")
      },
    },
  })

  timerpicker.create()
}

export async function initDeleteAnchor({ target }) {
  const id = target.parentElement.querySelector("input[type=hidden]").value
  const request = await services.deleteSchedule(id)

  alert(request.message)

  if (request.success) {
    renderSchedules(dayjs().format("YYYY-MM-DD"))
  }
}

function handleCloseTimepicker() {
  const nodeForm = document.querySelector("section.modal")
  const parentDatePicker = document.querySelector(".modal .date-picker")
  const parentTimePicker = document.querySelector(".modal .time-picker")

  if (parentDatePicker) removeFormInputError(parentDatePicker)
  if (parentTimePicker) removeFormInputError(parentTimePicker)

  document.querySelector(".modal__button")?.removeAttribute("disabled")
  setTimeout(() => nodeForm?.classList.remove("blur"), 300)
}

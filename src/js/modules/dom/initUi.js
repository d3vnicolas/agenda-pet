import dayjs from "dayjs"
import { TimepickerUI, PluginRegistry } from "timepicker-ui"
import { WheelPlugin } from "timepicker-ui/plugins/wheel"
import services from "../services/handleSchedules"

import "timepicker-ui/main.css"
import "timepicker-ui/theme-dark.css"

export var timerpicker

const today = dayjs().format("YYYY-MM-DD")

export function initInputDate(wrapperDates) {
  const today = dayjs().format("YYYY-MM-DD")

  wrapperDates.forEach((dateWrapped) => {
    const inputDate = dateWrapped.querySelector("input[type=date]")
    const labelDate = dateWrapped.querySelector("span")
    const [year, month, day] = today.split("-")

    inputDate.value = today
    inputDate.min = today
    labelDate.innerText = `${day}/${month}/${year}`

    inputDate.addEventListener("change", function () {
      const dateValue = inputDate.value
      const [year, month, day] = dateValue.split("-")
      labelDate.innerText = `${day}/${month}/${year}`
    })

    dateWrapped.addEventListener("click", function () {
      inputDate.showPicker()
    })
  })
}

export async function initInputTime() {
  PluginRegistry.register(WheelPlugin)

  const data = await services.getUnavailableHours(today)
  const unavailableHours = [...data]
  const input = document.querySelector("#modal-time")
  timerpicker = new TimepickerUI(input, {
    clock: {
      type: "24h",
      autoSwitchToMinutes: true,
      incrementMinutes: 60,
      currentTime: {
        updateInput: true,
        time: dayjs()
          .hour(await services.getFirstScheduleAvailable(today))
          .minute(0),
      },
      disabledTime: {
        hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, ...unavailableHours, 22, 23],
      },
    },
    ui: {
      mode: "wheel",
      theme: "dark",
      backdrop: false,
      animation: false,
      mobile: false,
      cssClass: "purple-dark-theme",
    },
    labels: {
      ok: "Confirmar",
      cancel: "Fechar",
      time: "Escolher horário",
    },
    callbacks: {
      onConfirm: function (e) {
        handleCloseTimepicker(e)
      },
      onCancel: function (e) {
        handleCloseTimepicker(e)
      },
      onOpen: () => {
        const nodeForm = document.querySelector("section.modal")
        nodeForm.classList.add("blur")
      },
    },
  })
  timerpicker.create()
}

function handleCloseTimepicker() {
  const nodeForm = document.querySelector("section.modal")
  setTimeout(() => nodeForm.classList.remove("blur"), 300)
}

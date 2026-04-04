import services from "../services/handleSchedules"
import { timerpicker } from "../dom/initUi"

document.addEventListener("DOMContentLoaded", function () {
  const nodeDate = document.getElementById("modal-date")

  nodeDate.addEventListener("change", async function () {
    updateTimePicker(nodeDate.value)
  })
})

async function updateTimePicker(date) {
  const data = await services.getUnavailableHours(date)
  const unavailableHours = [...data]

  timerpicker.update({
    options: {
      clock: {
        type: "24h",
        disabledTime: {
          hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, ...unavailableHours, 22, 23],
        },
      },
    },
    create: true,
  })
}

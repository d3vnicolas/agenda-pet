import dayjs from "dayjs"
import utils from "../utils/scheduleRules"
import { timerpicker } from "../dom/initUi"
import { removeFormInputError } from "../dom/renders"

document.addEventListener("DOMContentLoaded", function () {
  const nodeDate = document.getElementById("modal-date")
  const formInputs = [
    ...document.querySelectorAll(".modal input"),
    document.querySelector(".modal textarea"),
  ].filter(Boolean)

  nodeDate?.addEventListener("change", async function () {
    await updateTimePicker(nodeDate.value)
  })

  formInputs.forEach((input) => {
    input.addEventListener("input", () => {
      document.querySelector(".modal__button")?.removeAttribute("disabled")
      removeFormInputError(input.parentElement)
    })
  })
})

async function updateTimePicker(date) {
  const [unavailableHours, firstAvailableHour] = await Promise.all([
    utils.unavailableHours(date),
    utils.firstScheduleAvailable(date),
  ])

  if (!timerpicker || !unavailableHours.success) {
    return
  }

  timerpicker.update({
    options: {
      clock: {
        type: "24h",
        currentTime: {
          updateInput: true,
          time: dayjs()
            .hour(firstAvailableHour.success ? firstAvailableHour.data : 9)
            .minute(0),
        },
        disabledTime: {
          hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, ...unavailableHours.data, 22, 23],
        },
      },
    },
    create: true,
  })
}

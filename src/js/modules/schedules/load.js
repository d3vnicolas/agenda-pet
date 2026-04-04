import services from "../services/handleSchedules"
import { clearSchedules, renderScheduleItems } from "../dom/renders"
import dayjs from "dayjs"

const today = dayjs().format("YYYY-MM-DD")
const inputAgendaDate = document.querySelector("input#date")

document.addEventListener("DOMContentLoaded", async () => {
  renderSchedules(today)

  inputAgendaDate.addEventListener("change", async (event) => {
    const selectedDate = event.target.value
    renderSchedules(selectedDate)
  })
})

export async function renderSchedules(date) {
  const schedulesByDate = await services.getSchedules(date)

  if (!schedulesByDate) return

  clearSchedules()
  renderScheduleItems(schedulesByDate)
}

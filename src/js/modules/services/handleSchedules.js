import { v4 as uuidv4 } from "uuid"

async function getSchedules(date) {
  try {
    const response = await fetch(`${process.env.API_URL}/schedules?date=${date}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Erro na requisição getSchedules: " + error)
    return {}
  }
}

async function createSchedule({
  tutor,
  petName,
  phone,
  service,
  modalDate: date,
  modalTime: hour,
}) {
  const id = uuidv4()

  try {
    const request = await fetch(`${process.env.API_URL}/schedules`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id,
        tutor,
        petName,
        phone,
        service,
        date,
        hour,
      }),
    })

    if (!request.ok) {
      console.error("Erro ao fazer requisição POST.")
      return request.ok
    }

    return request.ok
  } catch (error) {
    console.error("Erro na requisição createSchedule: " + error)
    return false
  }
}

async function getWorkSchedules() {
  try {
    const response = await fetch(`${process.env.API_URL}/workSchedules`)
    const data = await response.json()

    return data
  } catch (error) {
    console.error("Erro na requisição de horários de trabalho: " + error)
    return {}
  }
}

async function getUnavailableHours(date) {
  try {
    const unavailableSchedules = await getSchedules(date)
    const schedules = unavailableSchedules.map((schedule) => {
      return parseInt(schedule.hour.replace(":00", ""))
    })

    return schedules
  } catch (error) {
    console.error("Erro ao buscar horários disponíveis")
    return []
  }
}

async function getFirstScheduleAvailable(date) {
  try {
    const [unavailableHours, worksHours] = await Promise.all([
      getSchedules(date),
      getWorkSchedules(),
    ])

    const unavailableSchedules = unavailableHours.map((schedule) =>
      parseInt(schedule.hour.replace(":00", "")),
    )
    const availableSchedules = new Set(
      worksHours.hours.map((hour) => parseInt(hour.replace(":00", ""))),
    )

    for (const hour of unavailableSchedules) {
      availableSchedules.delete(hour)
    }

    return availableSchedules.values().next().value
  } catch (error) {
    console.error("Erro ao buscar o primeiro horário disponível: " + error)
    return false
  }
}

export default { getSchedules, createSchedule, getUnavailableHours, getFirstScheduleAvailable }

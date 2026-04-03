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
    return
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
      return
    }

    const response = await request.json()
    return response
  } catch (error) {
    console.error("Erro na requisição createSchedule: " + error)
    return
  }
}

export default { getSchedules, createSchedule }

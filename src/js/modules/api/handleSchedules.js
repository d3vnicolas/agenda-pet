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

async function createSchedule({ id, tutor, petName, service, date, hour }) {
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
        service,
        date,
        hour,
      }),
    })

    const response = await request.json()
    if (!response.ok) {
      console.error("Erro ao fazer requisição PUT.")
      return
    }

    return response
  } catch (error) {
    console.error("Erro na requisição createSchedule: " + error)
    return
  }
}

export default { getSchedules, createSchedule }

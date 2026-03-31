export async function getSchedules(date) {
  try {
    const response = await fetch(`${process.env.API_URL}/schedules?date=${date}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Erro na requisição getSchedules: " + error)
    return false
  }
}

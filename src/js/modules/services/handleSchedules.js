import { v4 as uuidv4 } from "uuid"

async function getSchedulesByDate(date) {
  try {
    const response = await fetch(`${process.env.API_URL}/schedules?date=${date}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error("Erro na requisição getSchedules: " + error)
    return {
      success: false,
      message: "Erro ao buscar agendamentos.",
    }
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
      return {
        success: false,
        message: "Erro ao criar o agendamento. Tente novamente.",
      }
    }

    return {
      success: true,
      data: "Agendamento criado com sucesso.",
    }
  } catch (error) {
    console.error("Erro na requisição createSchedule: " + error)
    return {
      success: false,
      message: "Erro ao criar o agendamento. Tente novamente.",
    }
  }
}

async function getWorkSchedules() {
  try {
    const response = await fetch(`${process.env.API_URL}/workSchedules`)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error("Erro na requisição de horários de trabalho: " + error)
    return {
      success: false,
      message: "Erro na requisição de horários de trabalho.",
    }
  }
}

async function deleteSchedule(id) {
  try {
    const response = await fetch(`${process.env.API_URL}/schedules/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })

    if (!response.ok) {
      return {
        success: false,
        message: "Erro ao deletar o agendamento.",
      }
    }

    return {
      success: true,
      message: "Agendamento removido com sucesso.",
    }
  } catch (error) {
    console.log("Erro na requisição de delete: " + error)
    return {
      success: false,
      message: "Erro na requisição de delete",
    }
  }
}

export default {
  getSchedulesByDate,
  createSchedule,
  getWorkSchedules,
  deleteSchedule,
}

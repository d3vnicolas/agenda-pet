import services from "../services/handleSchedules"

function isAvailable(schedule, schedules) {
  return !schedules.some((s) => s.hour === schedule.hour && s.date === schedule.date)
}

function isWorkSchedule({ hour }, workHours) {
  return workHours.includes(hour)
}

async function unavailableHours(date) {
  try {
    const unavailableSchedules = await services.getSchedulesByDate(date)

    if (!unavailableSchedules.success) {
      return unavailableSchedules
    }

    const schedules = unavailableSchedules.data.map((schedule) => {
      return parseInt(schedule.hour.replace(":00", ""))
    })

    return {
      success: true,
      data: schedules,
    }
  } catch (error) {
    console.error("Erro ao buscar horários disponíveis: " + error)
    return {
      success: false,
      message: "Erro ao buscar horários disponíveis",
    }
  }
}

async function firstScheduleAvailable(date) {
  try {
    const [unavailableHours, worksHours] = await Promise.all([
      services.getSchedulesByDate(date),
      services.getWorkSchedules(),
    ])

    if (!unavailableHours.success || !worksHours.success) {
      return {
        success: false,
        message: "Não foi possível buscar os horários disponíveis.",
      }
    }

    const unavailableSchedules = unavailableHours.data.map((schedule) =>
      parseInt(schedule.hour.replace(":00", "")),
    )
    const availableSchedules = new Set(
      worksHours.data.hours.map((hour) => parseInt(hour.replace(":00", ""))),
    )

    for (const hour of unavailableSchedules) {
      availableSchedules.delete(hour)
    }

    if (!availableSchedules.size) {
      return {
        success: false,
        message: "Não há horários disponíveis para este dia.",
      }
    }

    return {
      success: true,
      data: availableSchedules.values().next().value,
    }
  } catch (error) {
    console.error("Erro ao buscar o primeiro horário disponível: " + error)
    return {
      success: false,
      message: "Erro ao buscar o primeiro horário disponível.",
    }
  }
}

export default { isAvailable, isWorkSchedule, unavailableHours, firstScheduleAvailable }

import { removeFormInputError, renderFormInputError } from "../dom/renders"
import utils from "../utils/scheduleRules"
import services from "../services/handleSchedules"

export async function inputsValidation() {
  const inputs = document.querySelectorAll(".modal__form input")
  const textArea = document.querySelector(".modal__form textarea")
  const fields = [...inputs, textArea]
  let result = true

  for (const field of fields) {
    if (result) {
      result = await whichInput(field.getAttribute("name"), field)
    } else {
      await whichInput(field.getAttribute("name"), field)
    }
  }

  return result
}

async function whichInput(attr, field) {
  const result = {
    tutor: nameValidation,
    petName: petNameValidation,
    phone: phoneValidation,
    service: descriptionValidation,
    modalDate: validateScheduleDate,
    modalTime: validateScheduleDate,
  }
  const fn = result[attr]
  return fn ? await fn(field) : null
}

function nameValidation(field) {
  const regex = /^[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)+$/
  let result = true

  result = regex.test(field.value)
  !result
    ? renderFormInputError(field.parentNode, "Nome e/ou sobrenome inválido")
    : removeFormInputError(field.parentNode)

  return result
}

function petNameValidation(field) {
  const regex = /^(?=(?:.*[A-Za-zÀ-ÿ]){3,})[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)*$/
  let result = true

  result = regex.test(field.value)
  !result
    ? renderFormInputError(field.parentNode, "Nome do PET inválido")
    : removeFormInputError(field.parentNode)

  return result
}

function phoneValidation(field) {
  const regex = /^\(?\d{2}\)?\s?9\d{4}-?\d{4}$/
  let result = true

  result = regex.test(field.value)
  !result
    ? renderFormInputError(field.parentNode, "Telefone inválido")
    : removeFormInputError(field.parentNode)

  return result
}

function descriptionValidation(field) {
  const regex = /^\S+\s+\S+.*$/
  let result = true

  result = regex.test(field.value)
  !result
    ? renderFormInputError(field.parentNode, "Descrição inválida")
    : removeFormInputError(field.parentNode)

  return result
}

async function validateScheduleDate(field) {
  const inputDay = document.getElementById("modal-date").value
  const inputHour = document.getElementById("modal-time").value

  if (!inputDay || !inputHour) {
    renderFormInputError(field.parentNode, "Selecione data e horário")
    return false
  }

  const [schedules, workHours] = await Promise.all([
    services.getSchedulesByDate(inputDay),
    services.getWorkSchedules(),
  ])

  if (!schedules.success || !workHours.success) {
    console.error("Erro ao validar a data do agendamento.")
    renderFormInputError(field.parentNode, "Não foi possível validar o horário")
    return false
  }

  let isValid = utils.isAvailable({ hour: inputHour, date: inputDay }, schedules.data)

  isValid = isValid && utils.isWorkSchedule({ hour: inputHour }, workHours.data.hours)

  if (!isValid) {
    renderFormInputError(field.parentNode, "Agendamento indisponível")
    return false
  }

  removeFormInputError(field.parentNode)
  return true
}

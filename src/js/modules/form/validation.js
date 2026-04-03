import { removeFormInputError, renderFormInputError } from "../dom/renders"

export function inputsValidation() {
  const inputs = document.querySelectorAll(".modal__form input")
  const textArea = document.querySelector(".modal__form textarea")
  const fields = [...inputs, textArea]
  let result = true

  for (const field of fields) {
    if (field.getAttribute("name") === "modalDate" || field.getAttribute("name") === "modalTime") {
      continue
    }

    if (result) {
      result = whichInput(field.getAttribute("name"), field)
    } else {
      whichInput(field.getAttribute("name"), field)
    }
  }

  return result
}

function whichInput(attr, field) {
  const result = {
    tutor: nameValidation,
    petName: petNameValidation,
    phone: phoneValidation,
    service: descriptionValidation,
  }
  const fn = result[attr]
  return fn ? fn(field) : null
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

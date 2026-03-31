import dayjs from "dayjs"

export function initInputDate(wrapperDates) {
  const today = dayjs().format("YYYY-MM-DD")

  wrapperDates.forEach((dateWrapped) => {
    const inputDate = dateWrapped.querySelector("input[type=date]")
    const labelDate = dateWrapped.querySelector("span")
    const [year, month, day] = today.split("-")

    inputDate.value = today
    inputDate.min = today
    labelDate.innerText = `${day}/${month}/${year}`

    inputDate.addEventListener("change", function () {
      const dateValue = inputDate.value
      const [year, month, day] = dateValue.split("-")
      labelDate.innerText = `${day}/${month}/${year}`
    })

    dateWrapped.addEventListener("click", function () {
      inputDate.showPicker()
    })
  })
}

export function initInputTime(wrapperTime) {
  const input = wrapperTime.querySelector("input[type='time']")
  const label = wrapperTime.querySelector("span")

  const currentTimeWithTwo = dayjs().add(2, "hour").format("HH:mm")

  input.value = currentTimeWithTwo
  label.textContent = currentTimeWithTwo

  wrapperTime.addEventListener("click", () => {
    input.showPicker()
  })

  input.addEventListener("change", function () {
    const value = input.value

    if (!value) return

    const [hour, minute] = value.split(":")
    label.textContent = `${hour}:${minute}`
  })
}

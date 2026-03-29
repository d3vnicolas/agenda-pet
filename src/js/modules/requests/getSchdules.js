export async function getSchedules(date) {
  const response = await fetch(`http://localhost:3001/schedules?date=${date}`);
  const data = await response.json();

  return data;
}
export function getToday() {
  const date = new Date();
  const isoDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
  const today = isoDate.substr(0, 10)
  return today
}

export function getCurrentTime() {
  const currentTime = new Date().toLocaleTimeString('es-PE')
  return currentTime
}
export function formatDate (date: Date) {
  const d = new Date(date)

  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0') // 月份从0开始
  const day = String(d.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

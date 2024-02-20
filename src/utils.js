export function getCurrentTime() {
    // 創建一個新的 Date 物件，其中包含當前的日期和時間
    let currentDate = new Date()
    let year = currentDate.getFullYear()
    let month = currentDate.getMonth() + 1 // 月份是從 0 開始的，所以要加 1
    let day = currentDate.getDate()
    let hours = currentDate.getHours()
    let minutes = currentDate.getMinutes()
    let seconds = currentDate.getSeconds()

    //個位數前面補0
    month = (month < 10 ? '0' : '') + month
    day = (day < 10 ? '0' : '') + day
    hours = (hours < 10 ? '0' : '') + hours
    minutes = (minutes < 10 ? '0' : '') + minutes
    seconds = (seconds < 10 ? '0' : '') + seconds

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
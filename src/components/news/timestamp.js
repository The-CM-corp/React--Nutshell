const timestamp = () => {
  let currentDate = new Date()
    let date = currentDate.getDate()
    let month = currentDate.getMonth()
    let year = currentDate.getFullYear()
    let hour = currentDate.getHours()
    let min = ('0' + currentDate.getMinutes()).slice(-2)
    return `${month+1}-${date}-${year} ${hour}:${min}`
}

export default timestamp
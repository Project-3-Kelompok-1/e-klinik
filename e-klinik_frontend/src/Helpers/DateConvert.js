export const hoursAndMinutes = (time) => {
    const arrTime = time.split(":")
    return `${arrTime[0]}:${arrTime[1]}`
}
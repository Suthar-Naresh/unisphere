/*

1. Create date object: new Date()
EXAMPLES::
    new Date()
    new Date(value)
    new Date(dateString)
    new Date(dateObject)

    new Date(year, monthIndex)
    new Date(year, monthIndex, day)
    new Date(year, monthIndex, day, hours)
    new Date(year, monthIndex, day, hours, minutes)
    new Date(year, monthIndex, day, hours, minutes, seconds)
    new Date(year, monthIndex, day, hours, minutes, seconds, milliseconds)

2. To get current date time: Date.now()
    - It returns Unix Epoch
    - Converts it to GMT time/Date object (i.e. IST in my case) by new Date(value)

3. Date object to UTC: dateObject.toISOString()

4. Convert UTC string to date: new Date(dateString)
    - Returns Date object/GMT time

*/

function numberToMonth(n) {
    if (n === 0) return 'Jan'
    if (n === 1) return 'Feb'
    if (n === 2) return 'Mar'
    if (n === 3) return 'Apr'
    if (n === 4) return 'May'
    if (n === 5) return 'Jun'
    if (n === 6) return 'Jul'
    if (n === 7) return 'Aug'
    if (n === 8) return 'Sep'
    if (n === 9) return 'Oct'
    if (n === 10) return 'Nov'
    if (n === 11) return 'Dec'
}

export function UTC2date(utcString) {

    // Parse the UTC datetime string into a Date object
    const dateTime = new Date(utcString);

    // Extract the year, month, and date from the Date object
    const year = dateTime.getFullYear();
    const month = numberToMonth(dateTime.getMonth());
    const date = dateTime.getDate();

    return `${date} ${month}, ${year}`
}

export function UTC2time(utcString) {

    // Parse the UTC datetime string into a Date object
    var dateTime = new Date(utcString);

    // Extract hour & minutes from the Date object
    var hours = dateTime.getHours() % 12 || 12; // convert to 12-hour format
    var ampm = dateTime.getHours() < 12 ? "AM" : "PM";
    var minutes = dateTime.getMinutes() < 10 ? "0" + dateTime.getMinutes() : dateTime.getMinutes();

    if (hours < 10) hours = `0${hours}`;

    return `${hours}:${minutes} ${ampm}`;
}

/*
// Step 1: Parse the UTC time string into a Date object
const utcTimeString = "2023-03-15T13:05:00Z"; // Replace with your UTC time string
const utcTime = new Date(utcTimeString);

// Step 2: Use getUTCHours() to get the UTC hours
const utcHours = utcTime.getUTCHours();

// Step 3: Use getUTCMinutes() to get the UTC minutes
const utcMinutes = utcTime.getUTCMinutes();

console.log(`UTC Hours: ${utcHours}`);
console.log(`UTC Minutes: ${utcMinutes}`);
*/
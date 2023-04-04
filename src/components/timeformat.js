
export default function timeFormat (hour, minutes, seconds, amPm) {

    let date = new Date();

     hour = date.getHours();

     minutes = date.getMinutes();

     seconds = date.getSeconds();

     amPm;

    if (hour < 12) {

        amPm = "AM";
    }
    if (hour == 12) {

        amPm = "PM";

    } if (hour == 0) {

        amPm = "AM";

        hour = 12;

    }
    if (hour > 12) {

        amPm = "PM";

        hour = hour - 12;
    }

    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minutes < 10) {

        minutes = "0" + minutes;
    }
    if (seconds < 10) {

        seconds = "0" + seconds;
    }


    return hour + ":" + minutes + ":" + seconds + " " + amPm;

}
//Formats the date as a string
Date.prototype.formatDate = function () {

    return `${this.getDate()}.${this.getMonth() + 1}.${this.getFullYear()}`;
}

//Calculates the years since the given date
Date.prototype.calculateAge = function () {
    let now = new Date();
    let yearsOld = now.getFullYear() - this.getFullYear();

    return yearsOld;
}

//Calculates the distance between now and given date (the given date should be in the past)
Date.prototype.calculateTimeDistance = function () {
    let now = new Date();

    console.log(this);

    if (now < this) {
        return "The given date should be past";
    }

    let beforeYears = now.getFullYear() - this.getFullYear();
    let beforeMonths = now.getMonth() - this.getMonth();
    let beforeDays = now.getDate() - this.getDate();
    let beforeHours = now.getHours() - this.getHours();
    let beforeMinutes = now.getMinutes() - this.getMinutes();

    if (beforeMonths < 0) {
        beforeYears--;
        beforeMonths += 12;
    }

    if (beforeDays < 0) {
        beforeMonths--;
        beforeDays += 30;
    }

    const textResult = beforeDays > 0 ? beforeDays + " days ago" : beforeHours > 0 ? beforeHours + " hours ago" : beforeMinutes + " minutes ago";

    const result = `${beforeYears > 0 ? beforeYears + " years" : ""} ${beforeMonths > 0 ? beforeMonths + " months" : ""} ${textResult}`;

    return result;
}
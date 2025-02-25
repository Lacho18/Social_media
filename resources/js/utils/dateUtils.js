Date.prototype.formatDate = function () {

    return `${this.getDate()}.${this.getMonth() + 1}.${this.getFullYear()}`;
}

Date.prototype.calculateAge = function () {
    let now = new Date();
    let yearsOld = now.getFullYear() - this.getFullYear();

    return yearsOld;
}

Date.prototype.calculateTimeDistance = function () {
    let now = new Date();
    let beforeYears = now.getFullYear() - this.getFullYear();
    let beforeMonths = now.getMonth() - this.getMonth();
    let beforeDays = now.getDate() - this.getDate();

    if (beforeMonths < 0) {
        beforeYears--;
        beforeMonths += 12;
    }

    if (beforeDays < 0) {
        beforeMonths--;
        beforeDays += 30;
    }

    const result = `${beforeYears > 0 ? beforeYears + " years" : ""} ${beforeMonths > 0 ? beforeMonths + " months" : ""} ${beforeDays} days ago`;

    return result;
}
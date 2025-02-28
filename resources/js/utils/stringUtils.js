String.prototype.calcTimeOFStringDate = function () {
    const date = new Date(this);

    if (!date) return "Invalid date string!";

    const distance = date.calculateTimeDistance();

    return distance;
}
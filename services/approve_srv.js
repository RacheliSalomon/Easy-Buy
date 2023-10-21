const creditDB = require('../dal/credit_dal')
const moment = require('moment');
const today = moment();

exports.approveReturning = (policy, recipt, items) => {


    //אם היום הנוכחי גדול מתאריך הקניה + הימים בהם אפשר לקבל זיכוי
    //כלומר כבר אי אפשר להחזיר פריטים
    const purchaseDate = moment(recipt.DATE);
    const returningDays = policy.RETURNING_DAYS
    if (today.isAfter(purchaseDate.add(returningDays, 'days'))) {
        return "you can not returning this items"
    }


    var returningSum = 0;//כמה כסף יוחזר לקונה
    var meansOfReturning = "";//באיזה אופן יוחזר הכסף

    items.forEach(element => {
        returningSum += element.SUM;
    });


    //אם אני בתוך הימים בהם אפשר לקבל זיכוי כספי
    if (today.isBetween(purchaseDate, purchaseDate.add(policy.REFUND_DAYS, 'days'))) {
        meansOfReturning = "zikui kaspi"
    }
    else {
        meansOfReturning = "credit"
    }


    //אם אני בתוך הימים בהם אפשר לקבל החזר כספי מלא
    if (!today.isBetween(purchaseDate, purchaseDate.add(policy.FULL_REFUND_DAYS, 'days'))) {
        if (policy.DEDUCTION_PRECENTS != null) {
            if ((policy.DEPENDS_CREDIT && recipt.MEANS_OF_PAYMENT == 'credit') || !policy.DEPENDS_CREDIT) {
                returningSum = returningSum * (100 - policy.DEDUCTION_PRECENTS) / 100;
            }
        }
    }


    return returningSum + " " + meansOfReturning;

}




exports.approveChanging = (purchase, policy) => {

    const date = moment(purchase.DATE)
    if (today.isAfter(date.add(policy.CHANGING_DAYS, 'days')))
        return `you can not change this item `;
    return `you can not change this item `;
}



// מימוש זיכוי
exports.approveCrediting = (credit, sumForPyment) => {
    const expDate = moment(credit.EXPIRATION_DATE)

    if (expDate.isBefore(today)) {
        const stay = sumForPyment - credit.CREDIT_AMOUNT;
        if (stay < 0) {//כלומר נשאר בזיכוי כסף וצריך לעדכן אותו
            creditDB.updateCreditSum(credit.ID, -stay)
            return `you payed with the credit and you have ${-stay} money there`
        }

        else {//מחזיר כמה כסף צריך להוסיף כי נגמר הכסף בזיכוי
            creditDB.deleteCredit(credit.ID);
            return `you payed with the credit and you have to add ${stay} nis for payment`
        }

    }
}



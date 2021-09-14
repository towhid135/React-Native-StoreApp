import moment from 'moment/min/moment-with-locales';
class Order{
    constructor(id, item, totalAmount, date){
        this.id = id;
        this.item = item;
        this.totalAmount = totalAmount;
        this.date = date;
    }
    get readableDate() {
        moment.locale('en');
        return moment(this.id).format('MMMM Do YYYY, h:mm:ss');
    }
}

export default Order;
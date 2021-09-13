import moment from 'moment/min/moment-with-locales';
class Order{
    constructor(id, item, totalAmount, date){
        this.id = id;
        this.item = item;
        this.totalAmount = totalAmount;
        this.date = date;
    }
    get readableDate() {
        /*return this.date.toLocaleDateString('beng',{
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });*/
        moment.locale('en');
        return moment(this.id).format('MMMM Do YYYY, h:mm:ss');
    }
}

export default Order;
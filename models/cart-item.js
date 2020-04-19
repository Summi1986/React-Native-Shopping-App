export default class CartItem {
    constructor(price, title, quantity, sum, imageUrl) {
        this.price = price,
        this.title = title,
        this.quantity = quantity;
        this.sum = sum;
        this.imageUrl = imageUrl
    }
}
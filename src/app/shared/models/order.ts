export class Order {

    datePlaced: number;
    items: any[];

    constructor(userId, userName,
                public shipping) {

        this.datePlaced = new Date().getTime();
    }
}

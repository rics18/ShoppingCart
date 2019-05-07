import { Component } from '@angular/core';
import { Products} from './models/Products';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'Shopping Cart';

  private products: Products[];
  selectedOption: any;
  private cartProducts: Products[] = [];

  private totalAmt: number;
  private taxAmt: number;
  private grandTotal: number = 0;
  private itemTotal: number;
  imported: any = 0;


  constructor() {
    this.products = [
      {id: '01', name: 'Book 1', price: 10, tax: 0, totalTax: 0, itemTotal: 0, quantity: 1 },
      {id: '02', name: 'Book 2', price: 15, tax: 0, totalTax: 0, itemTotal: 0, quantity: 1  },
      {id: '03', name: 'Music CD', price: 20, tax: 10, totalTax: 0, itemTotal: 0, quantity: 1 },
      {id: '04', name: 'Small Chocolate', price: 5, tax: 0, totalTax: 0, itemTotal: 0, quantity: 1 },
      {id: '05', name: 'Big Chocolate', price: 12, tax: 0, totalTax: 0, itemTotal: 0, quantity: 1 },
      {id: '06', name: 'Headache Pills', price: 5, tax: 0, totalTax: 0, itemTotal: 0, quantity: 1 },
      {id: '07', name: 'Cold Syrup', price: 15, tax: 0, totalTax: 0, itemTotal: 0, quantity: 1 },
      {id: '08', name: 'Mobile Phone', price: 100, tax: 10, totalTax: 0, itemTotal: 0, quantity: 1 },
      {id: '09', name: 'Laptop', price: 450, tax: 10, totalTax: 0, itemTotal: 0, quantity: 1 },
      {id: '10', name: 'Perfume', price: 35, tax: 10, totalTax: 0, itemTotal: 0, quantity: 1 }
    ];
    this.selectedOption = this.products[0];
  }


  addCart() {

     this.totalAmt = 0;
     this.taxAmt = 0;
     this.itemTotal = 0;
     this.grandTotal = 0;

     this.totalAmt += (this.selectedOption.price * this.selectedOption.quantity);
     if ( this.totalAmt > 100) {
       this.totalAmt += this.totalAmt * 0.02;
     }
     this.selectedOption.itemTotal = this.totalAmt;

     if (this.imported) {
       this.taxAmt += (this.selectedOption.price * (this.selectedOption.tax + 5) / 100) * this.selectedOption.quantity;
     } else {
       this.taxAmt += (this.selectedOption.price * this.selectedOption.tax / 100) * this.selectedOption.quantity;
     }
     this.selectedOption.totalTax = this.taxAmt;
     this.selectedOption.itemTotal = this.totalAmt + this.taxAmt;

     if (this.cartProducts.find((test) => test.id === this.selectedOption.id) === undefined) {
      this.cartProducts.push(this.selectedOption);
     }

     for (let i = 0; i < this.cartProducts.length; i++) {
         this.grandTotal += this.cartProducts[i].itemTotal;
     }
  }

  removeCart(cart: Products, i: number): void {

      this.grandTotal = 0;
      this.cartProducts.splice(i,1);
      for (let i = 0; i < this.cartProducts.length; i++) {
        this.grandTotal += this.cartProducts[i].itemTotal;
      }
  }

  incQuantity(cart: Products, i: number) {

    this.cartProducts.splice(i,1 );
    this.totalAmt = 0;
    this.taxAmt = 0;
    this.itemTotal = 0;
    this.grandTotal = 0;

    this.totalAmt += (cart.price * cart.quantity);
    if ( this.totalAmt > 100) {
      this.totalAmt += this.totalAmt * 0.02;
    }
    cart.itemTotal = this.totalAmt;

    if (this.imported) {
      this.taxAmt += (this.selectedOption.price * (this.selectedOption.tax + 5) / 100) * this.selectedOption.quantity;
    } else {
      this.taxAmt += (this.selectedOption.price * this.selectedOption.tax / 100) * this.selectedOption.quantity;
    }
    cart.totalTax = this.taxAmt;
    cart.itemTotal = this.totalAmt + this.taxAmt;
    this.cartProducts.splice(i, 0 , cart);
    for (let i = 0; i < this.cartProducts.length; i++) {
      this.grandTotal += this.cartProducts[i].itemTotal;
    }
  }
}

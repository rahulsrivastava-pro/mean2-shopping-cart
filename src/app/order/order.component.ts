import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { ModalModule } from 'ng2-bs4-modal/ng2-bs4-modal';


import { ToastComponent } from '../shared/toast/toast.component';

import { DataService } from '../services/data.service';

@Component({
   selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

    //private cats = [];
    private products = [];

	private selectedproducts = [];

    private sizes = [];
    private colors = [];

  private isLoading = true;
  private isDataLoading = true;
  private isModalLoading = false;

    private product = {};
    private selectedproduct = {};

    private productSize = "";
    private productColor = "";
    private modalname = "";
    private imagepath = "";
    private productprice = "";
    private productQty = 1;

  private isEditing = false;

    private amount = {};

  constructor(private http: Http,
      private dataService: DataService,
              private toast: ToastComponent,
      private formBuilder: FormBuilder) {
  }

    ngOnInit() {

          this.isDataLoading = true;
          this.selectedproducts = [];
		  this.getSelectedProducts();
		  this.getSizes();
          this.getColors();
          this.getTotalAmount();
	  }

    getProducts() {
        this.dataService.getProducts().subscribe(
            data => this.products = data,
            error => console.log(error),
            () => this.isLoading = false
            );
    }
	

	getSelectedProducts() {
        this.dataService.getSelectedProducts().subscribe(
            data => {
			this.selectedproducts = data
			}
			,
            error => console.log(error),
            () => this.isDataLoading = false
            );
    }

    getSizes() {
        this.dataService.getSizes().subscribe(
            data => this.sizes = data,
            error => console.log(error),
            () => this.isLoading = false
            );
    }

    getColors() {
        this.dataService.getColors().subscribe(
            data => this.colors = data,
            error => console.log(error),
            () => this.isLoading = false
            );
    }

    getColorByCode(code) {
        var name = "";
        for (var i = 0; i < this.colors.length; i++) {
            if (this.colors[i].hexcode == code) {
                name = this.colors[i].name;
            }
        }
        return name;
    }


    loadProduct(product) {
        this.productSize = product.p_sizecode;
        this.productQty = product.p_quantity;
		this.productColor = product.p_colorcode;
        this.modalname = product.info.p_variation + " " + product.info.p_name;
        this.imagepath = product.info.p_image;
        this.productprice = product.info.p_originalprice;
        this.enableEditing(this.productSize, this.productColor);
        this.product = product;
    }

    selectColor(color) {
        this.productColor = color;
    }

    editProduct(prod) {
        this.selectedproduct = { p_id: prod.p_id, old_p_sizecode: prod.p_sizecode, old_p_colorcode: prod.p_colorcode, new_p_sizecode: this.productSize, new_p_colorcode: this.productColor, old_p_quantity: prod.p_quantity, new_p_quantity: this.productQty};
        this.dataService.editProduct(this.selectedproduct).subscribe(
            res => {
                this.productSize = "";
                this.productQty = 1;
                this.productColor = "";
                this.toast.setMessage("Item edited successfully.", "success");
                this.getSelectedProducts();
                this.getTotalAmount();
            },
            error => console.log(error)
            );
    }


    deleteProduct(prod) {
        if (window.confirm("Are you sure you want to permanently delete this item?")) {
            this.selectedproduct = { p_id: prod.p_id, p_sizecode: prod.p_sizecode, p_colorcode: prod.p_colorcode, p_quantity: prod.p_quantity };
            this.dataService.deleteProduct(this.selectedproduct).subscribe(
                res => {
                    this.productSize = "";
                    this.productColor = "";
                    this.toast.setMessage("Item deleted successfully.", "success");
                    this.getSelectedProducts();
                    this.getTotalAmount();
                },
                error => console.log(error)
                );
        }
    }

    enableEditing(size, color) {
        if (size != "" && color != "") {
            this.isEditing = true;
        }
        else {
            this.isEditing = false;
        }
    }



    getTotalAmount() {
        this.dataService.getTotal().subscribe(
            data => this.amount = data,
            error => console.log(error),
            () => this.isLoading = false
            );
    }
}



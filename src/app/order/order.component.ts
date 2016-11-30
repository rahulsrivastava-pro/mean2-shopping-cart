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

  private isEditing = false;


  constructor(private http: Http,
              private dataService: DataService,
              private toast: ToastComponent,
              private formBuilder: FormBuilder) { }

	  ngOnInit() {
		  this.getSelectedProducts();
		  this.getSizes();
		  this.getColors();
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

    loadProduct(product) {
		this.productSize = 	product.p_sizecode;
		this.productColor = product.p_colorcode;
		this.modalname = product.info.p_variation + " " + product.info.p_name;
        //this.product = product;
    }

    addProduct(prod) {
        this.selectedproduct = {p_id : prod.p_id, p_sizecode: this.productSize, p_colorcode: this.productColor};
        this.dataService.addProduct(this.selectedproduct).subscribe(
            res => {
                this.productSize = "";
                this.productColor = "";
                this.toast.setMessage("item added successfully.", "success");
            },
            error => console.log(error)
            );
    }


    

    enableEditing(product) {
        this.isEditing = true;
        this.product = product;
    }


    cancelEditing() {
        this.isEditing = false;
        this.product = {};
        this.toast.setMessage("item editing cancelled.", "warning");
        // reload the cats to reset the editing
        this.getProducts();
    }

}


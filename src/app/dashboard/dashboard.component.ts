import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { ModalModule } from 'ng2-bs4-modal/ng2-bs4-modal';


import { ToastComponent } from '../shared/toast/toast.component';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    //private cats = [];
    private products = [];
    private sizes = [];
    private colors = [];

  private isLoading = true;

    private product = {};
    private selectedproduct = {};

    private productSize = "";
    private productColor = "";
    private modalname = "";
    private imagepath = "";
    private productprice = "";
    private productQty = 1;

  private isEditing = false;


  constructor(private http: Http,
              private dataService: DataService,
              private toast: ToastComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.getProducts();
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
        this.productSize = "";
        this.productColor = "#A3D2A1";
        this.productQty = 1;
        this.modalname = product.p_variation + " " + product.p_name;
        this.imagepath = product.p_image;
        this.productprice = product.p_originalprice;
        this.product = product;
    }

    selectColor(color) {
        this.productColor = color;
    }

    addProduct(prod) {
     
        this.selectedproduct = { p_id: prod.p_id, p_sizecode: this.productSize, p_colorcode: this.productColor, p_quantity: this.productQty };

        this.dataService.addProduct(this.selectedproduct).subscribe(
            res => {

                this.productSize = "";
                this.productColor = "";
                this.productQty = 1;
                this.toast.setMessage("item added successfully.", "success");
            },
            error => console.log(error)
            );
    }


    

    enableEditing(size, color) {
        if (size != "" && color != "") {
            this.isEditing = true;
        }
        else {
            this.isEditing = false;
        }
    }

}

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
        this.product = product;
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

    /*

    getCats() {
    this.dataService.getCats().subscribe(
        data => this.cats = data,
        error => console.log(error),
        () => this.isLoading = false
    );
    }

  addCat() {
    this.dataService.addCat(this.addCatForm.value).subscribe(
      res => {
        var newCat = res.json();
        this.cats.push(newCat);
        this.addCatForm.reset();
        this.toast.setMessage("item added successfully.", "success");
      },
      error => console.log(error)
    );
  }

  enableEditing(cat) {
    this.isEditing = true;
    this.cat = cat;
  }

  cancelEditing() {
    this.isEditing = false;
    this.cat = {};
    this.toast.setMessage("item editing cancelled.", "warning");
    // reload the cats to reset the editing
    this.getCats();
  }

  editCat(cat) {
    this.dataService.editCat(cat).subscribe(
      res => {
        this.isEditing = false;
        this.cat = cat;
        this.toast.setMessage("item edited successfully.", "success");
      },
      error => console.log(error)
    );
  }

  deleteCat(cat) {
    if(window.confirm("Are you sure you want to permanently delete this item?")) {
      this.dataService.deleteCat(cat).subscribe(
        res => {
          var pos = this.cats.map(cat => { return cat._id }).indexOf(cat._id);
          this.cats.splice(pos, 1);
          this.toast.setMessage("item deleted successfully.", "success");
        },
        error => console.log(error)
      );
    }
  }
    */
}

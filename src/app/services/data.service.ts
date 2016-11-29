import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getCats() {
    return this.http.get('/cats').map(res => res.json());
  }

  addCat(cat) {
    return this.http.post("/cat", JSON.stringify(cat), this.options);
  }

  editCat(cat) {
    return this.http.put(`/cat/${cat._id}`, JSON.stringify(cat), this.options);
  }

  deleteCat(cat) {
    return this.http.delete(`/cat/${cat._id}`, this.options);
  }
  
 
    getColors() {
        return this.http.get('/colors').map(res => res.json());
    }  

    getSizes() {
        return this.http.get('/sizes').map(res => res.json());
    }  
    
    getProducts() {
        return this.http.get('/products').map(res => res.json());
    }  

	getProductById(p_id) {
		return this.http.get('/products/${p_id}').map(res => res.json());
	}

    getSelectedProducts() {
        return this.http.get('/selectedproducts').map(res => res.json());
    }  
 
    addProduct(product) {
        return this.http.post("/selectedproducts", JSON.stringify(product), this.options);
    }

    editProduct(product) {
        return this.http.post("/updateselectedproducts", JSON.stringify(product), this.options);
    }

    deleteProduct(product) {
        return this.http.post("/deleteselectedproducts", JSON.stringify(product), this.options);
    }

    getTotal() {
        return this.http.get('/calculateTotal').map(res => res.json());
    } 
}

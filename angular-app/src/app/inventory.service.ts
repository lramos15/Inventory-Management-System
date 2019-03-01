import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { currentUser } from './mock-data';
import { Item } from './item';
import { Inventory } from './inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  getInventories(): Observable<Inventory[]> {

    return this.http.get<any>('http://localhost:3000/mock').pipe(map(res => {
      const inventories = [];
      res = res.inventories;
      for (let i = 0; i < res.length; i++) {
        inventories[i] = new Inventory(res[i]);
      }
      return inventories;
    }));
  }

  createInventory(inv: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>('http://localhost:3000/inventory/create', inv);
  }

  addItem(inv: Inventory, itemsArray: Item[]): Observable<Inventory> {
    return this.http.post<Inventory>('http://localhost:3000/inventory/additem', {user: currentUser, inventory: inv, items: itemsArray});
  }
}
import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'https://api-gateway-511845341063.us-east4.run.app';

    headers = new HttpHeaders().set('Content-Type', 'application/json')


    constructor(private http: HttpClient) {}


    getDataUsers(): Observable<any> {
        return this.http.get(`${this.apiUrl}/users/users`);
    }

    postDataUsers(userData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/users/users`, userData,{ headers: this.headers});
    }

    updateUser(userId: string, userData: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/users/users/${userId}`, userData);
    }

    deleteUser(userId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/users/users/${userId}`);
    }

    getDataInventory(): Observable<any> {
        return this.http.get(`${this.apiUrl}/inventory/inventarios`);
    }

    postDataInventory(inventoryData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/inventory/inventarios`, inventoryData,{ headers: this.headers});
    }

    getDataTransactionsInventory(inventario_id: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/inventory/transacciones/${inventario_id}`);
    }

    postDataTransactionsInventory(transactionData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/inventory/transacciones`, transactionData);
    }


}

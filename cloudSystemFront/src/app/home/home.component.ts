import { Component, OnInit } from '@angular/core';
import { Product } from 'src/libs/models/product';
import { User } from 'src/libs/models/user';
import { ApiService } from 'src/libs/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  viewUsers:boolean = false;
  viewInventory:boolean = false;
  openedDrawer:boolean = false;
  addInventary:boolean = false;
  users: User[] = [];
  products: Product[] = [];
  userSelect:any= null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

  }

  loadUsers(){
    this.viewInventory = false;
    this.viewUsers = !this.viewUsers;
    this.apiService.getDataUsers().subscribe(
      (response) => {
        if(response){
          this.users = response;
        }

      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
  }

  crearUser(){
    this.addInventary = false;
    this.openedDrawer = true;
  }

  onDrawerClosed() {
      this.openedDrawer = false;
      this.userSelect = null;
  }

  editUser(user:any, index:any){
        this.addInventary = false;
    this.openedDrawer = true;
    this.userSelect= user;
  }

  deleteUser(user:any){
    this.apiService.deleteUser(user.id).subscribe(
      (response) => {
        console.log('Usuario eliminado:', response);
        this.users = this.users.filter(userStatic => userStatic.id !== user.id);
      },
      (error) => {
        console.error('Error al eliminar el usuario:', error);
      }
    );
  }

  loadInventory(){
    this.viewUsers = false;
    this.viewInventory = !this.viewInventory;
    this.apiService.getDataInventory().subscribe(
      (response) => {
        if(response){
          this.products= response;
        }

      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
  }

  crearInventary(){
    this.addInventary = true;
    this.openedDrawer = true;
  }



}

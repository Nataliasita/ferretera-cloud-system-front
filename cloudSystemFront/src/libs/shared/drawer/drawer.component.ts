import { Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/libs/models/user';
import { ApiService } from 'src/libs/services/api.service';
import { Product } from 'src/libs/models/product';


@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {
  @Input() user:any;
  @Input() inventary:any;
  @Output() closed = new EventEmitter<void>();

  isDrawerOpen = false;
  userForm!: FormGroup;
  inventarioForm: FormGroup;
  userFormat:any;

  constructor(private fb: FormBuilder,private apiService: ApiService) {
    this.inventarioForm = this.fb.group({
      inventario_id: ['', [Validators.required, Validators.min(1)]],
      producto_id: ['', [Validators.required, Validators.min(1)]],
      cantidad_disponible: ['', [Validators.required, Validators.min(0)]],
      fecha_actualizacion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const userData = this.user || {};

    this.userForm = this.fb.group({
      celular: [
        userData.celular? this.user.celular :'', [Validators.required, Validators.pattern(/^\d+$/)]
      ],
      email: [
        userData.email? this.user.email:'', [Validators.required, Validators.email]
      ],
      estado: [
        userData.estado? this.user.estado :'', Validators.required
      ],
      fecha_creacion: [
        userData.fecha_creacion? this.user.fecha_creacion: '', Validators.required
      ],
      id: [
        userData.id? this.user.id:'', Validators.required
      ],
      nombre: [
        userData.nombre? this.user.nombre: '', Validators.required
      ],
      permisos:[
        userData.permisos? this.user.permisos:''
      ],
      rol: [
        userData.rol? this.user.rol:'', Validators.required
      ],
    });
  }

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  closeDrawer(){
    this.user = {}
    this.userForm.reset({
      celular: '',
      email: '',
      estado: '',
      fecha_creacion: '',
      id: '',
      nombre: '',
      permisos: '',
      rol: '',
    });

    this.closed.emit();
  }

  onSubmit() {
      if (this.userForm.valid) {
        const userCreated: User = this.userForm.value;
        const permisosArray: any = []
        permisosArray.push(userCreated.permisos)

        this.userFormat = { ...userCreated, permisos: permisosArray };

        this.apiService.postDataUsers(this.userFormat).subscribe(
          (response) => {
            console.log('Usuario creado:', response);
            this.closeDrawer();
          },
          (error) => {
            console.error('Error al crear usuario:', error);
          }
        );
      } else {
        console.log('El formulario es inválido');
      }
  }

  onEditUser(){
    if (this.userForm.valid) {
      const userEdited: User = this.userForm.value;
      const permisosArray: any = []
      permisosArray.push(userEdited.permisos)

      this.userFormat = { ...userEdited, permisos: permisosArray };

      console.log('Formulario enviado:',this.userFormat);

      this.apiService.updateUser(this.userFormat.id,this.userFormat).subscribe(
        (response) => {
          console.log('Usuario Editado:', response);
          this.closeDrawer();
        },
        (error) => {
          console.error('Error al editar usuario:', error);
        }
      );
    } else {
      console.log('El formulario es inválido');
    }
}

onSubmitInventary(): void {
  if (this.inventarioForm.valid) {
    const inventarioData: Product = this.inventarioForm.value;
    console.log('Datos del formulario:', inventarioData);
    this.apiService.postDataInventory(inventarioData).subscribe(
      (response) => {
        console.log('Inventario Creado:', response);
        this.closeDrawer();
      },
      (error) => {
        console.error('Error al crear inventario', error);
      }
    );
  } else {
    console.log('Formulario inválido');
  }
}

}

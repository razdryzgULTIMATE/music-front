import { Component } from '@angular/core';
import {IUser} from '../../interfaces/IUser';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: '../sign-in/sign-in.component.css'
})
export class SignUpComponent {
  user: IUser = {
    username: '',
    password: '',
  }
}

import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IUser} from '../../interfaces/IUser';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  user: IUser = {
    username: '',
    password: '',
  }
}

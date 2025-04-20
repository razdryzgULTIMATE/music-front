import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: '../sign-in/sign-in.component.css'
})
export class SignUpComponent {
  private authService = inject(AuthService)
  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })
  constructor(private router: Router) {
  }
  onSubmit(){
    console.log(this.form.value)
    if(this.form.valid){
      //@ts-ignore
      this.authService.registration(this.form.value)
      this.router.navigate(['/sign-in'])
    }

  }
}

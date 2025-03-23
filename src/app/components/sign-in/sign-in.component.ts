import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {from, map} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  private authService = inject(AuthService)
  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })
  constructor(private router: Router) {
  }
  onSubmit(){
    if(this.form.valid){
      //@ts-ignore
      this.authService.login(this.form.value).subscribe(s => {

        console.log(s)
      })
      // this.router.navigate([`/cabinet/${this.form.value.username}`])
      this.router.navigate([''])
    }

  }


}

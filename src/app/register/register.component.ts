import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthService) { 
    console.log('Componente Register se ha inicializado');
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator }); 
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const registerData = {
        username: this.registerForm.get('username')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value
      };
      
      this.authService.register(registerData).subscribe(
        response => {
          console.log("Registro exitoso", response);
          window.alert("Registro exitoso");
        },
        error => {
          console.log("Error durante el registro", error);
          window.alert("Error durante el registro");
        }
      );
    } else {
      console.error('Errores en el formulario:', this.registerForm);
      /*Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control) { 
          const controlErrors: ValidationErrors | null = control.errors;
          if (controlErrors != null) {
            Object.keys(controlErrors).forEach(keyError => {
              console.error('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
            });
          }
        }
      });*/

      if (this.registerForm.hasError('passwordMismatch')) {
        window.alert("Las contraseñas no coinciden");
      } else {
        window.alert("Formulario no válido");
      }
    }
  }

  passwordsMatchValidator(group: FormGroup): { [s: string]: boolean } | null {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }
  
}

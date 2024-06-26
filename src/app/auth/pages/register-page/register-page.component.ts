import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';
// import * as customValidators from '../../../shared/validators/validators';
//import { cantBeStrider } from '../../../shared/validators/validators';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  // En username: Como cantBeStrider es sincrono se envia en el segundo parametro
  // En email: Validators.email No se usa porque si digito por ejemplo wvelandia@gmail ya me lo esta aceptando con un email valido y no es así.
  public myForm: FormGroup = this.fb.group({
    /* name: [ '', [ Validators.required, Validators.pattern( customValidators.firstNameAndLastnamePattern ) ] ],
    email: [ '', [ Validators.required, Validators.pattern( customValidators.emailPattern ) ] ],
    username: [ '', [ Validators.required, customValidators.cantBeStrider ] ], */
    // Una forma de utilizar el validador asincrono es: new EmailValidatorService()
    // Si se tiene algo mas complicado que el validador establezca una conexion o se useen otra instancia lo hacemos por inyeccion en nuestro constructor.
    name: [ '', [ Validators.required, Validators.pattern( this.validatorsService.firstNameAndLastnamePattern ) ] ],
    //email: [ '', [ Validators.required, Validators.pattern( this.validatorsService.emailPattern ) ], [ new EmailValidatorService() ] ],
    email: [ '', [ Validators.required, Validators.pattern( this.validatorsService.emailPattern ) ], [ this.emailValidator ] ],
    username: [ '', [ Validators.required, this.validatorsService.cantBeStrider ] ],
    password: [ '', [ Validators.required, Validators.minLength(6) ] ],
    password2: [ '', [ Validators.required ] ]
  }, {
    // Estas funciones aca en el objeto Validators, pasan como argumento implicito en todo el formulario
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo( 'password', 'password2' )
    ]
  });

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidatorService
  ) {}

  isValidField( field: string ) {
    // Obtener validación desde un servicio
    return this.validatorsService.isValidField( this.myForm, field );
  }

  onSubmit() {
    // Aca ejecutamos este consol si pasa las validaciones de Validators
    if ( this.myForm.invalid ) {
      // Aca si el usuario no toca los input y solo el boton de
      // guardar se requiere de que se hagan las validaciones y
      // para ello se usa la propiedad de markAllAsTouched() y con
      // ello marca que todos los campos fueron tocados para poder ejecutar las validaciones.
      this.myForm.markAllAsTouched();
      return;
    };

    console.log(this.myForm.value);
  }

}

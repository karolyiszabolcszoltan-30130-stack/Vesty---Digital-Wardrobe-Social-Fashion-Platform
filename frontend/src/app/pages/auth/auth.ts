
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import {
    AbstractControl,
    FormBuilder,
    ReactiveFormsModule,
    ValidationErrors,
    Validators,
} from '@angular/forms';

type AuthMode = 'login' | 'register';

function passwordMatchValidator(
    control: AbstractControl,
): ValidationErrors | null {

    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordConfirm')?.value;

    if (!password || !passwordConfirm) {
        return null;
    }

    return password === passwordConfirm
        ? null
        : { passwordMismatch: true };
}


@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterLink,
    ],
    templateUrl: './auth.html',
    styleUrl: './auth.scss',
})
export class AuthComponent {

    private readonly formBuilder = inject(FormBuilder);
    private readonly route = inject(ActivatedRoute);

    protected readonly mode: AuthMode =
        this.route.snapshot.data['mode'] === 'register'
            ? 'register'
            : 'login';

    protected readonly showPassword = signal(false);

    protected readonly notice = signal('');

    protected readonly loginForm =
        this.formBuilder.nonNullable.group({

            email: [
                '',
                [
                    Validators.required,
                    Validators.email,
                ],
            ],

            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(8),
                ],
            ],

        });

    protected readonly registerForm =
        this.formBuilder.nonNullable.group({

            displayName: [
                '',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(40),
                ],
            ],

            email: [
                '',
                [
                    Validators.required,
                    Validators.email,
                ],
            ],

            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(8),
                ],
            ],

            passwordConfirm: [
                '',
                [
                    Validators.required,
                ],
            ],

        }, {
            validators: passwordMatchValidator,
        });

    protected togglePasswordVisibility(): void {
        this.showPassword.update((visible) => !visible);
    }

    protected onSubmit(): void {

        this.notice.set('');

        const activeForm = this.mode === 'register'
            ? this.registerForm
            : this.loginForm;

        activeForm.markAllAsTouched();

        if (activeForm.invalid) {

            this.notice.set(
                'Kérjük, ellenőrizd a megadott adatokat és javítsd a hibás mezőket.',
            );

            return;
        }

        if (this.mode === 'register') {

            this.notice.set(
                'Az űrlap ellenőrzése sikeres. A valódi fiók létrehozásához még szükséges a saját backend API bekötése.',
            );

        } else {

            this.notice.set(
                'Az űrlap ellenőrzése sikeres. A tényleges bejelentkezés még nincs bekötve a backendbe.',
            );

        }

    }

}

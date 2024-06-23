import { AbstractControl } from '@angular/forms';

export function PasswordStrengthValidator(control: AbstractControl) {
  const value: string = control.value || '';

  const upperCaseCharacters = /[A-Z]+/g;
  const lowerCaseCharacters = /[a-z]+/g;
  const numberCharacters = /[0-9]+/g;
  const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g;
  const whitespaceCharacters = /\s/;

  if (value.length < 8) {
    return { passwordStrength: 'Das Passwort muss mindestens 8 Zeichen lang sein' };
  }

  if (!upperCaseCharacters.test(value)) {
    return { passwordStrength: 'Das Passwort muss mindestens einen Großbuchstaben enthalten' };
  }

  if (!lowerCaseCharacters.test(value)) {
    return { passwordStrength: 'Das Passwort muss mindestens einen Kleinbuchstaben enthalten' };
  }

  if (!numberCharacters.test(value)) {
    return { passwordStrength: 'Das Passwort muss mindestens eine Zahl enthalten' };
  }

  if (!specialCharacters.test(value)) {
    return { passwordStrength: 'Das Passwort muss mindestens ein Sonderzeichen enthalten' };
  }

  if (whitespaceCharacters.test(value)) {
    return { passwordStrength: 'Das Passwort darf keine Leerzeichen enthalten' };
  }

  return null;
}
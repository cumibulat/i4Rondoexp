import { FormControl } from "@angular/forms";
import { parsePhoneNumberFromString } from "libphonenumber-js/max";

export class PhoneValidator {
  // Inspired on: https://github.com/yuyang041060120/ng2-validation/blob/master/src/equal-to/validator.ts
  static isValid(control: FormControl): any {
    if (control.value !== "") {
      try {
        let phoneNumber = "" + control.value + "",
          number = parsePhoneNumberFromString(phoneNumber, "ID"),
          isValidNumber = number.isValid();

        if (isValidNumber) {
          return null;
        }
      } catch (e) {
        return {
          validCountryPhone: true
        };
      }
      return {
        validCountryPhone: true
      };
    } else {
      return null;
    }

    /** 
    let subscribe: boolean = false;

    return (phoneControl: AbstractControl): { [key: string]: boolean } => {
      if (!subscribe) {
        subscribe = true;
        countryControl.valueChanges.subscribe(() => {
          phoneControl.updateValueAndValidity();
        });
      }
      if (phoneControl.value !== "") {
        try {
          const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
          let phoneNumber = "" + phoneControl.value + "",
            region = countryControl.value.iso,
            number = phoneUtil.parse(phoneNumber, region),
            isValidNumber = phoneUtil.isValidNumber(number);
          if (isValidNumber) {
            return null;
          }
        } catch (e) {
          return {
            validCountryPhone: true
          };
        }
        return {
          validCountryPhone: true
        };
      } else {
        return null;
      }
    };

    */
  }
}

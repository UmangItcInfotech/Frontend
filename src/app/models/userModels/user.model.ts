export class User {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    dob: Date;
    email: string;
    password: string;
  
    constructor(
      firstName: string,
      lastName: string,
      phoneNumber: string,
      dob: Date,
      email: string,
      password: string
    ) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.phoneNumber = phoneNumber;
      this.dob = dob;
      this.email = email;
      this.password = password;
    }
  }
  
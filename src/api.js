// api.js

// User DB array
let userDb = [
    { user_name: 'joe', dob: new Date('2000-01-01'), email: 'joe@kundabox.com', password: '12ABCabc' }
  ];
  
  // Error codes
  export const USER_ALREADY_REGISTERED = 'USER_ALREADY_REGISTERED';
  export const INVALID_NAME = 'INVALID_NAME';
  export const INVALID_DOB = 'INVALID_DOB';
  export const INVALID_EMAIL = 'INVALID_EMAIL';
  export const INVALID_PASSWORD = 'INVALID_PASSWORD';
  
  // API function
  export function insert_user(user_name, dob, email, password) {
    // Check if user already exists
    if (userDb.some(user => user.user_name === user_name || user.email === email)) {
      return { result: false, code: USER_ALREADY_REGISTERED };
    }
  
    // Check name length and uniqueness
    if (user_name.length < 5 || user_name.length > 16 || userDb.some(user => user.user_name === user_name)) {
      return { result: false, code: INVALID_NAME };
    }
  
    // Check date of birth
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
    if (dob > eighteenYearsAgo) {
      return { result: false, code: INVALID_DOB };
    }
  
    // Check email format and uniqueness
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || userDb.some(user => user.email === email)) {
      return { result: false, code: INVALID_EMAIL };
    }
  
    // Check password format
    const passwordRegex = /^(?=.*\d.*\d)(?=.*[A-Z]).{5,16}$/;
    if (!passwordRegex.test(password)) {
      return { result: false, code: INVALID_PASSWORD };
    }
  
    // Insert user into DB and return success
    userDb.push({ user_name, dob, email, password });
    return { result: true, code: null };
  }
  
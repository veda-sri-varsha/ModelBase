import validator from 'validator';

const validateSignupData = (req) => {
  const { name, age, email, password } = req.body;
 if (!name){
  throw new Error("Name is required");
 }
 else if(typeof age !== 'number'){
   throw new Error("Age must be a number");
 }
 else if(!validator.isEmail(email)) {
   throw new Error("Invalid email format");
 }
 else if(!validator.isLength(password, { min: 6 })) {
   throw new Error("Password must be at least 6 characters long");
 }
};

export default validateSignupData;

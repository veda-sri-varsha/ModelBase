import mongoose from "mongoose";
import validator from "validator"; // import validator package

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Name is required"], 
    trim: true, 
    minlength: [2, "Name must be at least 2 characters"]
  },
  age: { 
    type: Number, 
    required: [true, "Age is required"], 
    min: [0, "Age cannot be negative"] 
  },
  email: { 
    type: String, 
    required: [true, "Email is required"], 
    unique: true, 
    lowercase: true,
    validate: {
      validator: function(value) {
        return validator.isEmail(value); // check valid email
      },
      message: (props) => `${props.value} is not a valid email!`
    }
  }
}, { timestamps: true }); // adds createdAt and updatedAt automatically

// Create model
const User = mongoose.model("User", userSchema);

export default User;

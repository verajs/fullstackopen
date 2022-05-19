const mongoose = require('mongoose')


const url = `mongodb+srv://phonebook:${process.env.password}@phonebook.t1qs1.mongodb.net/Phonebook?retryWrites=true&w=majority`

console.log('connecting to', url)

const numberValidators = [
  {
    // Minimum length validator
    validator: (number) => {
      if ((number[2] === "-" || number[3] === "-") && number.length < 9) {
        return false;
      }
      return true;
    },
    msg: "must be at least 8 digits",
  },
  {
    // Regex validator to allow only numbers
    validator: (number) => {
      return /^\d{2,3}-\d+$/.test(number);
    },
    msg: "invalid phone number",
  },
];


mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const phoneSchema = new mongoose.Schema({
    name: {
      type: String,
      minlength: 3,
      required: true,
    },
    number: {
      type: String,
      validate: numberValidators,
      required: true,
    },
  });
  phoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

 

module.exports = mongoose.model("Contact", phoneSchema)
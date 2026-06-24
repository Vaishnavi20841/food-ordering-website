const mongoose= require('mongoose');

// define the Address Schema
const AddressSchema = new mongoose.Schema({
    fullName: String,
    streetAddress: String,
    city:String,
    state: String,
    postalCode:String,
    country:String,
});

// define and export the Address model
const Address = mongoose.model('Address',AddressSchema);
module.exports = Address;
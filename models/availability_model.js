const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// create new instance of the mongoose.schema. the schema takes an
// object that shows the shape of your database entries.
const AvailabilitySchema = new Schema({
    hotel: String,
    hotelname: String,
    created_by: String,
    updated_by: String,
    notes: String,
    type: Array,
    availability: Object,
    date: String,
    month: {
        month: String,
        yearly: String,
    },
    nameweeks: String,
}, { timestamps: true });
// export our module to use in server.js
module.exports = mongoose.model('availability', AvailabilitySchema);
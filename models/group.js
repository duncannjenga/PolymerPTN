var mongoose = require('mongoose');

var Groupschema = new mongoose.Schema({
    code:String,
    group: String,
});
module.exports = mongoose.model("Group", Groupschema);
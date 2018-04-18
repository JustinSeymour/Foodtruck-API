import mongoose from 'mongoose';
import FoodTruck from './foodTruck';
let Schema = mongoose.Schema;

let ReviewSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    test: String,
    foodTruck: {
        type: Schema.Types.ObjectId,
        ref: 'FoodTruck',
        required: true
    }
});

module.exports = mongoose.model('Review', ReviewSchema);
import mongoose from 'mongoose';
import { Router } from 'express';
import FoodTruck from '../model/foodTruck';
import Review from '../model/review';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
    let api = Router();

    //'/v1/foodTruck/add'
    api.post('/add', authenticate, (req, res) => {
        let newFoodTruck = new FoodTruck();
        newFoodTruck.name = req.body.name;
        newFoodTruck.foodType = req.body.foodType;
        newFoodTruck.avgCost = req.body.avgCost;
        newFoodTruck.geometry.coordinates = req.body.geometry.coordinates;

        newFoodTruck.save(err => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'FoodTruck saved successfully'});
        });
    });


    // 'v1/foodTruck' - read
    api.get('/', authenticate, (req, res) => {
        FoodTruck.find({}, (err, foodTrucks) => {
            if (err) {
                res.send(err);
            }
            res.json(foodTrucks);
        });
    });

    // 'v1/foodTruck/:id' - read 1
    api.get('/:id', (req, res) => {
        FoodTruck.findById(req.params.id, (err, foodTruck) => {
            if (err) {
                res.send(err)
            }
            res.json(foodTruck);
        });
    });

    // 'v1/foodTruck/:id' - Update 
    api.put('/:id', (req, res) => {
        FoodTruck.findById(req.params.id, (err, foodTruck) => {
            if (err) {
                res.send(err);
            }
            foodTruck.name = req.body.name;
            foodTruck.foodType = req.body.foodType;
            foodTruck.avgCost = req.body.avgCost;
            foodTruck.geometry.coordinates = req.body.geometry.coordinates;
            
            foodTruck.save(err => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'FoodTruck info updated'});
            });
        });
    });

    // 'v1/foodTruck/:id' - Delete
    api.delete('/:id', (req, res) => {
        FoodTruck.remove({
            _id: req.params.id
        }, (err, foodTruck) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: "FoodTruck Successfully Removed!"});
        });
    }); 

    // v1/foodTruck/reviews/add/:id 
    api.post('/reviews/add/:id', (req, res) => {
        FoodTruck.findById(req.params.id, (err, foodTruck) => {
            if (err) {
                res.send(err);
            }
            let newReview = new Review();
            newReview.title = req.body.title;
            newReview.text = req.body.text;
            newReview.foodTruck = foodTruck._id;
            newReview.save((err, review) => {
                if (err) {
                    res.send(err);
                }
                foodTruck.reviews.push(newReview);
                foodTruck.save(err => {
                    if (err) {
                        res.send(err);
                    }
                    res.json({ message: 'Food truck review saved!'});
                });
            });
        });
    });

    // get reviews for a specific food truck id
    // '/v1/foodtruck/reviews/:id'
    api.get('/reviews/:id', (req, res) => {
        Review.find({foodTruck: req.params.id}, (err, reviews) => {
            if (err) {
                res.send(err);
            }
            res.json(reviews);
        });
    });

    return api;
}
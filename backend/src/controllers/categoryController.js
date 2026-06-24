const categoryService = require("../services/category.service");
const userService = require("../services/user.service");
const Category = require("../models/category.model");

module.exports = {
    async createCategory(req,res){
    try{
        const { name, restaurantId } = req.body;

       const createdCategory = await categoryService.createCategory(
    name,
    restaurantId
);

        res.status(200).json(createdCategory);
    } catch(error){
        res.status(400).json({
            error:error.message
        });
    }
},

    async getRestaurantCategory(req,res){
        try{
            const { restaurantId } = req.params;

            const user = req.user;
           const categories = await categoryService.findCategoryByRestaurantId(restaurantId);
            res.status(200).json(categories);
        } catch(error){
            if (error instanceof Error) {
                res.status(400).json({error: error.message});
            } else{
                res.status(500).json({error:"Internal server error"});
            }
        }
    },
};
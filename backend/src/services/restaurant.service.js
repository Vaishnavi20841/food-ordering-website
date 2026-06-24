// const Restaurant= require("../models/restaurant.model.js");
// const Address = require("../models/address.model.js");
// module.exports={
      
//     async createRestaurant(data, user){
//         try{
//             const address=new Address({
//                 city:data.address.city,
//                 country:data.address.country,
//                 fullName:data.address.fullName,
//                 postalCode:data.address.postalCode,
//                 state:data.address.state,
//                 streetAddress:data.address.streetAddress
//             })

//             const savedAddress=await address.save();

//             const restaurant = new Restaurant({
//                 address:savedAddress._id,
//                 contactInformation:data.contactInformation,
//                 cuisineType:data.cuisineType,
//                 description:data.description,
//                 image:data.images,
//                 name:data.name,
//                 openingHour:data.openingHours,
//                 registrationDate:data.registrationDate,
//                 owner:user._id,
//             })

//             const savedRestaurant= await restaurant.save();
//             return savedRestaurant;

//         } catch(error){
//             throw new Error(error.message);

//         }
//     },

//    async findRestaurantById(restaurantId){
        
//             try{
//             const restaurant= await Restaurant.findById(restaurantId)
//             if(!restaurant)throw new Error("restaurant not found");   
            
//             return restaurant; 
//         }catch(error){
//             throw new Error(error.message);

             
//         }

        
//     },

//     async deleteRestaurant(restaurantId){
//         try{
//             await this.findRestaurantById(restaurantId);
//              const restaurant=await restaurant.findByIdAndDeleteById(restaurantId);
//             return restaurant;
            
//         }catch(error){
//             throw new Error(error.message);
//         }

//     },
     
//     async getAllRestaurants(){
//         try{
    
//     const restaurants= await Restaurant.find();
//     return  restaurants;
    
//         } catch(error) {
//             throw new Error(error.message);
//         }
//     },
//      async getRestaurantByUserId(userId){
//         try{
//             const restaurant=await Restaurant.findOne({owner:userId})
//             .populate("owner")
//             .populate("address");

//             if(!restaurant){
//                 throw new Error("restaurant not found")
//             }
//             return restaurant;
//         }catch(error){
//             throw new Error(error.message);
//         }
//      },

//      async searchRestaurant(Keyword){
//         try{
//            const restaurant =await Restaurant.find({
// // regex used for serching in mongodb
//             $or:[

                
//                     {name: {$regex:Keyword, $options:"i"}},
//                    { description: {$regex:Keyword, $options:"i"}},
//                    { cuisineType: {$regex:Keyword, $options:"i"}},
                
                
//             ],

//            });
//            return restaurants;
//         }catch(error){
//            throw new Error(error.message);
//         }
//      },

//     async addToFavorites(restaurantId,user){
//      try{
//        const restaurant =  await this.findRestaurantById(restaurantId);

//        const dto ={
//         _id:restaurant._id,
//         title:restaurant.name,
//         images:restaurant.images,
//         description: restaurant.description,
//        }

//        const favorites=user.favorites || [];
//        const index=favorites.findIndex(
//         favorites=>favorites._id.toString()===restaurantId
//     );

//        if(index!==-1){
//         favorites.splice(index,1);
//        }
//        else{
//         favorites.push(dto);
//        }

//        user.favorites = favorites;
//        await user.save();
//        return dto;
//      } catch(error) {
//         throw new Error(error.message);
//      }
//     },
    

//      async updateRestaurantStatus(id){
//         try{
//             const restaurant = await Restaurant.findById(id)
//             .populate("owner")
//             .populate("address");

//             if(!restaurant) {
//                 throw new Error("restaurant not found");
//             }

//             restaurant.open = !restaurant.open;
//             await restaurant.save();
//             return restaurants;
       
//         }catch(error){
//            throw new Error(error.message);
//         }
//      }
    



//    };
   

const Food = require("../models/food.model");
const Restaurant = require("../models/restaurant.model.js");
const Address = require("../models/address.model.js");
const User = require("../models/user.model.js");
// const { updateRestaurantStatus } = require("../controllers/restaurantController.js");

module.exports = {

  // CREATE RESTAURANT
  async createRestaurant(data, user) {
    try {
      const address = new Address({
        city: data.address.city,
        country: data.address.country,
        fullName: data.address.fullName,
        postalCode: data.address.postalCode,
        state: data.address.state,
        streetAddress: data.address.streetAddress,
      });

      const savedAddress = await address.save();

      const restaurant = new Restaurant({
        address: savedAddress._id,
        contactInformation: data.contactInformation,
        cuisineType: data.cuisineType,
        description: data.description,
        images: data.images,
        name: data.name,
        openingHour: data.openingHours,
        registrationDate: data.registrationDate,
        owner: user._id,
        foods:[],
      });

      return await restaurant.save();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // GET RESTAURANT BY ID
   // GET RESTAURANT BY ID
async findRestaurantById(id) {
  try {
    const restaurant = await Restaurant.findById(id)
  .populate("address")
  .populate("owner")
  .populate({
    path: "foods",
    populate: {
      path: "ingredients",
      populate: {
        path: "category",
        select: "name",
      },
    },
  });
    console.log(
      "POPULATED FOODS =",
      JSON.stringify(restaurant.foods, null, 2)
    );

    return restaurant;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }

},
      
  

  // DELETE RESTAURANT
  async deleteRestaurant(id) {
    const restaurant = await Restaurant.findByIdAndDelete(id);

    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    return {
      message: "Restaurant deleted successfully",
    };
  },

  // GET ALL RESTAURANTS
 async getAllRestaurants() {
    try {
      return await Restaurant.find()
        .populate("address")
        .populate("owner")
        .populate("foods");
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // SEARCH RESTAURANTS
  async searchRestaurant(keyword) {
    return await Restaurant.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { cuisineType: { $regex: keyword, $options: "i" } },
      ],
    })
      .populate("address")
      .populate("owner");
  },

  // ❤️ ADD TO FAVORITES
  async addToFavorite(restaurantId, user) {
    try {
      if (!user || !user._id) {
        throw new Error("Invalid user");
      }

      const dbUser = await User.findById(user._id);

      if (!dbUser) {
        throw new Error("User not found");
      }

      const restaurant = await Restaurant.findById(restaurantId)
        .populate("address")
        .populate("owner");

      if (!restaurant) {
        throw new Error("Restaurant not found");
      }

      const alreadyExists = dbUser.favorites.some(
        (id) => id.toString() === restaurantId
      );

      if (!alreadyExists) {
        dbUser.favorites.push(restaurantId);
        await dbUser.save();
      }

      return restaurant;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // 💔 REMOVE FROM FAVORITES
  async removeFromFavorite(restaurantId, user) {
    try {
      if (!user || !user._id) {
        throw new Error("Invalid user");
      }

      const dbUser = await User.findById(user._id);

      if (!dbUser) {
        throw new Error("User not found");
      }

      dbUser.favorites = (dbUser.favorites || []).filter(
        (id) => id.toString() !== restaurantId
      );

      await dbUser.save();

      return {
        removed: true,
        restaurantId,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
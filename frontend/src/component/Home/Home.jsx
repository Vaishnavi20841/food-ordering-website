import React, { useEffect } from "react";
import "./Home.css";
import MultiItemCarousel from "./multiItemCarousel";
import RestaurantCard from "../Restaurant/RestaurantCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantsAction } from "../State/Restaurant/Action";
import { useLocation } from "react-router-dom";


const Home = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const { restaurants } = useSelector((store) => store.restaurant);

  const location = useLocation();

  // ✅ STEP 1: GET SEARCH QUERY
  const searchQuery =
    new URLSearchParams(location.search).get("search") || "";

  // ✅ STEP 2: FILTER RESTAURANTS
  const filteredRestaurants =
  searchQuery.trim()
    ? restaurants?.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : restaurants;

  useEffect(() => {
    if (jwt) {
      dispatch(getAllRestaurantsAction(jwt));
    }
  }, [dispatch, jwt]);

  console.log("restaurants =", restaurants);




  return (
    <div className="pb-10">

      {/* HERO SECTION */}
      <section className="banner relative flex flex-col justify-center items-center">

        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

        <div className="relative z-10 text-center mt-20">
          <h1 className="text-5xl lg:text-7xl font-bold text-white">
            Vynora
          </h1>

          <p className="text-xl lg:text-3xl text-gray-200 mt-5">
            Taste the Convenience: Food, Fast and Delivered.
          </p>
        </div>

      </section>

      {/* TOP MEALS */}
      <section className="p-10 lg:px-20 bg-black">

        <p className="text-2xl font-semibold text-gray-400 pb-8">
          Top Meals
        </p>

        <MultiItemCarousel />

      </section>

      {/* RESTAURANTS */}
      <section className="px-5 lg:px-20 pt-10">

        <h1 className="text-2xl font-semibold text-gray-400 pb-8">
          Order From Our Handpicked Favorites
        </h1>

        <div className="flex flex-wrap items-center justify-around gap-5">

            {filteredRestaurants?.map((item) => (
  <RestaurantCard
    key={item._id}
    restaurant={item}
  />
))}
           


        </div>

      

      </section>

    </div>
  );
};

export default Home;


// import React, { useEffect } from "react";
// import "./Home.css";
// import MultiItemCarousel from "./multiItemCarousel";
// import RestaurantCard from "../Restaurant/RestaurantCard";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllRestaurantsAction } from "../State/Restaurant/Action";

// const Home = () => {
//   const dispatch = useDispatch();

//   const jwt = localStorage.getItem("jwt");

//   const { restaurants } = useSelector(
//     (store) => store.restaurant
//   );

//   useEffect(() => {
//     if (jwt) {
//       dispatch(getAllRestaurantsAction(jwt));
//     }
//   }, [dispatch, jwt]);

//   console.log("restaurants =", restaurants);
  
// console.log("restaurant sample =", restaurants?.[0]);
// console.log("FULL RESTAURANT =", restaurants?.[0]);

//   // ✅ ONLY 2 RESTAURANTS LOGIC
//   const openRestaurant = restaurants?.find(
//     (item) => item.open === true
//   );

//   const closedRestaurant = restaurants?.find(
//     (item) => item.open === false
//   );

//   return (
//     <div className="pb-10">

//       {/* HERO SECTION */}
//       <section className="banner relative flex flex-col justify-center items-center">
//         <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

//         <div className="relative z-10 text-center mt-20">
//           <h1 className="text-5xl lg:text-7xl font-bold text-white">
//             Vynora
//           </h1>

//           <p className="text-xl lg:text-3xl text-gray-200 mt-5">
//             Taste the Convenience: Food, Fast and Delivered.
//           </p>
//         </div>
//       </section>

//       {/* TOP MEALS */}
//       <section className="p-10 lg:px-20 bg-black">
//         <p className="text-2xl font-semibold text-gray-400 pb-8">
//           Top Meals
//         </p>

//         <MultiItemCarousel />
//       </section>

//       {/* RESTAURANTS */}
//       <section className="px-5 lg:px-20 pt-10">

//         <h1 className="text-2xl font-semibold text-gray-400 pb-8">
//           Order From Our Handpicked Favorites
//         </h1>

//         <div className="flex flex-wrap items-center justify-around gap-5">

//           {/* OPEN RESTAURANT */}
//           {openRestaurant && (
//             <RestaurantCard
//               key={openRestaurant._id}
//               restaurant={openRestaurant}
//             />
//           )}

//           {/* CLOSED RESTAURANT */}
//           {closedRestaurant && (
//             <RestaurantCard
//               key={closedRestaurant._id}
//               restaurant={closedRestaurant}
//             />
//           )}

//         </div>

//       </section>

//     </div>
//   );
// };

// export default Home;
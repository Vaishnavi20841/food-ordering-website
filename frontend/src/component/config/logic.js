// export const isPresentInFavorites = (favorites = [], restaurant) => {
//   return favorites.some(
//     (item) => item._id === restaurant._id
//   );
// };

export const isPresentInFavorites = (favorites, restaurant) => {
  return favorites?.some(item => item._id === restaurant._id);
};

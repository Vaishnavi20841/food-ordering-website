import React, { useState } from "react";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { categorizeIngredients } from "../../util/categrizeIngredients";
import { addItemsToCart } from "../State/Cart/Action";

const MenuCard = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  console.log("MENU ITEM =", item);
  console.log("INGREDIENTS =", item?.ingredients);

  // Handle ingredient selection
  const handleCheckBoxChange = (ingredient) => {
    const ingredientId = ingredient._id;

    if (selectedIngredients.includes(ingredientId)) {
      setSelectedIngredients(
        selectedIngredients.filter(
          (id) => id !== ingredientId
        )
      );
    } else {
      setSelectedIngredients([
        ...selectedIngredients,
        ingredientId,
      ]);
    }
  };

  // Add item to cart
  const handleAddItemToCart = async (e) => {
    e.preventDefault();

    const reqData = {
      token: localStorage.getItem("jwt"),

      cartItem: {
        foodId: item._id,
        quantity: 1,
        ingredients: selectedIngredients,
      },
    };

    console.log("reqData =", reqData);

    try {
      await dispatch(addItemsToCart(reqData));

      // Redirect to cart page
      navigate("/cart");
    } catch (error) {
      console.log("Error adding item to cart:", error);
    }
  };

  // Normalize ingredients
  const normalizedIngredients = item?.ingredients || [];
const categorizedIngredients =
  categorizeIngredients(normalizedIngredients);
  console.log("CATEGORIZED =", categorizedIngredients);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="lg:flex items-center justify-between w-full">
          <div className="lg:flex items-center gap-5">
            <img
              className="w-[7rem] h-[7rem] object-cover rounded"
              src={
                item?.images?.[0] ||
                "https://images.unsplash.com/photo-1513104890138-7c749659a591"
              }
              alt={item?.name}
            />

            <div className="space-y-2">
              <p className="font-semibold text-xl">
                {item?.name}
              </p>

              <p className="font-medium text-green-600">
                ₹{item?.price}
              </p>

              <p className="text-gray-500">
                {item?.description}
              </p>
            </div>
          </div>
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <form onSubmit={handleAddItemToCart}>
          <div className="flex gap-8 flex-wrap">
            {Object.keys(categorizedIngredients).length > 0 ? (
              Object.keys(categorizedIngredients).map(
                (category) => (
                  <div key={category} className="mb-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {category}
                    </h3>

                    <FormGroup>
                      {categorizedIngredients[
                        category
                      ].map((ingredient) => (
                        <FormControlLabel
                          key={ingredient._id}
                          control={
                            <Checkbox
                              checked={selectedIngredients.includes(
                                ingredient._id
                              )}
                              onChange={() =>
                                handleCheckBoxChange(
                                  ingredient
                                )
                              }
                            />
                          }
                          label={ingredient.name}
                        />
                      ))}
                    </FormGroup>
                  </div>
                )
              )
            ) : (
              <p className="text-gray-500">
                No ingredients available
              </p>
            )}
          </div>

          <div className="pt-5">
            <Button
              variant="contained"
              disabled={item?.available === false}
              type="submit"
            >
              {item?.available === false
                ? "Out Of Stock"
                : "Add To Cart"}
            </Button>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuCard;
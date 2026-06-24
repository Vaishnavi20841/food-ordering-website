import React from "react";
import {
  CardMedia,
  CardContent,
  CardActions,
  Typography
} from "@mui/material";
import { Card } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const EventCard =() =>{
  return(
    <div>
        <Card sx={{ width: 300 }}>
  <CardMedia
    component="img"
    height="140"
    image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500"
    alt="food"
  />

  <CardContent>
    <Typography variant="h6">
      Indian Fast Food
    </Typography>

    <Typography variant="body2" color="text.secondary">
      50% off on tour first order
    </Typography>


    <Typography variant="body2" color="text.secondary">
      India
    </Typography>

    <Typography variant="body2" color="primary">
     <p className="text-sm text-blue-500">February 14, 2024 12:00 AM</p>
     <p className="text-sm text-red-500">February 14, 2024 12:00 AM</p>
    </Typography>
  </CardContent>
</Card>
{ false && <CardActions>
    <DeleteIcon/>
</CardActions>}
  </div>
  )
}
 


export default EventCard;
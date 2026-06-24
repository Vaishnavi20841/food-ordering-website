import React from "react";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../State/Authentication/Action";


const menu=[
    {title:"Orders",icon:<ShoppingBagIcon/>},
    {title:"Favorites",icon:<FavoriteIcon/>},
    {title:"Address",icon:<HomeIcon/>},
    {title:"Notification",icon:<NotificationsActiveIcon/>},
    {title:"Events",icon:<EventIcon/>},
    {title:"Logout",icon:<LogoutIcon/>}
    


]

export const ProfileNavigation=({open,handleClose}) => {
    const isSmallScreen = useMediaQuery('(max-width:900px)');
    const navigate=useNavigate();
    const dispatch=useDispatch()

    const handleNavigate = (item) => {
  if (item.title === "Logout") {
    dispatch(logout());
    localStorage.removeItem("jwt"); // extra safety
    navigate("/");
  } else {
    navigate(`/my-profile/${item.title.toLowerCase()}`);
  }


    }
    return (
        <div>
            <Drawer
            variant={isSmallScreen ? "temporary" : "permanent"}
               onClose={handleClose}
                open={isSmallScreen ? open : true}
                 anchor='left' 
                 sx={{zIndex:-1,position:"sticky"}}
                 >
                    <div className="w-[50vw] lg:w-[20vw] h-[90vh] flex flex-col
                    justify-center text-xl gap-8 pt-16">
                       {menu.map((item, i) => (
  <React.Fragment key={item.title}>
    <div
      onClick={() => handleNavigate(item)}
      className="px-5 flex item-center space-x-5 cursor-pointer"
    >
      {item.icon}
      <span>{item.title}</span>
    </div>

    {i !== menu.length - 1 && <Divider />}
  </React.Fragment>
))}
                    </div>
            </Drawer>
     </div>
    );
}


export default ProfileNavigation;
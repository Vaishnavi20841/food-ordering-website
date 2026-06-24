// const eventService = require("../services/event.service");

// module.exports = {
//     createEvents: async (req,res)=>{
//         try{
//             const { event } = req.body;
//             const { restaurantId } = req.params;
//             const createdEvents = await eventService.createEvent(event, restaurantId);
//             res.status(202).json(createdEvents);
//         } catch (error) {
//             if (error instanceof Error) {
//                 res.status(400).json({ error:error.message });
//             } else {
//                 res.status(500).json({ error : "Internal server error" });
//             }
//         }
//     },

//     findAllEvents: async (req,res) =>{
//         try{
//             const events = await eventService.findAllEvent();
//             res.status(202).json(events);
//         } catch (error) {
//             if (error instanceof Error){
//                 res.status(400).json({ error: error.message});
//             }else {
//                 res.status(500).json({ error : "Internal server error"});
//             }
//         }
//     },


//     findRestaurantsEvents: async (req, res) => {
//         try {
//             const { restaurantId } = req.params;

//             const events = await eventService.findEventsByRestaurant(restaurantId);

//             res.status(200).json(events);
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     },

//     // ✅ REQUIRED (missing)
//     deleteEvents: async (req, res) => {
//         try {
//             const { id } = req.params;

//             const deleted = await eventService.deleteEvent(id);

//             res.status(200).json(deleted);
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     },
// };

const eventService = require("../services/event.service");

const createEvents = async (req, res) => {
    try {
        const { event } = req.body;
        const { restaurantId } = req.params;

        const createdEvents = await eventService.createEvent(event, restaurantId);

        res.status(201).json(createdEvents);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const findRestaurantsEvents = async (req, res) => {
    try {
        const { restaurantId } = req.params;

        const events = await eventService.findEventsByRestaurant(restaurantId);

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteEvents = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await eventService.deleteEvent(id);

        res.status(200).json(deleted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const findAllEvents = async (req, res) => {
    try {
        const events = await eventService.findAllEvents();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createEvents,
    findRestaurantsEvents,
    deleteEvents,
    findAllEvents
};

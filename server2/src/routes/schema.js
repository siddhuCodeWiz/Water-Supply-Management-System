import express from "express";
import  {UserMapSchema} from "../models/Scheme.js";

const router =express.Router();
router.post('/maps', async (req, res) => {
    try {
      const { latitude, longitude } = req.body;
      // const newCoordinate = new Coordinate({ latitude, longitude });
      const newCoordinate = new UserMapSchema({ latitude, longitude });
      // await coordinatesCollection.insertOne({ latitude, longitude });
      await newCoordinate.save();
      res.json({ message: 'Coordinates saved successfully' });
    } catch (error) {
      console.error('Error saving coordinates:', error);
      res.json(err);
    }
  });
  export {router as MapRouter}

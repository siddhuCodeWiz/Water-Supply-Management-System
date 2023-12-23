import mongoose from "mongoose"

const MapSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

export const UserMapSchema= mongoose.model('maps', MapSchema);


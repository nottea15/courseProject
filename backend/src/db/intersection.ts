const mongoose = require('mongoose');

export const trafficLightSchema = new mongoose.Schema({
  state: { type: String, default: 'red' },
  coordinates: { lat: Number, lng: Number },
  intersection: { type: mongoose.Schema.Types.ObjectId, ref: 'Intersection' }
});

const intersectionSchema = new mongoose.Schema({
  trafficLights: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TrafficLight' }],
  name: {type: String},
  timer: { type: Number, default: 30 } // 30 секунд по замовчуванню
});

export const TrafficLightModel = mongoose.model('TrafficLight', trafficLightSchema);
export const IntersectionModel = mongoose.model('Intersection', intersectionSchema);
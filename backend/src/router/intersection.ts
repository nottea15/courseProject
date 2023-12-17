import { isAuthenticated } from "../middlewares";
import { getInterceptions, getLights } from "../controllers/intersection";
import express from "express";

export default (router: express.Router) => {
  router.get("/trafficLights", isAuthenticated, getLights);
  router.get("/interceptions", isAuthenticated, getInterceptions);
};

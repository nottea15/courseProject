import { IntersectionModel, TrafficLightModel } from "../db/intersection";
import express from "express";

export const getLights = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const trafficLights = await TrafficLightModel.find();

    return res.status(200).json(trafficLights);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getInterceptions = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const inteception = await IntersectionModel.find();
  
      return res.status(200).json(inteception);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

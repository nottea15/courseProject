import { Server, Socket } from "socket.io";
import {
  TrafficLightModel,
  IntersectionModel,
  trafficLightSchema,
} from "../db/intersection";

let intersectionIntervalId: NodeJS.Timeout | null = null;

const toggleIntersection = async (io: Server, intersectionId: string) => {
  const intersection = await IntersectionModel.findById(
    intersectionId
  ).populate("trafficLights");

  intersection.trafficLights.forEach(
    async (light: typeof trafficLightSchema, index: number) => {
      light.state = getOtherState(light.state);
      await light.save();

      io.emit("trafficLightStateChange", {
        trafficLightId: light._id,
        newState: light.state,
      });
    }
  );
};
export const initAutomaticLightChange = async (io: Server) => {
  const intersections = await IntersectionModel.find().populate(
    "trafficLights"
  );
  intersections.forEach((intersection: any) => {
    console.log(intersection, "section");
    setInterval(() => {
      toggleIntersection(io, intersection._id);
      console.log("Intersection", intersection._id, "changed");
    }, intersection.timer * 1000);
  });
};

export const socketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("connected to socket");
    socket.on(
      "changeInterval",
      async (data: { intersectionId: string; newInterval: number }) => {
        const intersection = await IntersectionModel.findById(
          data.intersectionId
        );
        intersection.timer = data.newInterval;
        await intersection.save();
        clearInterval(intersectionIntervalId);
        intersectionIntervalId = setInterval(() => {
          toggleIntersection(io, data.intersectionId);
          console.log("changed");
        }, data.newInterval * 1000);
      }
    );

    socket.on("manualToggle", async (data: { intersectionId: string }) => {
      if (data.intersectionId) {
        toggleIntersection(io, data.intersectionId);
      }
    });
  });
};

const getOtherState = (state: string) => (state === "red" ? "green" : "red");

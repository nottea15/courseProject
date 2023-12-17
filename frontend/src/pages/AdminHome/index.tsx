import { Button } from "@components/Button";
import CustomMap from "@components/CustomMap";
import auth from "@utils/auth";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
type InterceptionType = {
  trafficLights: string[];
  name: string;
  timer: number;
  _id: string;
};
export const AdminHome = () => {
  const [interceptions, setInterceptions] = useState<InterceptionType[]>([]);

  const getInterceptions = async () => {
    const data = await auth.getAllInterceptions();
    console.log(data, "interceptions");
    setInterceptions(data);
  };

  useEffect(() => {
    getInterceptions();
  }, []);

  return (
    <div>
      <div className="flex justify-center gap-10 w-full">
        <CustomMap directionResponse={[]} onMapPress={null} />
        <div>
          {interceptions.map((interceprion) => (
            <Card
              name={interceprion.name}
              interval={interceprion.timer}
              id={interceprion._id}
              key={interceprion._id}
              tafficLightID={interceprion.trafficLights[0]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface IProps {
  name: string;
  interval: number;
  id: string;
  tafficLightID: string;
}

const Card: React.FC<IProps> = ({ name, id, interval }) => {
  const [time, setTime] = useState(interval.toString());

  const changeLight = () => {
    const socket: Socket = io("http://localhost:3001");
    socket?.emit("manualToggle", { intersectionId: id });
  };
  const changeInterval = () => {
    const socket: Socket = io("http://localhost:3001");
    socket?.emit("changeInterval", {
      intersectionId: id,
      newInterval: Number(time),
    });
  };
  return (
    <div>
      <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 w-[45vw] flex flex-col">
        <div className="mb-4">
          <h2 className="text-gray-800 text-3xl font-bold">{name}</h2>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Інтервал
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="number"
            placeholder="Змінити інтервал"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Button
            text="Зберегти"
            type="primary"
            onClick={changeInterval}
            size="100px"
          />
          <Button
            text="Переключити світлофори"
            type="secondary"
            onClick={changeLight}
            size="100px"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;

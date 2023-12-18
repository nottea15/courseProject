/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@components/Button";
import CustomMap from "@components/CustomMap";
import axios from "axios";
import { useEffect, useState } from "react";


  

export const UserHome = () => {
  const [firstPoint, setFirstPoint] = useState<{
    lng: number;
    lat: number;
  } | null>(null);
  const [secondPoint, setSecondPoint] = useState<{
    lng: number;
    lat: number;
    streetName?: string;
  } | null>(null);
  const [firstStreet, setFirstStreet] = useState("");
  const [secondStreet, setSecondStreet] = useState("");
  const [step, setStep] = useState(1);
  const [directionResponse, setDirectionResponse] = useState([]);
  const [routeInfo, setRouteInfo] = useState({ time: 0, distance: 0 });

  useEffect(() => {
    const getName = async () => {
      if (firstPoint) {
        setFirstStreet(await getStreetName(firstPoint.lat, firstPoint.lng));
      }
    };
    getName();
  }, [firstPoint]);

  useEffect(() => {
    const getName = async () => {
      if (secondPoint) {
        setSecondStreet(await getStreetName(secondPoint.lat, secondPoint.lng));
      }
    };
    getName();
  }, [secondPoint]);

  const getStreetName = async (lat: number, lng: number) => {
    try {
      const street = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      console.log(street?.data?.display_name, "street");
      return street?.data?.display_name;
    } catch {
      return `${lat}, ${lng}`;
    }
  };

  const getDirections = async (
    firstPoint: {
      lng: number;
      lat: number;
    } | null,
    secondPoint: {
      lng: number;
      lat: number;
    } | null
  ) => {
    if (firstPoint && secondPoint) {
      handleNextStep();
      const apiKey = "5b3ce3597851110001cf62487e95f57d49954d43992932bfe5f8c64a";
      const startCoordinates = `${firstPoint?.lng},${firstPoint?.lat}`;
      const endCoordinates = `${secondPoint?.lng},${secondPoint?.lat}`;
      const profile = "driving-car";
      const result = await axios.get(
        `https://api.openrouteservice.org/v2/directions/${profile}?api_key=${apiKey}&start=${startCoordinates}&end=${endCoordinates}`
      );
      console.log(result, "res");
      const pathCoordinates = result.data.features[0].geometry.coordinates.map(
        (coord: any[]) => [coord[1], coord[0]]
      );
      console.log(pathCoordinates);
      setDirectionResponse(pathCoordinates);
      setRouteInfo({
        time: +(
          result.data.features[0].properties.summary.duration / 60
        ).toFixed(0),
        distance:
          +result.data.features[0].properties.summary.distance.toFixed(2),
      });
    } else {
      return;
    }
  };

  const handleReset = () => {
    setFirstPoint(null);
    setSecondPoint(null);
    setDirectionResponse([]);
    setFirstStreet("");
    setSecondStreet("");
    setStep(1);
  };

  const handleNextStep = () => {
    if (step === 1) {
      firstStreet && setStep((prev) => prev + 1);
    } else if (step === 2) {
      secondStreet && setStep((prev) => prev + 1);
    }
  };

  return (
    <div className="flex justify-center gap-10">
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-center text-black text-700 uppercase mb-10">
            {step === 3
              ? "Результати маршруту"
              : `Виберіть ${
                  step === 1 ? "початкову" : "кінцеву"
                } точку на карті`}
          </h1>
          <div className="flex justify-between w-full mb-5">
            <p className="text-left text-black text-xl font-bold">
              Початок маршруту:
            </p>
            <p className="text-black text-l max-w-[50%]">{firstStreet}</p>
          </div>
          {step >= 2 && (
            <div className="flex justify-between w-full mb-10">
              <p className="text-left text-black text-xl font-bold">
                Кінець маршруту:
              </p>
              <p className="text-black text-l max-w-[50%]">{secondStreet}</p>
            </div>
          )}
          {step === 3 && (
            <>
              <div className="flex justify-between w-full mb-7">
                <p className="text-left text-black text-xl font-bold">
                  Загальна дистанція
                </p>
                <p className="text-black text-l max-w-[50%]">
                  {(routeInfo?.distance / 1000).toFixed(2)}км
                </p>
              </div>
              <div className="flex justify-between w-full">
                <p className="text-left text-black text-xl font-bold">
                  Приблизний час прибуття
                </p>
                <p className="text-black text-l max-w-[50%]">
                  {routeInfo.time}хв
                </p>
              </div>
            </>
          )}
        </div>
        <div className="flex">
          {step === 1 ? (
            <Button
              onClick={handleNextStep}
              size="w-full"
              text="Далі"
              type="primary"
            />
          ) : (
            <div className="flex gap-2 w-full">
              <Button
                onClick={() => getDirections(firstPoint, secondPoint)}
                size="w-full"
                text="Побудувати маршрут"
                type="primary"
              />
              <Button
                onClick={handleReset}
                size="w-full"
                text="Скинути"
                type="secondary"
              />
            </div>
          )}
        </div>
      </div>
      <CustomMap
        directionResponse={directionResponse}
        onMapPress={
          step === 1 ? setFirstPoint : step === 2 ? setSecondPoint : undefined
        }
      />
    </div>
  );
};

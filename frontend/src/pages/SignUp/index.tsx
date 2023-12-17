/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@components/Input";
import bg from "@assets/authBackground.png";
import { ReactComponent as Error } from "@assets/icons/error.svg";
import { ReactComponent as EmailIcon } from "@assets/icons/letter.svg";
import { ReactComponent as LockIcon } from "@assets/icons/lock.svg";
import { useEffect, useState } from "react";
import { Button } from "@components/Button";
import { Link, useNavigate } from "react-router-dom";
import auth from "@utils/auth";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUesrname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "", common: "" });
  const navigate = useNavigate();

  useEffect(() => {
    setError((prev) => ({ ...prev, email: "", common: "" }));
  }, [email]);

  useEffect(() => {
    setError((prev) => ({ ...prev, password: "", common: "" }));
  }, [password]);

  const handleSignIn = async () => {
    try {
      await auth.signUp({ email, password,username });
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        console.log(e)
    }
  };

  return (
    <div className="flex w-full h-screen">
      <img className="h-full w-0 md:w-[55%]" src={bg} />
      <div className="flex items-center justify-center w-full h-full flex-col">
        <div className="flex flex-col w-[60%] max-w[420px] items-center justify-center">
          <p className="text-center text-black text-4xl font-bold">Увійти</p>
          <Input
            value={username}
            onChange={(e) => setUesrname(e.target.value)}
            placeholder="Username"
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            isError={!!error.email}
            errorMessage={error.email}
            icon={<EmailIcon color={email ? "#173303" : "#BDBDBD"} />}
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isPassword
            placeholder="Password"
            isError={!!error.password}
            errorMessage={error.password}
            icon={<LockIcon color={password ? "#173303" : "#BDBDBD"} />}
          />
          {!!error.common && (
            <p className="text-red text-xs font-medium flex w-full">
              <Error className="text-red" /> {error?.common}
            </p>
          )}
          <Button
            type="primary"
            disabled={!email || !password}
            onClick={handleSignIn}
            text="Режстрація"
            size="w-full h-14"
          />
          <div className="mt-28">
            <p className="text-gray2">
              Вже є акаунт?
              <Link to="/auth/signup" className="text-main pl-2">
                Увійти
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

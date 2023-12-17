import { Suspense, useContext } from "react";
import { Button } from "./Button";
import { AuthContext } from "@utils/AuthContext";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  const { signOut } = useContext(AuthContext);
  return (
    <div>
      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              EasyGo
            </span>
            <div className="flex items-center lg:order-2">
              <Button
                onClick={signOut}
                type="secondary"
                text="Вийти"
                size="w-[130px] h-10"
              />
            </div>
          </div>
        </nav>
      </header>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
};

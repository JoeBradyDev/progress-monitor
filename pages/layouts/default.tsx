import { FC, ReactElement } from "react";

interface IDefaultLayout {
  children?: any;
}

const DefaultLayout: FC<IDefaultLayout> = ({ children }) => {
  return (
    <div className="overflow-y-auto max-h-screen h-screen w-screen flex-col justify-center bg-gradient-to-r from-slate-50 to-sky-100 p-4">
      {children}
    </div>
  );
};

export default DefaultLayout;

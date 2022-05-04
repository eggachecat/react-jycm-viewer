import useJYCM, { IUseJYCM } from "@@/hooks/useJYCM";
import React from "react";

export const JYCMContext = React.createContext<IUseJYCM | null>(null);

export const useJYCMContext = () => React.useContext(JYCMContext)!;

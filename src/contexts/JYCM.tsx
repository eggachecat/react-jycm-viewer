import { IUseJYCM } from "../hooks/useJYCM";
import * as React from "react";

export const JYCMContext: React.Context<IUseJYCM | null> =
  React.createContext<IUseJYCM | null>(null);

export const useJYCMContext = (): IUseJYCM => React.useContext(JYCMContext)!;

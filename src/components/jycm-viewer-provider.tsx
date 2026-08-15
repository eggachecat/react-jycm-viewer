import * as React from "react";
import { FC, useMemo } from "react";

import { JYCMContext } from "../contexts/JYCM";
import useJYCM from "../hooks/useJYCM";
import { JYCMDiffResult } from "../typings";
import JYCMRender, { IJYCMRenderProps } from "./jycm-viewer";

export type JsonInput = string | object | unknown[];

export type IJYCMViewerProps = IJYCMRenderProps & {
  left: JsonInput;
  right: JsonInput;
  diffResult: JYCMDiffResult;
};

const serialize = (value: JsonInput) =>
  typeof value === "string" ? value : JSON.stringify(value);

/** Render a complete JYCM comparison without manually wiring context. */
export const JYCMViewer: FC<IJYCMViewerProps> = ({
  left,
  right,
  diffResult,
  ...renderProps
}) => {
  const leftJsonStr = useMemo(() => serialize(left), [left]);
  const rightJsonStr = useMemo(() => serialize(right), [right]);
  const context = useJYCM({ leftJsonStr, rightJsonStr, diffResult });

  return (
    <JYCMContext.Provider value={context}>
      <JYCMRender {...renderProps} />
    </JYCMContext.Provider>
  );
};

export default JYCMViewer;

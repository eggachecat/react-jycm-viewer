import React from "react";
import "./global.stories.css";

import {
  JYCMRender,
  JYCMContext,
  IUseJYCMProps,
  IJYCMRenderProps,
  useJYCM,
  useJYCMContext,
} from "../index";
import { diffResult, leftJson, rightJson } from "../render-case/case-1";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "JYCMRender",
  component: JYCMRender,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof JYCMRender>;

const NormalTemplate: ComponentStory<
  React.FC<IJYCMRenderProps & IUseJYCMProps>
> = ({ leftJsonStr, rightJsonStr, diffResult, ...args }) => {
  const jycmContextValue = useJYCM({
    leftJsonStr,
    rightJsonStr,
    diffResult,
  });

  return (
    <div style={{ height: "100%" }}>
      <JYCMContext.Provider value={jycmContextValue}>
        <JYCMRender {...args} />
      </JYCMContext.Provider>
    </div>
  );
};

export const NormalCase = NormalTemplate.bind({});
NormalCase.args = {
  leftJsonStr: JSON.stringify(leftJson),
  rightJsonStr: JSON.stringify(rightJson),
  diffResult: diffResult,
  leftTitle: "Benchmark",
  rightTitle: "Actual",
  containerStyle: {
    minHeight: "350px",
  },
};

const FormBlock: React.FC<{ label: string; content: any }> = ({
  label,
  content,
}) => {
  return (
    <div style={{ padding: "5px", border: "1px solid black", margin: "5px" }}>
      <div style={{ padding: "5px", fontWeight: 700 }}>{label}:</div>
      <div style={{ padding: "5px", fontWeight: 700 }}>
        {JSON.stringify(content)}
      </div>
    </div>
  );
};

const MyApp: React.FC<any> = () => {
  const { pairInfo, activeLeftJsonPath, activeRightJsonPath } =
    useJYCMContext();
  return (
    <div>
      <FormBlock
        label="activeLeftJsonPath"
        content={activeLeftJsonPath.join("->")}
      />
      <FormBlock
        label="activeRightJsonPath"
        content={activeRightJsonPath.join("->")}
      />
      <FormBlock label="Pair Info" content={pairInfo} />
    </div>
  );
};

const CustomTemplate: ComponentStory<
  React.FC<IJYCMRenderProps & IUseJYCMProps>
> = ({ leftJsonStr, rightJsonStr, diffResult, ...args }) => {
  const jycmContextValue = useJYCM({
    leftJsonStr,
    rightJsonStr,
    diffResult,
  });

  return (
    <div style={{ height: "100%" }}>
      <JYCMContext.Provider value={jycmContextValue}>
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <div style={{ flexGrow: 1, height: "100%" }}>
            <JYCMRender {...args} />
          </div>
          <div style={{ width: "200px" }}>
            <MyApp />
          </div>
        </div>
      </JYCMContext.Provider>
    </div>
  );
};

export const CustomCase = CustomTemplate.bind({});
CustomCase.args = {
  leftJsonStr: JSON.stringify(leftJson),
  rightJsonStr: JSON.stringify(rightJson),
  diffResult: diffResult,
  leftTitle: "Benchmark",
  rightTitle: "Actual",
  containerStyle: {
    minHeight: "350px",
  },
};

# React Json Diff Viewer

This is the renderer for [JYCM](https://github.com/eggachecat/jycm).

It is very easy to use thanks to the [React Context] (https://reactjs.org/docs/context.html)

**LIVE DEMO**: https://github.com/eggachecat/jycm-viewer

# GIF-Show

![gif-show](https://media.giphy.com/media/03PbgaFqYCwyhzOUSU/giphy.gif)

# Good-to-go Example project

Here's a working demo project [react-jycm-viewer-example](https://github.com/eggachecat/react-jycm-viewer-example)

Or here: [jycm-viewer](https://github.com/eggachecat/jycm-viewer)

# Usage

## dependencices
```bash
yarn add react-jycm-viewer react-monaco-editor monaco-editor
yarn add -D monaco-editor-webpack-plugin
```

## webpack config
```js
{
    plugins: [
        // ...
        new MonacoWebpackPlugin({
            languages: ["json"],
        })
    ]
}

```



# Use in your component
```TSX
import React, { FC, useState } from 'react';
import ReactDOM from 'react-dom';

import {
  JYCMRender,
  JYCMContext,
  IUseJYCMProps,
  IJYCMRenderProps,
  useJYCM,
} from "react-jycm-viewer";

const SimpleForm: FC<{
    label: string,
}> = ({ label, children }) => {
    return <div style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        padding: "0 15px"
    }}
    >
        <div style={{ display: "inline-block" }}>{label}:</div>
        <div style={{ width: "100%" }}>{children}</div>
    </div>
}

const safeJSONCallback = (value: string, cb: (v: string) => void) => {
    try {
        JSON.parse(value);
        return cb(value)
    } catch (e) {
        return false;
    }
}

const App = () => {

    const [leftJSONStr, setLeftJSONStr] = useState(JSON.stringify(leftJson))
    const [rightJSONStr, setRightJSONStr] = useState(JSON.stringify(rightJson))
    const [jycmResultStr, setJYCMResultStr] = useState(JSON.stringify(diffResult))

    // use this can ave your time! see provider below
    const jycmContextValue = useJYCM({
        leftJsonStr,
        rightJsonStr,
        diffResult,
    });

    // In your component you can use all properties from jycm
    // using code 
    // const jycmContext = useContext(JYCMContext)!;


    return <div style={{ height: "100%", width: "100%" }}>
        <h1>Demo For JYCM render</h1>
        <div style={{ height: "100%", width: "100%", display: "flex" }}>
            <SimpleForm label="left JSON">
                <textarea
                    style={{ width: "100%", wordBreak: "break-all" }}
                    rows={5}
                    defaultValue={leftJSONStr}
                    onChange={e => { safeJSONCallback(e.target.value, setLeftJSONStr) }} />
            </SimpleForm>
            <SimpleForm label="right JSON">
                <textarea
                    style={{ width: "100%", wordBreak: "break-all" }}
                    rows={5}
                    defaultValue={rightJSONStr}
                    onChange={e => { safeJSONCallback(e.target.value, setRightJSONStr) }} />
            </SimpleForm>
            <SimpleForm label="JYCM Result">
                <textarea
                    style={{ width: "100%", wordBreak: "break-all" }}
                    rows={5}
                    defaultValue={jycmResultStr}
                    onChange={e => { safeJSONCallback(e.target.value, setJYCMResultStr) }} />
            </SimpleForm>
        </div>

        <div style={{ height: "800px", width: "100%", border: "1px solid red", marginTop: "15px" }}>
            {/********** any component under this provider can have access to the diff etc. 
            You can control the editor very easy.   **********/}
            <JYCMContext.Provider value={jycmContextValue}>
                <JYCMRender leftTitle="BenchMark" rightTitle="Actual"/>
            </JYCMContext.Provider>
        </div>
    </div>
}

ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement
)

```
# API
## JYCMContext 

`JYCMContext` Shared state across the context.

It gives you 

You can as follow 

```tsx

import React, { FC, useState } from 'react';
import ReactDOM from 'react-dom';

import {
  JYCMRender,
  JYCMContext,
  IUseJYCMProps,
  IJYCMRenderProps,
  useJYCM,
} from "react-jycm-viewer";

const CustomApp: React.FC<any> = () => {
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

const App: React.FC<any> = ({ leftJsonStr, rightJsonStr, diffResult, ...args }) => {
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
            <CustomApp />
          </div>
        </div>
      </JYCMContext.Provider>
    </div>
  );
};

ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement
)
```

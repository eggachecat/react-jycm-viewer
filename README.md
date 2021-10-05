# React Json Diff Viewer

This is the renderer for [JYCM](https://github.com/eggachecat/jycm).

# Setup
## Install
```bash
yarn add react-jycm-viewer
yarn add -D monaco-editor-webpack-plugin
```
## with Webpack
This is necessary for using [monaco-editor](https://github.com/microsoft/monaco-editor).
```js
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
module.exports = {
  plugins: [
    new MonacoWebpackPlugin({
      // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
      languages: ['json']
    })
  ]
};
``` 

# Usage

## Basic

```js
import React from 'react';
import { render } from 'react-dom';
import JYCMRender from "./components/jycm-render";

const App = () => {

    const leftJSONStr = {
        "a": 1,
        "b": 2,
        "d": "12345",
        "f": false,
        "e": [
            { "x": 1, "y": 1 },
            { "x": 2, "y": 2 },
            { "x": 3, "y": 3 },
            { "x": 4, "y": 4 },
        ]
    })

    const rightJSONStr = JSON.stringify({
        "a": 1,
        "b": 3,
        "c": 4,
        "f": false,
        "e": [
            { "x": 0, "y": 1 },
            { "x": 2, "y": 2 },
            { "x": 3, "y": 3 },
            { "x": 5, "y": 5 },
        ]
    })

    const jycmResult = {
        'dict:add': [
            {
                'left': '__NON_EXIST__',
                'left_path': '',
                'right': 4,
                'right_path': 'c'
            }
        ],
        'dict:remove': [
            {
                'left': '12345',
                'left_path': 'd',
                'right': '__NON_EXIST__',
                'right_path': ''
            }
        ],
        'list:add': [
            {
                'left': '__NON_EXIST__',
                'left_path': '',
                'right': { 'x': 5, 'y': 5 },
                'right_path': 'e->[3]'
            }
        ],
        'list:remove': [
            {
                'left': { 'x': 4, 'y': 4 },
                'left_path': 'e->[3]',
                'right': '__NON_EXIST__',
                'right_path': ''
            }
        ],
        'value_changes': [
            {
                'left': 2,
                'left_path': 'b',
                'new': 3,
                'old': 2,
                'right': 3,
                'right_path': 'b'
            },
            {
                'left': 1,
                'left_path': 'e->[0]->x',
                'new': 0,
                'old': 1,
                'right': 0,
                'right_path': 'e->[0]->x'
            },
            {
                'left': false,
                'left_path': 'f',
                'new': true,
                'old': false,
                'right': true,
                'right_path': 'f'
            }
        ]
    }
    
    return <div style={{ height: "100%", width: "100%" }}>
        <div style={{
          height: "800px",
          width: "100%"
        }}>
            <JYCMRender
                leftJsonStr={leftJSONStr}
                rightJsonStr={rightJSONStr}
                diffResult={JSON.parse(jycmResultStr)} />
        </div>
    </div>
}

ReactDOM.render(
    <App />,
    document.getElementById('root') as HTMLElement
)
```

# Contributing
## dev
```bash
yarn
yarn start
```

## build
```bash
yarn build
```

import React from 'react';


import MonacoEditor from 'react-monaco-editor';
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";

import { useJYCMContext } from '..';
import { jsonPathToPathKey } from '@@/utils';

export const DiffDetailViewer: React.FC<any> = () => {
    const { pairInfo, activeLeftJsonPath, activeRightJsonPath, leftJsonPath2DiffDetail } =
        useJYCMContext();
    
        console.log(leftJsonPath2DiffDetail[jsonPathToPathKey(activeLeftJsonPath)])
    return (
        <AutoSizer>
            {({ height, width }) => {
                return (
                    <MonacoEditor
                        width={`${width}px`}
                        height={`${height}px`}
                        theme="vs"
                        language="json"
                        value={JSON.stringify(pairInfo, null, 2)}
                        options={{
                            readOnly: true,
                            automaticLayout: true,
                            folding: true,
                            wordWrap: "on",
                        }}
                    />
                );
            }}
        </AutoSizer>
    );
};

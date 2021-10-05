import React, { FC, useState } from 'react';
import ReactDOM from 'react-dom';

import JYCMRender from "../src/index";
import { leftJson, rightJson, diffResult } from "../src/render-case/case-1";

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

import './sand-box.css';

import React from 'react';
import ReactDOM from 'react-dom';

import JYCMLib, {
    JYCMRender,
    JYCMContext,
    IUseJYCMProps,
    IJYCMRenderProps,
    useJYCM,
    useJYCMContext
} from "./index";
import MonacoEditor from 'react-monaco-editor';
import { DiffDetailViewer } from './components/jycm-diff-detail-viewer-simple';


const safeJSONCallback = (value: string, cb: (v: string) => void) => {
    try {
        JSON.parse(value);
        return cb(value)
    } catch (e) {
        return false;
    }
}

const useInterval = (func: () => void, timeout: number) => {
    const funcRef = React.useRef(func);

    React.useEffect(() => {
        function doJob() {
            funcRef.current && funcRef.current()
        }
        const timer = setInterval(doJob, timeout);

        return () => {
            clearInterval(timer);
        }
    }, [func, timeout])
}



const useWindowData = () => {
    const [leftJsonStr, setLeftJsonStr] = React.useState('{}')
    const [rightJsonStr, setRightJsonStr] = React.useState('{}')
    const [diffResult, setJYCMResult] = React.useState({});

    const obData = React.useCallback(() => {
        // // @ts-ignore
        // console.log('ob', window.jycmLeftJsonStr, window.jycmLeftJsonStr, window.diffResult)
        // @ts-ignore
        safeJSONCallback(window.jycmLeftJsonStr, v => setLeftJsonStr(v))
        // @ts-ignore
        safeJSONCallback(window.jycmRightJsonStr, v => setRightJsonStr(v))
        // @ts-ignore
        if (window.diffResult && typeof window.diffResult === 'object') {
            // @ts-ignore
            setJYCMResult(window.diffResult || {})
        }
    }, [])

    useInterval(obData, 1000);

    return {
        leftJsonStr,
        rightJsonStr,
        diffResult
    }
}

function SandBox() {
    const {
        leftJsonStr,
        rightJsonStr,
        diffResult,
    } = useWindowData();

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
        <div style={{ height: "100%", width: "100%" }}>
            {/********** any component under this provider can have access to the diff etc. 
            You can control the editor very easy.   **********/}
            <JYCMContext.Provider value={jycmContextValue}>
                {/* <JYCMRender leftTitle="BenchMark" rightTitle="Actual" /> */}
                <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
                    <div style={{ flexGrow: 1, height: "100%" }}>
                        <JYCMRender leftTitle='Left' rightTitle='Right' />
                    </div>
                    <div style={{ flexBasis: "24%", height: '100%', display: "flex", flexDirection: "column" }}>
                        <div style={{ textAlign: 'center', fontWeight: 700 }}>Diff Detail</div>
                        <div style={{ flexGrow: 1 }}>
                            <DiffDetailViewer />
                        </div>
                    </div>
                </div>
            </JYCMContext.Provider>

        </div>
    </div>
}

ReactDOM.render(
    <SandBox />,
    document.getElementById('root') as HTMLElement
)
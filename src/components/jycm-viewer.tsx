import {EVENT_LIST_ADD, EVENT_LIST_REMOVE, EVENT_PAIR} from '../common';
import MonacoJsonHighlighter, {IMonacoJsonHighlighter} from './monaco-json-highlighter';
import useDecorations from '../hooks/useDecorations';
import useHighlightPathRegexDecorations from '../hooks/useHighlightPathRegexDecorations';
import useJsonInfo from '../hooks/useJsonInfo';
import {IDiffDetailItem} from '../typings';
import {jsonPathToPathKey, pathKeyToJsonPath, TRowsToStr} from '../utils';
import React, {FC, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';


const CodeDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  & .title {
    /* height: 100px; */
    /* margin-left: 25px; */
    font-weight: 800;
    text-align: center;
  }
  & .code {
    flex-grow: 1;
    display: flex;
    /* height: 100%; */
    overflow: hidden;
    & .code__container {
      display: flex;
    }
  }

  border-right: 1px dashed rgba(0, 0, 0, 0.1);
`;

const JYCMRender: FC<{
    leftJsonStr: string;
    rightJsonStr: string;
    leftTitle?: React.ReactNode;
    rightTitle?: React.ReactNode;
    pathRegexToHighlight?: string;
    // rules: TJsonPathConfigRule[];
    controlled?: boolean;
    diffResult: any;
}> = ({
          leftJsonStr: leftJsonStr,
          rightJsonStr: rightJsonStr,
          // rules,
          leftTitle = 'benchmark',
          rightTitle = 'actual',
          pathRegexToHighlight,
          // controlled = false,
          diffResult,
      }) => {
    // const {
    //   mutate: diffJson,
    //   data: diffResultFromHook,
    //   isLoading: isDiffing,
    // } = useCachedMutation(useJSONDiffTool);

    // const diffResult = controlled ? controlledDiffResult : diffResultFromHook;

    // const debouncedDiffJson = useCallback(
    //   debounce(diffJson, 2500, { leading: true }),
    //   [],
    // );

    // useEffect(() => {
    //   if (!controlled) {
    //     debouncedDiffJson({ oldStr: oldJsonStr, newStr: newJsonStr, rules });
    //   }
    // }, [oldJsonStr, newJsonStr, rules]);


    const [jsonPathKeyPairs, setJsonPathKeyPairs] = useState<{
        left: { [_: string]: string };
        right: { [_: string]: string };
    }>({left: {}, right: {}});


    const [diffDetailDict, setDiffDetailDict] = useState<{
        [_: string]: IDiffDetailItem;
    }>({});

    useEffect(() => {
        if (diffResult) {
            const _diffDetailDict = diffResult;
            setDiffDetailDict(_diffDetailDict);
            if (_diffDetailDict[EVENT_PAIR]) {
                const _jsonPathKeyPair: any = {left: {}, right: {}};
                _diffDetailDict[EVENT_PAIR].forEach((p: any) => {
                    _jsonPathKeyPair.left[p.left_path as string] = p.right_path;
                    _jsonPathKeyPair.right[p.right_path as string] = p.left_path;
                });
                setJsonPathKeyPairs(_jsonPathKeyPair);
            }
        }
    }, [diffResult]);

    const [activeLeftJsonPath, setActiveLeftJsonPath] = useState<any[]>([]);
    const [activeRightJsonPath, setActiveRightJsonPath] = useState<any[]>([]);

    const {
        jsonRows: leftJsonRows,
        pathKey2Index: leftPathKey2Index,
    } = useJsonInfo(leftJsonStr);
    const {
        jsonRows: rightJsonRows,
        pathKey2Index: rightPathKey2Index,
    } = useJsonInfo(rightJsonStr);

    const {
        decorations: defaultLeftDecorations,
    } = useHighlightPathRegexDecorations(leftJsonRows, pathRegexToHighlight);

    const {
        decorations: defaultRightDecorations,
    } = useHighlightPathRegexDecorations(rightJsonRows, pathRegexToHighlight);

    const {
        decorations: leftDecorations,
        diffDetailDict: leftJsonPath2DiffDetail,
    } = useDecorations(
        diffDetailDict,
        leftPathKey2Index,
        'left',
        leftJsonRows,
        activeLeftJsonPath,
    );

    const {
        decorations: rightDecorations,
        diffDetailDict: rightJsonPath2DiffDetail,
    } = useDecorations(
        diffDetailDict,
        rightPathKey2Index,
        'right',
        rightJsonRows,
        activeRightJsonPath,
    );

    const leftEditorRef = useRef<IMonacoJsonHighlighter>(null);
    const rightEditorRef = useRef<IMonacoJsonHighlighter>(null);

    const pairInfo = {
        ...leftJsonPath2DiffDetail[jsonPathToPathKey(activeLeftJsonPath)],
        ...rightJsonPath2DiffDetail[jsonPathToPathKey(activeRightJsonPath)],
    };

    const isJsonPathAdd = (jsonPath_: any[]) => {
        const _jsonPath = [...jsonPath_];
        while (_jsonPath.length > 0) {
            if (
                rightJsonPath2DiffDetail[jsonPathToPathKey(_jsonPath)]?.[EVENT_LIST_ADD]
            ) {
                return true;
            }
            _jsonPath.pop();
        }
        return false;
    };

    const isJsonPathRemove = (jsonPath_: any[]) => {
        const _jsonPath = [...jsonPath_];
        while (_jsonPath.length > 0) {
            if (
                leftJsonPath2DiffDetail[jsonPathToPathKey(_jsonPath)]?.[
                    EVENT_LIST_REMOVE
                    ]
            ) {
                return true;
            }
            _jsonPath.pop();
        }
        return false;
    };

    const clickOnLeft = (
        _rowIndex: number,
        _startIndex: number,
        _moveSelf = false,
    ) => {
        const delta = _rowIndex - _startIndex;
        const row = leftJsonRows[_rowIndex];

        if (_moveSelf && leftEditorRef) {
            leftEditorRef.current!.goTo(Math.max(0, _startIndex) + 1);
        }

        if (row?.jsonPath) {
            setActiveLeftJsonPath(row.jsonPath);
            const thisPathKey = jsonPathToPathKey(row.jsonPath);
            const pairPathKey = jsonPathKeyPairs.left[thisPathKey] || thisPathKey;
            if (pairPathKey) {
                if (
                    leftJsonPath2DiffDetail[thisPathKey]?.[EVENT_LIST_REMOVE] ||
                    isJsonPathRemove(pathKeyToJsonPath(thisPathKey))
                ) {
                    setActiveRightJsonPath([]);
                } else {
                    setActiveRightJsonPath(pathKeyToJsonPath(pairPathKey));
                    rightEditorRef.current!.goTo(
                        Math.max(0, rightPathKey2Index[pairPathKey] - delta) + 1,
                    );
                }
            } else {
                setActiveRightJsonPath([]);
            }
        }
    };

    const clickOnRight = (
        _rowIndex: number,
        _startIndex: number,
        _moveSelf = false,
    ) => {
        const delta = _rowIndex - _startIndex;
        const row = rightJsonRows[_rowIndex];

        if (_moveSelf && rightEditorRef) {
            rightEditorRef.current!.goTo(Math.max(0, _startIndex) + 1);
        }

        if (row?.jsonPath) {
            setActiveRightJsonPath(row.jsonPath);
            const thisPathKey = jsonPathToPathKey(row.jsonPath);
            const pairPathKey = jsonPathKeyPairs.right[thisPathKey] || thisPathKey;
            if (pairPathKey) {
                if (
                    rightJsonPath2DiffDetail[thisPathKey]?.[EVENT_LIST_ADD] ||
                    isJsonPathAdd(pathKeyToJsonPath(thisPathKey))
                ) {
                    setActiveLeftJsonPath([]);
                } else {
                    setActiveLeftJsonPath(pathKeyToJsonPath(pairPathKey));
                    leftEditorRef.current!.goTo(
                        Math.max(0, leftPathKey2Index[pairPathKey] - delta) + 1,
                    );
                }
            } else {
                setActiveLeftJsonPath([]);
            }
        }
    };


    return (
        <div
            style={{
                height: '100%',
                overflow: 'hidden',
            }}>
            <div
                style={{height: '100%', width: '100%'}}
            >
                <div style={{
                    height: '100%',
                    overflow: 'hidden',
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <CodeDiv style={{width: "50%"}}>
                        <div className="title" style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>{leftTitle}</div>
                        <div className="code">
                            <MonacoJsonHighlighter
                                ref={leftEditorRef}
                                jsonStr={TRowsToStr(leftJsonRows)}
                                decorations={[...leftDecorations, ...defaultLeftDecorations]}
                                onClick={(_rowIndex, _startIndex) =>
                                    clickOnLeft(_rowIndex, _startIndex)
                                }
                            />
                        </div>
                    </CodeDiv>
                    <CodeDiv style={{width: "50%"}}>
                        <div className="title" style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>{rightTitle}</div>
                        <div className="code">
                            <MonacoJsonHighlighter
                                ref={rightEditorRef}
                                jsonStr={TRowsToStr(rightJsonRows)}
                                decorations={[
                                    ...rightDecorations,
                                    ...defaultRightDecorations,
                                ]}
                                onClick={(_rowIndex, _startIndex) =>
                                    clickOnRight(_rowIndex, _startIndex)
                                }
                            />
                        </div>
                    </CodeDiv>
                </div>
            </div>
        </div>
    );
};

export default JYCMRender;

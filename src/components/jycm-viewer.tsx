import { useJYCMContext } from '@@/contexts/JYCM';
import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { EVENT_LIST_ADD, EVENT_LIST_REMOVE } from '../common';
import useHighlightPathRegexDecorations from '../hooks/useHighlightPathRegexDecorations';
import { jsonPathToPathKey, pathKeyToJsonPath, TRowsToStr } from '../utils';
import MonacoJsonHighlighter from './monaco-json-highlighter';


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

export type IJYCMRenderProps = {
  leftTitle?: React.ReactNode;
  rightTitle?: React.ReactNode;
  pathRegexToHighlight?: string;
  // rules: TJsonPathConfigRule[];
  controlled?: boolean;
  containerStyle?: React.CSSProperties;
  leftStyle?: React.CSSProperties;
  rightStyle?: React.CSSProperties;
};

export const JYCMRender: FC<IJYCMRenderProps> = ({
  // rules,
  leftTitle = "benchmark",
  rightTitle = "actual",
  pathRegexToHighlight,
  // controlled = false,
  containerStyle,
  leftStyle,
  rightStyle,
}) => {
  const {
    jsonPathKeyPairs,
    setJsonPathKeyPairs,
    diffDetailDict,
    setDiffDetailDict,
    activeLeftJsonPath,
    setActiveLeftJsonPath,
    activeRightJsonPath,
    setActiveRightJsonPath,
    leftJsonRows,
    leftPathKey2Index,
    rightJsonRows,
    rightPathKey2Index,
    leftDecorations,
    leftJsonPath2DiffDetail,
    rightDecorations,
    rightJsonPath2DiffDetail,
    leftEditorRef,
    rightEditorRef,
    pairInfo,
  } = useJYCMContext()!;

  const { decorations: defaultLeftDecorations } =
    useHighlightPathRegexDecorations(leftJsonRows, pathRegexToHighlight);

  const { decorations: defaultRightDecorations } =
    useHighlightPathRegexDecorations(rightJsonRows, pathRegexToHighlight);

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
    _moveSelf = false
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
            Math.max(0, rightPathKey2Index[pairPathKey] - delta) + 1
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
    _moveSelf = false
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
            Math.max(0, leftPathKey2Index[pairPathKey] - delta) + 1
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
        height: "100%",
        minHeight: "350px",
        overflow: "hidden",
        ...containerStyle,
      }}
    >
      <div style={{ height: "100%", width: "100%" }}>
        <div
          style={{
            height: "100%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CodeDiv style={{ width: "50%" }}>
            <div
              className="title"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {leftTitle}
            </div>
            <div className="code" style={{ minHeight: "350px", ...leftStyle }}>
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
          <CodeDiv style={{ width: "50%" }}>
            <div
              className="title"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {rightTitle}
            </div>
            <div className="code" style={{ minHeight: "350px", ...rightStyle }}>
              <MonacoJsonHighlighter
                ref={rightEditorRef}
                jsonStr={TRowsToStr(rightJsonRows)}
                decorations={[...rightDecorations, ...defaultRightDecorations]}
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

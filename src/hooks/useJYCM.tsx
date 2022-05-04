import { EVENT_PAIR } from "@@/common";
import { IMonacoJsonHighlighter } from "@@/components/monaco-json-highlighter";
import { IDiffDetailItem } from "@@/typings";
import { jsonPathToPathKey } from "@@/utils";
import { useEffect, useRef, useState } from "react";

import useDecorations from "./useDecorations";
import useJsonInfo from "./useJsonInfo";

export type IUseJYCMProps = {
  leftJsonStr: string;
  rightJsonStr: string;
  diffResult: any;
};

export const useJYCM = ({ leftJsonStr, rightJsonStr, diffResult }: IUseJYCMProps) => {
  const [jsonPathKeyPairs, setJsonPathKeyPairs] = useState<{
    left: { [_: string]: string };
    right: { [_: string]: string };
  }>({ left: {}, right: {} });

  const [diffDetailDict, setDiffDetailDict] = useState<{
    [_: string]: IDiffDetailItem;
  }>({});

  useEffect(() => {
    if (diffResult) {
      const _diffDetailDict = diffResult;
      setDiffDetailDict(_diffDetailDict);
      if (_diffDetailDict[EVENT_PAIR]) {
        const _jsonPathKeyPair: any = { left: {}, right: {} };
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

  const { jsonRows: leftJsonRows, pathKey2Index: leftPathKey2Index } =
    useJsonInfo(leftJsonStr);
  const { jsonRows: rightJsonRows, pathKey2Index: rightPathKey2Index } =
    useJsonInfo(rightJsonStr);

  const {
    decorations: leftDecorations,
    diffDetailDict: leftJsonPath2DiffDetail,
  } = useDecorations(
    diffDetailDict,
    leftPathKey2Index,
    "left",
    leftJsonRows,
    activeLeftJsonPath
  );

  const {
    decorations: rightDecorations,
    diffDetailDict: rightJsonPath2DiffDetail,
  } = useDecorations(
    diffDetailDict,
    rightPathKey2Index,
    "right",
    rightJsonRows,
    activeRightJsonPath
  );

  const leftEditorRef = useRef<IMonacoJsonHighlighter>(null);
  const rightEditorRef = useRef<IMonacoJsonHighlighter>(null);

  const [pairInfo, setPairInfo] = useState({});
  useEffect(() => {
    setPairInfo({
      ...leftJsonPath2DiffDetail[jsonPathToPathKey(activeLeftJsonPath)],
      ...rightJsonPath2DiffDetail[jsonPathToPathKey(activeRightJsonPath)],
    });
  }, [
    activeLeftJsonPath,
    activeRightJsonPath,
    leftJsonPath2DiffDetail,
    rightJsonPath2DiffDetail,
  ]);

  return {
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
  };
};

export type IUseJYCM = ReturnType<typeof useJYCM>;

export default useJYCM;

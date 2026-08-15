import { EVENT_PAIR } from "../common";
import { IMonacoJsonHighlighter } from "../components/monaco-json-highlighter";
import { IDiffDetailItem, JYCMDiffResult, TRow } from "../typings";
import { jsonPathToPathKey } from "../utils";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from "react";
import { monaco } from "react-monaco-editor";

import useDecorations from "./useDecorations";
import useJsonInfo from "./useJsonInfo";

export type IUseJYCMProps = {
  leftJsonStr: string;
  rightJsonStr: string;
  diffResult: JYCMDiffResult;
};

type PathPairs = {
  left: Record<string, string>;
  right: Record<string, string>;
};

type DiffByPath = Record<string, IDiffDetailItem>;

export type IUseJYCM = {
  jsonPathKeyPairs: PathPairs;
  diffDetailDict: JYCMDiffResult;
  activeLeftJsonPath: any[];
  setActiveLeftJsonPath: Dispatch<SetStateAction<any[]>>;
  activeRightJsonPath: any[];
  setActiveRightJsonPath: Dispatch<SetStateAction<any[]>>;
  leftJsonRows: TRow[];
  leftPathKey2Index: Record<string, number>;
  rightJsonRows: TRow[];
  rightPathKey2Index: Record<string, number>;
  leftDecorations: monaco.editor.IModelDeltaDecoration[];
  leftJsonPath2DiffDetail: DiffByPath;
  rightDecorations: monaco.editor.IModelDeltaDecoration[];
  rightJsonPath2DiffDetail: DiffByPath;
  leftEditorRef: RefObject<IMonacoJsonHighlighter>;
  rightEditorRef: RefObject<IMonacoJsonHighlighter>;
  pairInfo: Record<string, unknown>;
};

export const useJYCM = ({
  leftJsonStr,
  rightJsonStr,
  diffResult,
}: IUseJYCMProps): IUseJYCM => {
  const diffDetailDict = diffResult || {};
  const jsonPathKeyPairs = useMemo<PathPairs>(() => {
    const pairs: PathPairs = { left: {}, right: {} };
    (diffDetailDict[EVENT_PAIR] || []).forEach((pair) => {
      pairs.left[pair.left_path] = pair.right_path;
      pairs.right[pair.right_path] = pair.left_path;
    });
    return pairs;
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
    "left",
    leftJsonRows,
    activeLeftJsonPath
  );

  const {
    decorations: rightDecorations,
    diffDetailDict: rightJsonPath2DiffDetail,
  } = useDecorations(
    diffDetailDict,
    "right",
    rightJsonRows,
    activeRightJsonPath
  );

  const leftEditorRef = useRef<IMonacoJsonHighlighter>(null);
  const rightEditorRef = useRef<IMonacoJsonHighlighter>(null);

  const pairInfo = useMemo(
    () => ({
      ...leftJsonPath2DiffDetail[jsonPathToPathKey(activeLeftJsonPath)],
      ...rightJsonPath2DiffDetail[jsonPathToPathKey(activeRightJsonPath)],
    }),
    [
      activeLeftJsonPath,
      activeRightJsonPath,
      leftJsonPath2DiffDetail,
      rightJsonPath2DiffDetail,
    ]
  );

  return {
    jsonPathKeyPairs,
    diffDetailDict,
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

export default useJYCM;

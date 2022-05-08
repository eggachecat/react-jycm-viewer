import { EVENT_PAIR, NON_EXIST_PLACE_HOLDER } from "../common";
import { IDiffDetailItem, TRow } from "../typings";
import { isJsonPathsMatch, jsonPathToPathKey } from "../utils";
import { useEffect, useState } from "react";
import { monaco } from "react-monaco-editor";

// 找到diff的最root的
// 比如 A->B 是新增的
// 试试上 A->B->x 这也是新增的
const findJsonPathToRoot = (
  jsonPath: any[],
  stopFunc: (_p: any[]) => boolean
): any[] => {
  const _jsonPath = [...jsonPath];
  while (_jsonPath.length > 0) {
    if (stopFunc(_jsonPath)) {
      return _jsonPath;
    }
    _jsonPath.pop();
  }
  return [];
};

const useDecorations = (
  rawDiffDetailDict: {
    [_: string]: IDiffDetailItem;
  },
  pathKey2Index: { [_: string]: number },
  mode: "left" | "right",
  rows: TRow[],
  activeJsonPath: any[]
) => {

  //  对于value_changes的变化
  const [diffDetailDict, setDiffDetailDict] = useState<{
    [_: string]: IDiffDetailItem;
  }>({});
  useEffect(() => {

    setDiffDetailDict(
      Object.keys(rawDiffDetailDict).reduce((dict, op) => {
        rawDiffDetailDict[op].forEach((item: any) => {
          if (item[mode] !== NON_EXIST_PLACE_HOLDER) {
            dict[item[`${mode}_path`]] = {
              ...dict[item[`${mode}_path`]],
              [op]: item,
            };
          }
        });

        return dict;
      }, {} as { [_: string]: IDiffDetailItem })
    );
  }, [rawDiffDetailDict]);

  const [decorations, setDecorations] = useState<
    monaco.editor.IModelDeltaDecoration[]
  >([]);

  useEffect(() => {
    const _decorations: monaco.editor.IModelDeltaDecoration[] = [];

    for (let i = 0; i < rows.length; i += 1) {
      const row = rows[i];
      const lineNumber = i + 1;

      const jsonPathForHighlight = findJsonPathToRoot(row.jsonPath, (v) =>
        isJsonPathsMatch(activeJsonPath, v)
      );
      // 高亮判断
      const needHighlight = jsonPathForHighlight.length > 0;

      if (needHighlight) {
        _decorations.push({
          range: new monaco.Range(lineNumber, 1, lineNumber, 1),
          options: {
            isWholeLine: true,
            glyphMarginClassName: "ycm-highlight",
            marginClassName: "ycm-highlight",
            minimap: {
              position: 1,
              color: "rgba(100, 100, 100, 0.5)",
            },
            zIndex: 0,
          },
        });
      }

      // 属性符号判断
      const jsonPathForDecoration = findJsonPathToRoot(
        row.jsonPath,
        (_p) => diffDetailDict[jsonPathToPathKey(_p)]
      );
      // console.log('jsonPathForDecoration', row.jsonPath, jsonPathForDecoration);
      if (jsonPathForDecoration.length === 0) {
        continue;
      }
      const jsonPathKeyForDecoration = jsonPathToPathKey(jsonPathForDecoration);
      const diffDetail = diffDetailDict[jsonPathKeyForDecoration];

      if (!diffDetail) {
        continue;
      }

      // console.log('diffDetail', JSON.stringify(diffDetail));

      Object.keys(diffDetail).forEach((op) => {
        const diffDetailForOp = diffDetail[op];

        if (op === EVENT_PAIR) {
          return;
        }

        if (diffDetailForOp[mode] === NON_EXIST_PLACE_HOLDER) {
          // 不存在
          return;
        }

        const className = diffDetailForOp.pass
          ? "ignore"
          : `${op.replace(/:/g, "-")} ${op.replace(/:/g, "-")}--${mode}`;

        _decorations.push({
          range: new monaco.Range(lineNumber, 1, lineNumber, 1),
          options: {
            isWholeLine: true,
            className,
            glyphMarginClassName: className,
            zIndex: 0,
          },
        });
      });
    }

    setDecorations(_decorations);
  }, [rawDiffDetailDict, diffDetailDict, pathKey2Index, mode, rows, activeJsonPath]);
  return { decorations, diffDetailDict };
};

export default useDecorations;

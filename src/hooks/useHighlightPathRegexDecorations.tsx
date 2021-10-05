import { TRow } from '../typings';
import { jsonPathToPathKey, isValidRegex } from '../utils';
import { useEffect, useState } from 'react';
import { monaco } from 'react-monaco-editor';

const useHighlightPathRegexDecorations = (
  jsonRows: TRow[],
  pathRegex?: string,
) => {
  const [decorations, setDecroations] = useState<
    monaco.editor.IModelDeltaDecoration[]
  >([]);

  useEffect(() => {
    if (pathRegex && isValidRegex(pathRegex)) {
      const matcher = RegExp(pathRegex);
      setDecroations(
        jsonRows
          .map((v, i) => ({
            ...v,
            lineNumber: 1 + i,
          }))
          .reduce((prev, curr) => {
            const { lineNumber } = curr;
            const pathKey = jsonPathToPathKey(curr.jsonPath);
            const _decorations: monaco.editor.IModelDeltaDecoration[] = [];
            if (matcher.test(pathKey)) {
              _decorations.push({
                range: new monaco.Range(lineNumber, 1, lineNumber, 1),
                options: {
                  glyphMarginClassName: 'ycm-highlight-rule',
                  marginClassName: 'ycm-highlight-rule',
                  zIndex: 1,
                },
              });
            }
            return [...prev, ..._decorations];
          }, [] as monaco.editor.IModelDeltaDecoration[]),
      );
    } else {
      setDecroations([]);
    }
  }, [jsonRows, pathRegex]);

  return { decorations };
};

export default useHighlightPathRegexDecorations;

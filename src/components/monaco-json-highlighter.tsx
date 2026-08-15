import * as React from "react";
import {
  ForwardRefExoticComponent,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import MonacoEditor, { monaco } from "react-monaco-editor";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import "./style.less";

export interface IMonacoJsonHighlighter {
  goTo: (_: number) => void;
}

const MonacoJsonHighlighter: ForwardRefExoticComponent<{
  jsonStr: string;
  decorations: monaco.editor.IModelDeltaDecoration[];
  onClick?: (clickedIndex: number, startIndex: number) => void;
  currentLineNumber?: number;
  editorRef?: React.RefObject<MonacoEditor>;
  ref?: Ref<IMonacoJsonHighlighter>;
}> = React.forwardRef((props, ref) => {
  const { jsonStr, decorations, onClick } = props;

  const editorRef = useRef<MonacoEditor>(null);

  const clickFuncRef = useRef(onClick);

  useEffect(() => {
    clickFuncRef.current = onClick;
  });

  const decorationIdsRef = useRef<string[]>([]);

  useEffect(() => {
    if (editorRef.current?.editor) {
      decorationIdsRef.current = editorRef.current.editor.deltaDecorations(
        decorationIdsRef.current,
        decorations
      );
    }
  }, [decorations]);

  useEffect(() => {
    if (editorRef.current?.editor) {
      const subscription = editorRef.current.editor.onMouseDown((e) => {
        if (e.target.position) {
          const { lineNumber } = e.target.position;
          const clickedIndex = lineNumber - 1;
          if (clickFuncRef.current) {
            clickFuncRef.current(
              clickedIndex,
              (editorRef.current?.editor?.getVisibleRanges()[0]
                .startLineNumber || 1) - 1
            );
          }
        }
      });
      return () => subscription.dispose();
    }
    return undefined;
  }, [editorRef]);

  useImperativeHandle(ref, () => ({
    goTo: (lineNumber: number) => {
      if (editorRef.current?.editor) {
        editorRef.current.editor.revealRangeAtTop({
          startLineNumber: lineNumber,
          startColumn: 1,
          endLineNumber: lineNumber,
          endColumn: 1,
        });
      }
    },
  }));

  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <MonacoEditor
            className="json-diff-editor"
            ref={editorRef}
            width={`${width}px`}
            height={`${height}px`}
            theme="vs"
            language="json"
            value={jsonStr}
            options={{
              readOnly: true,
              automaticLayout: true,
              folding: true,
            }}
          />
        );
      }}
    </AutoSizer>
  );
});

export default MonacoJsonHighlighter;

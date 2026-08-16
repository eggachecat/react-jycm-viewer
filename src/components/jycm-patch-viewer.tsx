import * as React from "react";
import styled from "styled-components";

import {
  JsonPatchOperation,
  PATCH_OPERATIONS,
  summarizeJsonPatch,
  validateJsonPatch,
} from "../patch-utils";

export * from "../patch-utils";

const Shell = styled.section`
  box-sizing: border-box;
  overflow: hidden;
  border: 1px solid #d9e0e7;
  border-radius: 12px;
  background: #fff;
  color: #17202a;
  font: 13px/1.45 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  * { box-sizing: border-box; }
  .patch-header, .patch-toolbar { display: flex; align-items: center; gap: 8px; }
  .patch-header { justify-content: space-between; padding: 13px 15px; border-bottom: 1px solid #e7ebef; }
  .patch-title { margin: 0; font-size: 15px; }
  .patch-count { color: #667085; font-size: 12px; }
  .patch-apply-result { margin: 0; padding: 10px 15px; border-bottom: 1px solid #d9e0e7; background: #ecfdf3; color: #14532d; font: 12px/1.5 ui-monospace, SFMono-Regular, Consolas, monospace; white-space: pre-wrap; }
  .patch-apply-result--error { color: #991b1b; background: #fff1f2; }
  button, input { font: inherit; }
  button { border: 1px solid #d0d7de; border-radius: 7px; padding: 6px 9px; color: #344054; background: #fff; cursor: pointer; }
  button:hover, button:focus-visible { border-color: #667085; outline: none; }
  .patch-filters { display: flex; flex-wrap: wrap; gap: 6px; padding: 10px 15px; border-bottom: 1px solid #eef1f4; background: #fafbfc; }
  .patch-filter--active { color: #fff; border-color: #25364a; background: #25364a; }
  .patch-search { min-width: 150px; flex: 1; border: 1px solid #d0d7de; border-radius: 7px; padding: 6px 9px; }
  .patch-body { display: grid; grid-template-columns: minmax(260px, 0.95fr) minmax(280px, 1.05fr); min-height: 300px; max-height: 600px; }
  .patch-list { margin: 0; padding: 0; overflow: auto; list-style: none; border-right: 1px solid #e7ebef; }
  .patch-row { width: 100%; display: grid; grid-template-columns: 28px 70px minmax(0, 1fr); gap: 8px; align-items: center; border: 0; border-bottom: 1px solid #eef1f4; border-radius: 0; padding: 10px 12px; text-align: left; }
  .patch-row--selected { background: #f0f6ff; box-shadow: inset 3px 0 #2878d0; }
  .patch-index { color: #98a2b3; text-align: right; }
  .patch-op { border-radius: 999px; padding: 3px 7px; text-align: center; font-weight: 750; font-size: 11px; text-transform: uppercase; }
  .patch-op--add, .patch-op--copy { color: #166534; background: #dcfce7; }
  .patch-op--remove { color: #991b1b; background: #fee2e2; }
  .patch-op--replace, .patch-op--move { color: #92400e; background: #fef3c7; }
  .patch-op--test { color: #3730a3; background: #e0e7ff; }
  .patch-path { overflow: hidden; color: #344054; font: 12px ui-monospace, SFMono-Regular, Consolas, monospace; text-overflow: ellipsis; white-space: nowrap; }
  .patch-detail { min-width: 0; overflow: auto; padding: 15px; }
  .patch-detail h4 { margin: 0 0 12px; font-size: 13px; }
  .patch-pointer { display: block; width: 100%; overflow-wrap: anywhere; border: 0; padding: 8px 10px; text-align: left; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; background: #f6f8fa; }
  .patch-pointer + .patch-pointer { margin-top: 7px; }
  .patch-value { overflow: auto; margin: 12px 0 0; padding: 12px; border-radius: 8px; background: #101828; color: #e6edf3; font: 12px/1.55 ui-monospace, SFMono-Regular, Consolas, monospace; white-space: pre-wrap; }
  .patch-empty { display: grid; min-height: 260px; place-items: center; color: #667085; }
  .patch-issues { margin: 0; padding: 8px 15px; color: #991b1b; background: #fff1f2; }

  @media (max-width: 680px) {
    .patch-header { align-items: flex-start; flex-direction: column; }
    .patch-body { grid-template-columns: 1fr; max-height: none; }
    .patch-list { max-height: 310px; border-right: 0; border-bottom: 1px solid #e7ebef; }
  }
`;

export type IJYCMPatchViewerProps = {
  patch: JsonPatchOperation[];
  title?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  selectedIndex?: number;
  defaultSelectedIndex?: number;
  showToolbar?: boolean;
  downloadFileName?: string;
  emptyState?: React.ReactNode;
  onSelectOperation?: (operation: JsonPatchOperation, index: number) => void;
  onNavigate?: (pointer: string, operation: JsonPatchOperation, index: number) => void;
  onCopy?: (serializedPatch: string) => void | Promise<void>;
  onDownload?: (serializedPatch: string, fileName: string) => void;
  onApply?: (patch: JsonPatchOperation[]) => unknown | Promise<unknown>;
};

/** Standalone RFC 6902 operation explorer; no JYCM context is required. */
export const JYCMPatchViewer: React.FC<IJYCMPatchViewerProps> = ({
  patch,
  title = "JSON Patch",
  className,
  style,
  selectedIndex,
  defaultSelectedIndex = 0,
  showToolbar = true,
  downloadFileName = "jycm.patch.json",
  emptyState = "No patch operations — documents are semantically equal.",
  onSelectOperation,
  onNavigate,
  onCopy,
  onDownload,
  onApply,
}) => {
  const [internalIndex, setInternalIndex] = React.useState(defaultSelectedIndex);
  const [filter, setFilter] = React.useState("all");
  const [query, setQuery] = React.useState("");
  const [copyState, setCopyState] = React.useState("Copy");
  const [applyState, setApplyState] = React.useState("Apply preview");
  const [applyResult, setApplyResult] = React.useState<unknown>();
  const [applyError, setApplyError] = React.useState("");
  const activeIndex = selectedIndex === undefined ? internalIndex : selectedIndex;
  const serializedPatch = React.useMemo(() => JSON.stringify(patch || [], null, 2), [patch]);
  const summary = React.useMemo(() => summarizeJsonPatch(patch), [patch]);
  const issues = React.useMemo(() => validateJsonPatch(patch), [patch]);
  const visible = React.useMemo(
    () =>
      (patch || [])
        .map((operation, index) => ({ operation, index }))
        .filter(({ operation }) => filter === "all" || operation.op === filter)
        .filter(({ operation }) =>
          `${operation.op} ${operation.path} ${operation.from || ""}`
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
        ),
    [patch, filter, query],
  );
  const detailEntry =
    visible.find(({ index }) => index === activeIndex) || visible[0];
  const selected = detailEntry?.operation;
  const detailIndex = detailEntry?.index;

  const select = (operation: JsonPatchOperation, index: number) => {
    if (selectedIndex === undefined) setInternalIndex(index);
    onSelectOperation?.(operation, index);
  };

  const copy = async () => {
    try {
      if (onCopy) await onCopy(serializedPatch);
      else if (typeof navigator !== "undefined" && navigator.clipboard)
        await navigator.clipboard.writeText(serializedPatch);
      else throw new Error("Clipboard API is unavailable");
      setCopyState("Copied");
    } catch {
      setCopyState("Copy failed");
    }
    window.setTimeout(() => setCopyState("Copy"), 1600);
  };

  const download = () => {
    if (onDownload) return onDownload(serializedPatch, downloadFileName);
    if (typeof document === "undefined") return;
    const url = URL.createObjectURL(new Blob([serializedPatch], { type: "application/json" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = downloadFileName;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const apply = async () => {
    if (!onApply) return;
    setApplyState("Applying…");
    setApplyError("");
    try {
      setApplyResult(await onApply(patch));
      setApplyState("Applied");
    } catch (error) {
      setApplyResult(undefined);
      setApplyError(error instanceof Error ? error.message : "Patch application failed");
      setApplyState("Apply failed");
    }
  };

  return (
    <Shell className={className} style={style} aria-label="JSON Patch viewer">
      <header className="patch-header">
        <div>
          <h3 className="patch-title">{title}</h3>
          <span className="patch-count">{patch?.length || 0} RFC 6902 operations</span>
        </div>
        {showToolbar && (
          <div className="patch-toolbar">
            {onApply && <button type="button" onClick={apply}>{applyState}</button>}
            <button type="button" onClick={copy}>{copyState}</button>
            <button type="button" onClick={download}>Download</button>
          </div>
        )}
      </header>
      {issues.length > 0 && (
        <ul className="patch-issues" aria-label="Patch validation issues">
          {issues.map((issue) => <li key={`${issue.index}-${issue.message}`}>#{issue.index + 1}: {issue.message}</li>)}
        </ul>
      )}
      {(applyResult !== undefined || applyError) && (
        <pre className={`patch-apply-result${applyError ? " patch-apply-result--error" : ""}`} aria-live="polite">
          {applyError || JSON.stringify(applyResult, null, 2)}
        </pre>
      )}
      {(patch?.length || 0) === 0 ? <div className="patch-empty">{emptyState}</div> : (
        <>
          <div className="patch-filters" aria-label="Patch filters">
            {[
              ["all", patch.length],
              ...PATCH_OPERATIONS.filter((op) => summary[op]).map((op) => [op, summary[op]]),
            ].map(([op, count]) => (
              <button
                key={String(op)}
                type="button"
                className={filter === op ? "patch-filter--active" : undefined}
                aria-pressed={filter === op}
                onClick={() => setFilter(String(op))}
              >
                {String(op)} {count}
              </button>
            ))}
            <input
              className="patch-search"
              type="search"
              value={query}
              aria-label="Filter patch paths"
              placeholder="Filter JSON Pointer paths"
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="patch-body">
            <ol className="patch-list">
              {visible.map(({ operation, index }) => (
                <li key={`${index}-${operation.op}-${operation.path}`}>
                  <button
                    type="button"
                    className={`patch-row${detailIndex === index ? " patch-row--selected" : ""}`}
                    aria-pressed={detailIndex === index}
                    onClick={() => select(operation, index)}
                  >
                    <span className="patch-index">{index + 1}</span>
                    <span className={`patch-op patch-op--${operation.op}`}>{operation.op}</span>
                    <span className="patch-path" title={operation.path}>{operation.path || "/"}</span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="patch-detail" aria-live="polite">
              {selected ? (
                <>
                  <h4>Operation {(detailIndex as number) + 1}: {selected.op}</h4>
                  <button
                    type="button"
                    className="patch-pointer"
                    onClick={() => onNavigate?.(selected.path, selected, detailIndex as number)}
                  >
                    path: {selected.path || "/"}
                  </button>
                  {selected.from !== undefined && (
                    <button
                      type="button"
                      className="patch-pointer"
                      onClick={() => onNavigate?.(selected.from!, selected, detailIndex as number)}
                    >
                      from: {selected.from}
                    </button>
                  )}
                  {"value" in selected && (
                    <pre className="patch-value">{JSON.stringify(selected.value, null, 2)}</pre>
                  )}
                </>
              ) : <div className="patch-empty">Select an operation to inspect it.</div>}
            </div>
          </div>
        </>
      )}
    </Shell>
  );
};

export default JYCMPatchViewer;

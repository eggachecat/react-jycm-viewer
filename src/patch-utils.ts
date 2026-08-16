export type JsonPatchOperation = {
  op: "add" | "remove" | "replace" | "move" | "copy" | "test";
  path: string;
  from?: string;
  value?: unknown;
};

export type JsonPatchValidationIssue = {
  index: number;
  message: string;
};

export const PATCH_OPERATIONS = ["add", "remove", "replace", "move", "copy", "test"];

export const validateJsonPatch = (
  patch: JsonPatchOperation[],
): JsonPatchValidationIssue[] => {
  const issues: JsonPatchValidationIssue[] = [];
  (patch || []).forEach((operation, index) => {
    if (!operation || !PATCH_OPERATIONS.includes(operation.op)) {
      issues.push({ index, message: "Unsupported or missing operation" });
      return;
    }
    if (typeof operation.path !== "string" || (operation.path && !operation.path.startsWith("/"))) {
      issues.push({ index, message: "Path must be a JSON Pointer" });
    }
    if (["add", "replace", "test"].includes(operation.op) && !("value" in operation)) {
      issues.push({ index, message: `${operation.op} requires a value` });
    }
    if (["move", "copy"].includes(operation.op) && typeof operation.from !== "string") {
      issues.push({ index, message: `${operation.op} requires a from pointer` });
    }
  });
  return issues;
};

export const summarizeJsonPatch = (patch: JsonPatchOperation[]) =>
  (patch || []).reduce<Record<string, number>>((summary, operation) => {
    summary[operation.op] = (summary[operation.op] || 0) + 1;
    return summary;
  }, {});

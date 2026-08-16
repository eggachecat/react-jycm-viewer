import * as React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import {
  JsonPatchOperation,
  JYCMPatchViewer,
  validateJsonPatch,
} from "../components/jycm-patch-viewer";

export default {
  title: "JYCMPatchViewer/Interactive workbench",
  component: JYCMPatchViewer,
  parameters: { layout: "fullscreen" },
} as ComponentMeta<typeof JYCMPatchViewer>;

const initialPatch: JsonPatchOperation[] = [
  { op: "test", path: "/version", value: 4 },
  { op: "replace", path: "/version", value: 5 },
  { op: "remove", path: "/order/legacyCode" },
  { op: "add", path: "/order/approved", value: true },
  { op: "move", from: "/items/2", path: "/items/0" },
  { op: "copy", from: "/order/customer", path: "/audit/customer" },
];

const before = {
  version: 4,
  order: { legacyCode: "OLD", approved: false, customer: "Acme" },
  items: ["A", "B", "C"],
  audit: {},
};

const pointerTokens = (pointer: string) =>
  pointer.slice(1).split("/").filter(Boolean).map((token) => token.replace(/~1/g, "/").replace(/~0/g, "~"));

const applyDemoPatch = (input: any, patch: JsonPatchOperation[]) => {
  const result = JSON.parse(JSON.stringify(input));
  const resolve = (pointer: string) => pointerTokens(pointer).reduce((value, token) => value[token], result);
  const parent = (pointer: string) => {
    const tokens = pointerTokens(pointer);
    const key = tokens.pop() as string;
    return [tokens.reduce((value, token) => value[token], result), key] as [any, string];
  };
  const remove = (pointer: string) => {
    const [container, key] = parent(pointer);
    if (Array.isArray(container)) container.splice(Number(key), 1);
    else delete container[key];
  };
  const add = (pointer: string, value: any) => {
    const [container, key] = parent(pointer);
    if (Array.isArray(container)) container.splice(key === "-" ? container.length : Number(key), 0, value);
    else container[key] = value;
  };
  patch.forEach((operation) => {
    if (operation.op === "test" && JSON.stringify(resolve(operation.path)) !== JSON.stringify(operation.value))
      throw new Error(`Test failed at ${operation.path}`);
    if (operation.op === "remove") remove(operation.path);
    if (operation.op === "replace") { remove(operation.path); add(operation.path, operation.value); }
    if (operation.op === "add") add(operation.path, operation.value);
    if (operation.op === "move" || operation.op === "copy") {
      const value = JSON.parse(JSON.stringify(resolve(operation.from as string)));
      if (operation.op === "move") remove(operation.from as string);
      add(operation.path, value);
    }
  });
  return result;
};

const Template: ComponentStory<typeof JYCMPatchViewer> = () => {
  const [text, setText] = React.useState(JSON.stringify(initialPatch, null, 2));
  const [patch, setPatch] = React.useState(initialPatch);
  const [message, setMessage] = React.useState("Patch is valid and ready to apply.");

  const update = (next: string) => {
    setText(next);
    try {
      const parsed = JSON.parse(next) as JsonPatchOperation[];
      const issues = validateJsonPatch(parsed);
      if (issues.length) setMessage(`${issues.length} validation issue(s)`);
      else {
        setPatch(parsed);
        setMessage("Patch is valid and ready to apply.");
      }
    } catch {
      setMessage("Keep typing — the last valid patch remains visible.");
    }
  };

  return (
    <main style={{ minHeight: "100vh", padding: 28, background: "#f4f7f9" }}>
      <header style={{ maxWidth: 860, marginBottom: 22 }}>
        <div style={{ color: "#2878d0", fontWeight: 750 }}>RFC 6902 workbench</div>
        <h1 style={{ margin: "6px 0", fontSize: 34 }}>Inspect, filter, and ship semantic patches.</h1>
        <p style={{ color: "#52606d" }}>
          Edit the operation array. The standalone viewer keeps the last valid patch,
          validates pointers, and supports copy, download, selection, and path navigation.
        </p>
      </header>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(260px, .65fr) minmax(0, 1.35fr)", gap: 18 }}>
        <label style={{ display: "grid", gap: 8 }}>
          <strong>Editable JSON Patch</strong>
          <textarea
            value={text}
            onChange={(event) => update(event.target.value)}
            style={{ minHeight: 540, resize: "vertical", border: "1px solid #d0d7de", borderRadius: 10, padding: 13, font: "12px/1.55 ui-monospace, monospace" }}
          />
          <span role="status" style={{ color: message.startsWith("Patch is valid") ? "#166534" : "#92400e" }}>{message}</span>
        </label>
        <JYCMPatchViewer
          patch={patch}
          title="Deployment patch"
          onNavigate={(pointer) => setMessage(`Navigate the JSON viewer to ${pointer || "/"}`)}
          onApply={(patchValue) => applyDemoPatch(before, patchValue)}
        />
      </div>
    </main>
  );
};

export const DemoPage = Template.bind({});

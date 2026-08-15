# React JYCM Viewer

Interactive React viewer for semantic JSON diffs produced by
[JYCM for Python](https://github.com/eggachecat/jycm) or
[JYCM for JavaScript](https://github.com/eggachecat/jycm-js).

Unlike a text-only JSON comparison, JYCM understands business-specific rules:
arrays can be matched by identity, selected paths can ignore ordering, numeric
values can use tolerances, and custom operators can define domain equality.
React JYCM Viewer renders that result in synchronized Monaco editors without
recomputing or discarding those semantics.

[Live demo](https://eggachecat.github.io/jycm-json-diff-viewer/) ·
[Python diff engine](https://github.com/eggachecat/jycm) ·
[JavaScript diff engine](https://github.com/eggachecat/jycm-js)

## When to use it

- API regression and contract testing
- configuration, policy, and infrastructure change review
- audit logs and approval workflows
- order, invoice, catalog, or other business-object comparisons
- debugging large nested JSON documents where raw text diffs are noisy

The viewer highlights added, removed, and changed nodes, keeps relocated items
aligned through JYCM pair metadata, and exposes the active paths and operation
details so applications can build their own review workflow.

## Install

```bash
npm install react-jycm-viewer react-monaco-editor monaco-editor
```

Monaco must be configured by the consuming application. With webpack:

```js
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
  plugins: [new MonacoWebpackPlugin({ languages: ["json"] })],
};
```

## Quick start

`JYCMViewer` accepts JSON objects or JSON strings and wires the context for you:

```tsx
import React from "react";
import { JYCMViewer, JYCMDiffResult } from "react-jycm-viewer";

const before = {
  order: { id: 42, status: "pending", total: 100 },
};
const after = {
  order: { id: 42, status: "paid", total: 100 },
};

const diffResult: JYCMDiffResult = {
  value_changes: [
    {
      left: "pending",
      right: "paid",
      left_path: "order->status",
      right_path: "order->status",
      old: "pending",
      new: "paid",
    },
  ],
};

export function OrderReview() {
  return (
    <div style={{ height: 600 }}>
      <JYCMViewer
        left={before}
        right={after}
        diffResult={diffResult}
        leftTitle="Before"
        rightTitle="After"
        showSummary
      />
    </div>
  );
}
```

The parent needs an explicit height because Monaco fills its container.

With `showSummary`, the viewer adds an accessible business-level status panel:
semantic equality, structural changes, rule checks, rule violations, and
matched pairs. It understands named rule events emitted by the Python and
JavaScript Business Diff Policy APIs.

For a custom layout, use the exported `summarizeJYCMDiff(diffResult)` helper or
render `<BusinessDiffSummary />` anywhere inside `JYCMContext.Provider`.

## Use a real JYCM result

The viewer does not invent a second diff format. Pass the output of
`YouchamaJsonDiffer.get_diff()` directly:

```python
from jycm.jycm import YouchamaJsonDiffer

diff_result = YouchamaJsonDiffer(before, after).get_diff()
```

```tsx
<JYCMViewer left={before} right={after} diffResult={diffResult} />
```

Keep `just4vis:pairs` in the result when moved or reordered array items should
stay synchronized across the two editors. If the result is only used by an API
or database, Python callers can use `get_diff(no_pairs=True)` to reduce payload
size.

## Business-specific diff rules

Business rules belong in JYCM's diff engine; the renderer preserves their
operation names and `pass` metadata. Common examples include:

- ignore timestamps, request IDs, or generated fields
- treat a list as a set at selected JSON paths
- pair list items by `id`, SKU, or another domain key
- compare money, coordinates, or measurements with a tolerance
- define a custom operator for domain-specific equivalence

See the Python project's
[custom operator guide](https://github.com/eggachecat/jycm#custom-operator) for
implementation examples.

## Custom review UI

Use the lower-level context API when an application needs a side panel,
approval controls, analytics, or custom navigation:

```tsx
import {
  JYCMContext,
  JYCMRender,
  useJYCM,
  useJYCMContext,
} from "react-jycm-viewer";

function SelectedChange() {
  const { activeLeftJsonPath, activeRightJsonPath, pairInfo } =
    useJYCMContext();

  return (
    <aside>
      <div>{activeLeftJsonPath.join(" → ")}</div>
      <div>{activeRightJsonPath.join(" → ")}</div>
      <pre>{JSON.stringify(pairInfo, null, 2)}</pre>
    </aside>
  );
}

function Review({ leftJsonStr, rightJsonStr, diffResult }) {
  const value = useJYCM({ leftJsonStr, rightJsonStr, diffResult });

  return (
    <JYCMContext.Provider value={value}>
      <JYCMRender leftTitle="Expected" rightTitle="Actual" />
      <SelectedChange />
    </JYCMContext.Provider>
  );
}
```

`JYCMRender` also accepts `pathRegexToHighlight`, `containerStyle`,
`leftStyle`, and `rightStyle` for application-level customization.

## Performance model

JSON parsing, row indexing, rendered strings, and Monaco decoration arrays are
memoized by input. Monaco decoration IDs are updated through refs, avoiding a
React render loop, and editor mouse subscriptions are disposed on unmount.
Consumers should keep `left`, `right`, and `diffResult` references stable when
their contents have not changed.

## Development

```bash
pnpm install
pnpm run check
pnpm run storybook
```

`pnpm run check` runs the TypeScript contract check and builds both CommonJS
and ES module packages.

## License

MIT

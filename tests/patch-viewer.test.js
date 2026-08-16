const assert = require("assert");

const {
  summarizeJsonPatch,
  validateJsonPatch,
} = require("../.test-build/patch-utils.js");

const valid = [
  { op: "test", path: "/version", value: 1 },
  { op: "replace", path: "/version", value: 2 },
  { op: "move", from: "/items/1", path: "/items/0" },
];

assert.deepStrictEqual(validateJsonPatch(valid), []);
assert.deepStrictEqual(summarizeJsonPatch(valid), {
  test: 1,
  replace: 1,
  move: 1,
});
assert.deepStrictEqual(
  validateJsonPatch([
    { op: "add", path: "not-a-pointer" },
    { op: "copy", path: "/copy" },
  ]),
  [
    { index: 0, message: "Path must be a JSON Pointer" },
    { index: 0, message: "add requires a value" },
    { index: 1, message: "copy requires a from pointer" },
  ],
);

console.log("Patch viewer helpers passed");

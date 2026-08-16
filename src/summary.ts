import { EVENT_PAIR } from "./common";
import { JYCMDiffResult, JYCMDiffSummary, JYCMRuleViolation } from "./typings";

const STANDARD_EVENTS = new Set([
  "dict:add",
  "dict:remove",
  "list:add",
  "list:remove",
  "value_changes",
]);

/** Turn a raw JYCM event dictionary into dashboard-ready business metrics. */
export const summarizeJYCMDiff = (diffResult: JYCMDiffResult): JYCMDiffSummary => {
  const events: Record<string, number> = {};
  const violations: JYCMRuleViolation[] = [];
  const affectedPaths = new Set<string>();
  let changeCount = 0;
  let ruleEvaluationCount = 0;

  Object.entries(diffResult || {}).forEach(([event, records]) => {
    if (event === EVENT_PAIR || records.length === 0) return;
    events[event] = records.length;
    if (STANDARD_EVENTS.has(event)) {
      changeCount += records.length;
      records.forEach((record) => {
        const path = record.right_path || record.left_path;
        if (path) affectedPaths.add(path);
      });
      return;
    }
    ruleEvaluationCount += records.length;
    records.forEach((record) => {
      if (record.pass === false) {
        const violation = { event, ...record } as JYCMRuleViolation;
        violations.push(violation);
        const path = record.right_path || record.left_path;
        if (path) affectedPaths.add(path);
      }
    });
  });

  return {
    equal: changeCount === 0 && violations.length === 0,
    change_count: changeCount,
    rule_evaluation_count: ruleEvaluationCount,
    rule_violation_count: violations.length,
    matched_pair_count: (diffResult?.[EVENT_PAIR] || []).length,
    affected_paths: Array.from(affectedPaths).sort(),
    events,
    violations,
  };
};

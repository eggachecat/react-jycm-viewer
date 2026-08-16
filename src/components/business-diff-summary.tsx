import * as React from "react";
import styled from "styled-components";

import { useJYCMContext } from "../contexts/JYCM";

const Summary = styled.section`
  box-sizing: border-box;
  margin-bottom: 10px;
  padding: 12px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  color: #111827;
  font: 13px/1.4 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  .metrics { display: flex; flex-wrap: wrap; gap: 8px; }
  .metric { padding: 5px 9px; border-radius: 999px; background: #f3f4f6; }
  .status--pass { color: #166534; background: #dcfce7; }
  .status--fail { color: #991b1b; background: #fee2e2; }
  .violations { margin: 9px 0 0; padding-left: 20px; color: #7f1d1d; }
  .path { color: #4b5563; font-family: ui-monospace, SFMono-Regular, monospace; }
`;

export type IBusinessDiffSummaryProps = { maxViolations?: number };

/** Compact, accessible summary of changes and business-rule outcomes. */
export const BusinessDiffSummary: React.FC<IBusinessDiffSummaryProps> = ({
  maxViolations = 3,
}) => {
  const { summary } = useJYCMContext();
  return (
    <Summary aria-label="Business diff summary" aria-live="polite">
      <div className="metrics">
        <span className={`metric status--${summary.equal ? "pass" : "fail"}`}>
          {summary.equal ? "Semantically equal" : "Review required"}
        </span>
        <span className="metric">{summary.change_count} changes</span>
        <span className="metric">{summary.rule_evaluation_count} rule checks</span>
        <span className="metric">{summary.rule_violation_count} violations</span>
        <span className="metric">{summary.matched_pair_count} matched pairs</span>
      </div>
      {summary.violations.length > 0 && (
        <ul className="violations">
          {summary.violations.slice(0, maxViolations).map((violation, index) => (
            <li key={`${violation.event}-${violation.left_path}-${index}`}>
              {String(violation.rule || violation.event)} at{" "}
              <span className="path">
                {violation.right_path || violation.left_path || "root"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Summary>
  );
};

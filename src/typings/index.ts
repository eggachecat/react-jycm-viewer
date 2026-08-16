export type TRow = {
  jsonPath: any[];
  key: string | undefined;
  content: any;
  // 左括号 右括号
  special?: boolean;
  // 是否是开括号
  specialOpen?: boolean;
  needComma?: boolean;
  pairIndex?: number;
};

export type JYCMDiffRecord = {
  left: unknown;
  right: unknown;
  left_path: string;
  right_path: string;
  pass?: boolean;
  [key: string]: unknown;
};

export type JYCMDiffResult = Record<string, JYCMDiffRecord[]>;

export type JYCMRuleViolation = JYCMDiffRecord & {
  event: string;
  rule?: string;
  pass: false;
};

export type JYCMDiffSummary = {
  equal: boolean;
  change_count: number;
  rule_evaluation_count: number;
  rule_violation_count: number;
  matched_pair_count: number;
  affected_paths: string[];
  events: Record<string, number>;
  violations: JYCMRuleViolation[];
};

interface IDiffDetailItemMeta {
  left: any;
  right: any;
  left_path: string;
  right_path: string;
}

export type IDiffDetailItem = IDiffDetailItemMeta & any;

export type IOperationProps = {
  opInfo: {
    left_path: string;
    right_path: string;
    left: any;
    right: any;
  } & any;
};

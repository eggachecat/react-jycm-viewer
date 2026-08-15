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

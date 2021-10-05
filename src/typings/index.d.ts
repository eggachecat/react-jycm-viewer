type TRow = {
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

interface IDiffDetailItemMeta {
  left: any;
  right: any;
  left_path: string;
  right_path: string;
}

type IDiffDetailItem = IDiffDetailItemMeta & any;

type IOperationProps = {
  opInfo: {
    left_path: string;
    right_path: string;
    left: any;
    right: any;
  } & any;
};

export { TRow, IDiffDetailItem, IOperationProps }

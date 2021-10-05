export const NON_EXIST_PLACE_HOLDER = '__NON_EXIST__';
export const EVENT_PAIR = 'just4vis:pairs';
export const EVENT_DICT_REMOVE = 'dict:remove';
export const EVENT_DICT_ADD = 'dict:add';
export const EVENT_LIST_REMOVE = 'list:remove';
export const EVENT_LIST_ADD = 'list:add';
export const EVENT_IGNORE = 'ignore';
export const EVENT_MATCH_WITH_FILED = 'just4vis:operator:list:matchWithField';


export const OP_MAP = {
  value_changes: { color: 'blue' },
  'list-add': { color: 'green' },
  'list-remove': { color: 'red' },
  'dict-add': { color: 'green' },
  'dict-remove': { color: 'red' },
  'operator-expectChange': { color: 'gold' },
  'operator-floatInRange': { color: 'orange' },
  ignore: { color: 'grey' },
};

export const JSON_PATH_CONFIG_OPERATION_LIST = [
  { label: '忽略区别', operation: 'ignore', color: 'grey' },
  { label: '比较图片', operation: 'diff_image', color: 'orange' },
  { label: '比较PDF', operation: 'diff_pdf', color: 'purple' },
  { label: '比较word', operation: 'diff_word', color: 'blue' },
  { label: '无序比较', operation: 'operator:list:ignoreOrder', color: 'green' },
  {
    label: '要求改变',
    operation: 'operator:expectChange',
    color: OP_MAP['operator-expectChange'].color,
  },
  {
    label: '数组匹配',
    operation: 'operator:list:matchWithField',
    color: 'red',
    defaultParameter: {
      field: 'id',
    },
  },
  {
    label: '在区间内',
    operation: 'operator:floatInRange',
    color: 'gold',
    defaultParameter: {
      interval_start: 0,
      interval_end: 1,
    },
  },
  {
    label: '[字符串转浮点数绝对值]在区间内',
    operation: 'operator:str:abs:floatInRange',
    color: 'gold',
    defaultParameter: {
      interval_start: 0,
      interval_end: 1,
    },
  },
  {
    label: '差值在区间内',
    operation: 'operator:str:distanceInRange',
    color: 'gold',
    defaultParameter: {
      distance_threshold: 1,
    },
  },
  {
    label: '相对变化量',
    operation: 'operator:float:deltaRatioInThreshold',
    color: 'gold',
    defaultParameter: {
      delta_ratio_threshold: 1,
      zero_is_ok: true,
    },
  },
];

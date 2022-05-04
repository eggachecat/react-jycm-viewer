import { TRow } from "../typings";

export function isValidRegex(v: string): boolean {
  try {
    RegExp(v);
    return true;
  } catch (e) {
    return false;
  }
}


export function jsonPathToPathKey(jsonPath: any[]) {
  const ret = [...jsonPath]
    .map(v => {
      if (typeof v === 'number') {
        return `[${v}]`;
      }
      return v;
    })
    .join('->');

  return ret;
}

export function isJsonPathsMatch(jsonPath: any[], diffConfigPath: any[]) {
  return jsonPathToPathKey(jsonPath) === jsonPathToPathKey(diffConfigPath);
}

export function pathKeyToJsonPath(pathKey: string): any[] {
  return pathKey.split('->').map(v => {
    const matchResults = v.match(/\[(\d+)\]/g);
    if (matchResults !== null) {
      return parseInt(matchResults[0].replace(/[[\]]/g, ''), 10);
    }
    return v;
  });
}

export function isRealObject(obj: any) {
  return typeof obj === 'object' && obj !== null;
}

export function iterateJSON(
  obj: any,
  jsonPath: any[],
  rows: TRow[],
  key: string | undefined = undefined,
  needComma = false,
) {
  // 对于大数的处理
  if (obj?._isBigNumber) {
    // 这是一个大整数
    rows.push({
      jsonPath: [...jsonPath],
      content: obj,
      key,
      needComma,
    });
    return;
  }

  if (Array.isArray(obj)) {
    rows.push({
      jsonPath: [...jsonPath],
      content: '[',
      key,
      special: true,
      specialOpen: true,
    });
    const sPairIndex = rows.length - 1;

    obj.forEach((v, i) =>
      iterateJSON(v, [...jsonPath, i], rows, undefined, i !== obj.length - 1),
    );

    rows.push({
      jsonPath: [...jsonPath],
      content: ']',
      key: undefined,
      special: true,
      needComma,
    });

    const ePairIndex = rows.length - 1;

    rows[ePairIndex].pairIndex = sPairIndex;
    rows[sPairIndex].pairIndex = ePairIndex;

    return;
  }

  if (isRealObject(obj)) {
    rows.push({
      jsonPath: [...jsonPath],
      content: '{',
      key,
      special: true,
      specialOpen: true,
    });
    const sPairIndex = rows.length - 1;

    const keys = Object.keys(obj);
    keys.forEach((k, i) =>
      iterateJSON(obj[k], [...jsonPath, k], rows, k, i !== keys.length - 1),
    );

    rows.push({
      jsonPath: [...jsonPath],
      content: '}',
      key: undefined,
      special: true,
      needComma,
    });
    const ePairIndex = rows.length - 1;
    rows[ePairIndex].pairIndex = sPairIndex;
    rows[sPairIndex].pairIndex = ePairIndex;
    return;
  }

  rows.push({ jsonPath: [...jsonPath], content: obj, key, needComma });
}

export function TRowsToStr(rows: TRow[]): string {
  const result = rows
    .map(row => {
      let ret = ' '.repeat(row.jsonPath.length * 4);

      if (row.key) {
        ret = `${ret}${JSON.stringify(row.key)}: `;
      }

      const { content, special } = row;

      if (special) {
        ret = `${ret}${content}`;
      } else {
        switch (typeof content) {
          case 'number':
            ret = `${ret}${content}`;
            break;
          case 'boolean':
          case 'string':
          default:
            if (content?._isBigNumber) {
              ret = `${ret}${JSON.stringify(content).replace(/"/g, '')}`;
            } else {
              ret = `${ret}${JSON.stringify(content)}`;
            }
        }
      }

      if (row.needComma) {
        ret = `${ret},`;
      }
      return ret;
    })
    .join('\n');
  return `${result}\n`;
}

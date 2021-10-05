import { TRow } from '../typings';
import { jsonPathToPathKey } from '../utils';
import { useEffect, useState } from 'react';
import useJsonRows from '../hooks/useJsonRows';

const useJsonInfo = (jsonStr: string) => {
  const jsonRows = useJsonRows(jsonStr);
  const [pathKey2Index, setPathKey2Index] = useState<{ [_: string]: number }>(
    {},
  );
  const getPathKey2Index = (respRows: TRow[]) =>
    respRows.reduce((p, c, i) => {
      if (!p[jsonPathToPathKey(c.jsonPath)]) {
        p[jsonPathToPathKey(c.jsonPath)] = i;
      }
      return p;
    }, {} as { [_: string]: number });

  useEffect(() => {
    setPathKey2Index(getPathKey2Index(jsonRows));
  }, [jsonRows]);

  return {
    jsonRows,
    pathKey2Index,
  };
};

export default useJsonInfo;

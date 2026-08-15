import { TRow } from "../typings";
import { iterateJSON } from "../utils";
import { useMemo } from "react";

import * as JSONbig from "json-bigint";

export const useJSONRows = (resp: string) => {
  return useMemo(() => {
    if (!resp) {
      return [];
    }
    const rows: TRow[] = [];
    iterateJSON(JSONbig.parse(resp), [], rows);
    return rows;
  }, [resp]);
};

export default useJSONRows;

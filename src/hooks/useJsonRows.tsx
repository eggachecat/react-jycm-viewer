import { TRow } from "../typings";
import { iterateJSON } from "../utils";
import React, { useEffect, useState } from "react";

import * as JSONbig from "json-bigint";

export const useJSONRows = (resp: string) => {
  const [respRows, setRespRows] = useState<TRow[]>([]);
  useEffect(() => {
    if (resp) {
      const _RespRows: TRow[] = [];
      iterateJSON(JSONbig.parse(resp), [], _RespRows);
      setRespRows(_RespRows);
    }
  }, [resp]);

  return respRows;
};

export default useJSONRows;

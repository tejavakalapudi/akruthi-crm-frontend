import { isArray } from "lodash";

export function flattenObject(ob) {
    var toReturn = {};
  
    for (var i in ob) {
      if (!ob.hasOwnProperty(i)) continue;
  
      if (typeof ob[i] === "object" && !isArray(ob[i]) && ob[i] !== null) {
        var flatObject = flattenObject(ob[i]);
        for (var x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue;
  
          toReturn[i + "." + x] = flatObject[x];
        }
      } else {
        toReturn[i] = ob[i];
      }
    }
    return toReturn;
}
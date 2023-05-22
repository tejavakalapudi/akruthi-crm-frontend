import _ from 'lodash';
import { flattenObject } from './flattenObject';

export function objectDifference(actual, updated) {
    const flattenedObject = flattenObject(actual);
    let resultObject = {}
    Object.entries(flattenedObject)?.map(entry => {
      const [key, oldVal] = entry;
      
      const newVal = _.get(updated, key);

      if (newVal !== oldVal) {
        _.set(resultObject, key, newVal)
      }
    });
    return resultObject;
};
import { complement, isNil, pickBy } from "ramda";

const isDefined = complement(isNil);

export const pickDefinedValues = pickBy((val, _key) => isDefined(val));

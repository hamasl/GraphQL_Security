import { NoSchemaIntrospectionCustomRule } from "graphql";
import depthLimit from "graphql-depth-limit";
import { ENV } from "./envVars.js";
import createValidation from "graphql-no-batched-queries";

let validationRules = [];

if (!ENV.ALLOW_INTROSPECTION) {
  validationRules.push(NoSchemaIntrospectionCustomRule);
}
if (ENV.DEPTH_LIMIT > 0) {
  validationRules.push(depthLimit(ENV.DEPTH_LIMIT));
}
if (ENV.BATCH_LIMIT > 0) {
  validationRules.push(createValidation({allow: ENV.BATCH_LIMIT}));
}

// Setting undefined if no rules added, to confomrm with the graphql express lib
const VALIDATION_RULES =
  validationRules.length <= 0 ? undefined : validationRules;

Object.freeze(VALIDATION_RULES);

export default VALIDATION_RULES;

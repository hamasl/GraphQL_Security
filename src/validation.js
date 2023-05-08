import { NoSchemaIntrospectionCustomRule } from "graphql";
import depthLimit from "graphql-depth-limit";
import { ENV } from "./envVars.js";
import createBatchValidation from "graphql-no-batched-queries";
import { createValidation as createAliasValidation } from "graphql-no-alias";

let validationRules = [];

if (!ENV.ALLOW_INTROSPECTION) {
  validationRules.push(NoSchemaIntrospectionCustomRule);
}
if (ENV.DEPTH_LIMIT > 0) {
  validationRules.push(depthLimit(ENV.DEPTH_LIMIT));
}
if (ENV.BATCH_LIMIT > 0) {
  validationRules.push(createBatchValidation({ allow: ENV.BATCH_LIMIT }));
}

if (ENV.LOGIN_LIMIT > 0 || ENV.CHNGPSWD_LIMIT > 0) {
  const permissions = {};
  if (ENV.LOGIN_LIMIT > 0) {
    permissions.Query = {
      login: ENV.LOGIN_LIMIT,
    };
  }
  if (ENV.CHNGPSWD_LIMIT > 0) {
    permissions.Mutation = {
      changePassword: ENV.CHNGPSWD_LIMIT,
    };
  }
  const { validation } = createAliasValidation({ permissions });
  validationRules.push(validation);
}

// Setting undefined if no rules added, to confomrm with the graphql express lib
const VALIDATION_RULES =
  validationRules.length <= 0 ? undefined : validationRules;

Object.freeze(VALIDATION_RULES);

export default VALIDATION_RULES;

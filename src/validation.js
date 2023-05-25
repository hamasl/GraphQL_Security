import { NoSchemaIntrospectionCustomRule } from "graphql";
import depthLimit from "graphql-depth-limit";
import { ENV } from "./envVars.js";
import createBatchValidation from "graphql-no-batched-queries";
import { createValidation as createAliasValidation } from "graphql-no-alias";

// Empty list of validation rules to be expanded on
// if the belonging environment variabels are set that way
let validationRules = [];

// Disallows introspection
if (!ENV.ALLOW_INTROSPECTION) {
  validationRules.push(NoSchemaIntrospectionCustomRule);
}

// Sets a query depth limit
if (ENV.DEPTH_LIMIT > 0) {
  validationRules.push(depthLimit(ENV.DEPTH_LIMIT));
}

// Sets a network request batch limit
if (ENV.BATCH_LIMIT > 0) {
  validationRules.push(createBatchValidation({ allow: ENV.BATCH_LIMIT }));
}

// Adds alias limiting for the login and change password calls if the proper
// environment variables are set
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

// Setting undefined if no rules added, to conform with the graphql express lib
const VALIDATION_RULES =
  validationRules.length <= 0 ? undefined : validationRules;

// Freezes to prevent modification
Object.freeze(VALIDATION_RULES);

export default VALIDATION_RULES;

// Import early as per recommendation from: https://www.npmjs.com/package/dotenv (07.05.23)
import dotenv from "dotenv";
dotenv.config();

/* 
    Defines the expected and used env variables from the .env file,
    thereby throwing explicit error in case of unexpected value instead of
    getting a potential logical error later on
*/

const LIMIT_DISABLED_VAL = -1;

// Defining the expected fields, and setting a default value for them
const ENV = {
  ALLOW_INTROSPECTION: false,
  ALLOW_GRAPHIQL: false,
  DEPTH_LIMIT: LIMIT_DISABLED_VAL,
  USERS_LIMIT: Number.MAX_SAFE_INTEGER,
  BATCH_LIMIT: LIMIT_DISABLED_VAL,
  LOGIN_LIMIT: LIMIT_DISABLED_VAL,
  CHNGPSWD_LIMIT: LIMIT_DISABLED_VAL,
  // Non -1 default values because these need to be used otherwise server is useless
  NUM_OF_FRIENDS: 1,
  NUM_OF_USERS: 100,
  GENERATED_PASSWORD_LENGTH: 4,
};

/**
 * Makes sure that the boolean variables have been set correctly
 */
const handleBoolean = (key, variable) => {
  if (variable === "true") {
    ENV[key] = true;
  } else if (variable === "false") {
    ENV[key] = false;
  } else {
    throw new Error(
      `Environment variable ${key} needs to be either true or false, currently: ${variable}`
    );
  }
};

/**
 * Makes sure that the integer variables have been set correctly
 */
const handleInt = (key, variable) => {
  const val = parseInt(variable);
  if (val === NaN) {
    throw new Error(
      `Environment variable ${key} needs to be an integer, currently: ${variable}`
    );
  }
  ENV[key] = val;
};

// Goes through all the predefined attributes set in the ENV object
// and assigns the correct values from the .env file.
for (let val in ENV) {
  const variable = process.env[val];
  if (typeof ENV[val] === "boolean") {
    handleBoolean(val, variable);
  } else if (typeof ENV[val] === "number") {
    handleInt(val, variable);
  }
}

// Freezes to prevent modification
Object.freeze(ENV);

/**
 * Function to print out the environment variable states
 */
const printENV = () => {
  console.log("Environment variables: ");
  for (let val in ENV) {
    console.log(`${val}: ${ENV[val]}`);
  }
};

export { ENV, printENV, LIMIT_DISABLED_VAL };

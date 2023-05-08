// Import early as per recommendation from: https://www.npmjs.com/package/dotenv (07.05.23)
import dotenv from "dotenv";
dotenv.config();

/* 
    Defines the expected and used env variables from the .env file,
    thereby throwing explicit error in case of unexpected value instead of
    getting a potential logical error later on
*/

const LIMIT_DISABLED_VAL = -1

const ENV = {
  ALLOW_INTROSPECTION: false,
  ALLOW_GRAPHIQL: false,
  DEPTH_LIMIT: LIMIT_DISABLED_VAL,
  USERS_LIMIT: Number.MAX_SAFE_INTEGER,
  BATCH_LIMIT:LIMIT_DISABLED_VAL,
  LOGIN_LIMIT:LIMIT_DISABLED_VAL,
  CHNGPSWD_LIMIT:LIMIT_DISABLED_VAL,
};

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

const handleInt = (key, variable) => {
  const val = parseInt(variable);
  if (val === NaN) {
    throw new Error(
      `Environment variable ${key} needs to be an integer, currently: ${variable}`
    );
  }
  ENV[key] = val;
};

for (let val in ENV) {
  const variable = process.env[val];
  if (typeof ENV[val] === "boolean") {
    handleBoolean(val, variable);
  } else if (typeof ENV[val] === "number") {
    handleInt(val, variable);
  }
}

Object.freeze(ENV);

const printENV = () => {
  console.log("Environment variables: ");
  for (let val in ENV) {
    console.log(`${val}: ${ENV[val]}`);
  }
};

export { ENV, printENV, LIMIT_DISABLED_VAL };

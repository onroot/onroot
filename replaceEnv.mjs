import { env } from "process";
import { replaceInFileSync } from "replace-in-file";

const keys = [{ key: "GOOGLE_MAPS_API", value: env.GOOGLE_MAPS_API }];

const options = keys.map((key) => ({
  files: "src/environments/environment.ts",
  from: new RegExp(`${key.key}: ''`),
  to: `${key.key}: '${key.value}'`,
}));

options.forEach((option) => {
  try {
    replaceInFileSync(option);
  } catch (error) {
    console.error(error);
  }
});

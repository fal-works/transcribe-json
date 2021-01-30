# ts-sofort

Run [TypeScript](https://www.typescriptlang.org/) code on [Node.js](https://nodejs.org/) quickly.

- It first tranpiles and bundles your TypeScript code using [esbuild](https://esbuild.github.io/) (which should be quite fast), then immediately runs the output JavaScript code.
- It also prints the time taken for both code conversion and execution. If your entry point has a default export of any `Promise` type, `ts-sofort` awaits until the `Promise` is resolved.
- At default, module paths that do not start with dot `.` (i.e. the absolute paths) are marked as external and will not be bundled. The `RegExp` filter for this can be configured via API options.


## CLI

Use `ts-sofort` command and pass the entry point filepath of your TypeScript code.

```text
Command:
  ts-sofort [options] <filepath>
  ts-sofort < -h | --help | -v | --version >
options:
  --external <pattern>  Regular expression string (escaped) for external module paths. (optional)
  --preserveTmp         Do not remove temporal file. (optional)
```

For example in your `package.json`, something like this:

```json
{
  "scripts": {
    "my-script": "ts-sofort path/to/my/script.ts",
  }
}
```

On CLI you can't pass esbuild options (which you don't need to in most cases).


## API

```js
import { run } from "ts-sofort";

const entryPoint = "path/to/your/script.ts";
const options = {};         // not required
const esbuildOptions = {};  // not required

run(entryPoint, options, esbuildOptions);
```

See type declaration for option fields.

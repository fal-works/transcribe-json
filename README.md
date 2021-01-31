# transcribe-json

1. From JSON file to object.
2. Extract any fields.
3. From object to JSON/JavaScript file.


## Install

```text
npm install transcribe-json
```


## Usage

### API

Three basic functions:

```js
import { read, extract, write } from "transcribe-json";
```

- `read` is async and returns the JSON file content as an object.
- `extract` returns a function that extracts fields from any object (only top-level fields can be specified).
- `write` returns an async function that write an object to a file in JSON, ES Module or CommonJS.

You can combine them as follows:

```js
// just read and use it as you like later
const content = await read(srcfile);

// copy all fields to another file
read(srcfile).then(write(outfile));

// extract some fields
read(srcfile).then(extract(fields)).then(write(outfile));

// insert any callback to convert an object to another
read(srcfile).then(convert).then(write(outfile));
```

There are also some options for `write()`:

```js
write(outfile, {
  replacer: null,  // used in JSON.stringify()
  space: 2,        // used in JSON.stringify()
  filetype: "mjs", // "json", "mjs" or "cjs"
  formatter: (code) => code.replace(/\s/, ""), // any formatting function
});
```

If `filetype === "mjs"`, the result will be a default export.

```js
export default {
  "name": "transcribe-json",
  "version": "0.1.0-alpha"
};
```

### CLI

Use `transcribe-json` command.

```text
Command:
  transcribe-json [options] <input filepath>
  transcribe-json <-h|--help|-v|--version>
Options:
  --outfile <path>  The output filepath with or without extension. (required)
  --type <type>     The filetype to emit. Either json, mjs or cjs. (optional)
  --fields <names>  Top-level field names to extract. Comma separated. (optional)
```

For example in your `package.json`:

```json
{
  "scripts": {
    "pkg": "transcribe-json package.json --outfile package-info.js --type mjs --fields name,version"
  }
}
```

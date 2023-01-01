# log-parsed-json

[![GitHub Super-Linter](https://github.com/Qarj/log-parsed-json/workflows/Lint%20Code%20Base/badge.svg)](https://github.com/marketplace/actions/super-linter)
![Tests](https://github.com/Qarj/log-parsed-json/workflows/Tests/badge.svg)
![Publish to npmjs](https://github.com/Qarj/log-parsed-json/workflows/Publish%20to%20npmjs/badge.svg)

Pretty prints JSON like objects found in the string passed to it.

Recursively dumps JSON objects found inside other JSON objects, even if they are overly stringified.

As well as regular stringified JSON, it copes with much of the output from util.inspect(), including circular references.

Intended to help with debugging, particulary in situations where you have for example Kibana logs containing JSON within JSON.

## Installation

```bash
npm install log-parsed-json
```

## Usage - pretty printing JSONs found within a string

```javascript
const { log } = require('log-parsed-json');

log(`some text { key1: true, 'key2': "  { inner: 'value', } " } text { a: 1 } text`);
```

Result

![Result](./jsonInJson.png)

## Usage - parsing a JSON like string into JSON.parse() friendly format

util.inspect()'s output is not JSON.parse() friendly.

```javascript
const { toString } = require('log-parsed-json');

console.log(toString(`{ 'k1': 'v1', 'k2': 123 }`));
```

Result

```txt
{ "k1": "v1", "k2": 123 }
```

Mentions of circular are just turned into a string, and any refs within the object are removed.

```javascript
console.log(toString("{ a: 'somestring', b: 42, e: { c: 82, d: [Circular *1] } }"));
```

Result

```txt
{ "a": "somestring", "b": 42, "e": { "c": 82, "d": ["Circular"] } }
```

## Usage - parsing a string to an array of plain strings or JSON.parse() compatible strings

```javascript
const { toArrayOfPlainStringsOrJson } = require('log-parsed-json');

console.log(toArrayOfPlainStringsOrJson(`text { 'k1': 'v1', 'k2': 123 } text { a: 1 } text`));
```

Result

```txt
[
  'text ',
  '{ "k1": "v1", "k2": 123 }',
  ' text ',
  '{ "a": 1 }',
  ' text'
]
```

## Usage - canParseJson

Returns true or false based on if `toString()` would return a valid JSON string.

```javascript
const { canParseJson } = require('log-parsed-json');

console.log(canParseJson(`{ 'k1': 'v1', k2: 123 }`));
console.log(canParseJson(`{ 'k1': "v1", "k2": 123 }`));
console.log(canParseJson(`"test"`));
console.log(canParseJson(123));
console.log(canParseJson(true));
```

Result

```json
true
true
false
false
false
```

Let's write a function and compare the response from `JSON.parse()` for the same scenarios.

```javascript
function isJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

console.log(isJSON(`{ 'k1': 'v1', k2: 123 }`));
console.log(isJSON(`{ 'k1': "v1", "k2": 123 }`));
console.log(isJSON(`"test"`));
console.log(isJSON(123));
console.log(isJSON(true));
```

Result

```json
false
false
true
true
true
```

## Usage - pretty print JSONs piped to `pretty`

In the system path, create a perl script called `pretty` with the following content

```perl
#!/usr/bin/env perl

my $lines = '';

# read in the lines from pipe
while (<>)
{
    $lines .= $_;
}

my $script_folder = $0;
$script_folder =~ s/[^\/]*$//;

my $output_file = $script_folder . "pretty.txt";
my $node_pretty = $script_folder . "pretty.js";

open (FILE, ">$output_file");
print FILE $lines;
close (FILE);

# run the pretty printer
system("node $node_pretty $output_file");
```

Make the script executable

```bash
chmod +x pretty
```

Install `log-parsed-json` globally

```bash
npm install -g log-parsed-json
```

Create a file called `pretty.js` with the following content

```javascript
const fs = require('fs');
const { log } = require('log-parsed-json');

let args = process.argv.slice(2);
let prettyFile = args[0];
let text = fs.readFileSync(prettyFile, 'utf8');

log(text);
```

To your profile, add the following line at the end

```bash
export NODE_PATH=$(npm root --location=global)
```

Open a fresh shell, now you can pipe to `pretty`

```bash
echo abc { a: 2 } abc | pretty
```

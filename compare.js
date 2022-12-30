const log = require('./index.js');

let obj = {};

console.log(true);
log(true);
gap();

console.log(123);
log(123);
gap();

console.log(['test', { test: 'test' }]);
log(['test', { test: 'test' }]);
gap();

console.log({ test: 'test' });
log({ test: 'test' });
gap();

obj = { test: 'test' };
obj[null] = 'test';
console.log(obj);
log(obj);
gap();

console.log({ test: 'test', level2: { level3: { level4: { level5: { level6: 123 } } } } });
log({ test: 'test', level2: { level3: { level4: { level5: { level6: 123 } } } } });
gap();

obj = { '\n\'""\'': 'test' };
console.log(obj);
log(obj);
gap();

console.log("{ test: 'test', array: ['test', { test: 'test' }] }");
log("{ test: 'test', array: ['test', { test: 'test' }] }");
gap();

console.log("some text { test: 'test', array: ['test', { test: 'test' }] } more text");
log("some text { test: 'test', array: ['test', { test: 'test' }] } more text");
gap();

console.log('real json {"value":["test"]}');
log('real json {"value":["test"]}');
gap();

console.log('real json {"value":["double quote \\"test\\""]}');
log('real json {"value":["double quote \\"test\\""]}');
gap();

console.log('real json {"value":["closing brace }"]}');
log('real json {"value":["closing brace }"]}');
gap();

console.log('broken json {"value":["test"] real json {"value":["test"]}');
log('broken json {"value":["test"] real json {"value":["test"]}');
gap();

console.log('hanging comma {"value":["test"],} real json {"value":["test"]}');
log('hanging comma {"value":["test"],} real json {"value":["test"]}');
gap();

console.log('concat strings {"value":["test" + "test"]}');
log('concat strings {"value":["test" + "test"]}');
gap();

obj = {
    value: 'abcdef this is a very long string without line breaks and goes on for some length to see what happens',
};
console.log(obj);
log(obj);
obj['hasJson'] = JSON.stringify(obj);
console.log(obj);
log(obj);
gap();

function gap() {
    console.log();
}
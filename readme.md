# Javascript Undo Manager (undoMgr.js)

undoMgr.js is simple (pure) javascript library for manage undo and redo feature. This library is not only can used for editable textarea but can be used for many case. You can see example to see how this library works.

## History

When i need undo feature on my apps, i only found 2 undo library in github. The most suitable for me is [Javascript-Undo-Manager](https://github.com/ArthurClemens/Javascript-Undo-Manager) created by [ArthurClemens](https://github.com/ArthurClemens). But because i lack of javascript, i have several problem to use it. Then i try to modified the code to make more easy to use for me (_and i hope for the others too_).

## Documentation

Visit our documentation [here](http://creativecoder.xyz/undomgr)

## Download

Source Code: [undoMgr.js](http://creativecoder.xyz/undomgr/dist/undoMgr.js)

Minify: [undoMgr.min.js](http://creativecoder.xyz/undomgr/dist/undoMgr.min.js)

## Demo

1. [form example](http://creativecoder.xyz/undomgr/example/1.form.html)

2. [textarea example](http://creativecoder.xyz/undomgr/example/2.textarea.html)

3. [range example](http://creativecoder.xyz/undomgr/example/3.range.html)

## Install & Usage

include the library to your HTML

`<script src="undoMgr.min.js"></script>`

Then init the library in your js

`var undo = new undoMgr();`

#### Set Limit
Set limit how many step that allowed to remember. Default: `0` (_unlimited_), Type: `number` same or greater than 0.
```javascript
var undo = new undoMgr(2); //set limit 2
undo.add(5);
console.log(undo.show());//[5]
undo.add(false);
console.log(undo.show());//[5, false]
undo.add('xyz');
console.log(undo.show());//[false, 'xyz']
undo.add(44);
console.log(undo.show());//['xyz',44]
```

#### Set Callback
to execute callback function when method `add()`, `undo()` `redo()`, and `clear()` is triggered. Type: `function`
```javascript
function myCallback(){
	console.log('callback called');
}
var undo = new undoMgr(10, myCallback); //set limit 10 and set myCallback() as callback
undo.add(5); //callback called
undo.add(4); //callback called
undo.undo(); //callback called
undo.redo(); //callback called
undo.clear(); //callback called
``` 

#### add()
To add data to be saved in history. Data type can be anything like number, string, array/object, boolean etc. If you perform undo then you add data, the index of saved history which greater than current index will be deleted. This means in this state you will dont have redo.
```javascript
var undo = undoMgr();
undo.add(1); //add number
undo.add(false); //add boolean
undo.add('xyz'); //add string
undo.add(['aaa', 'bbb']); //add Array
undo.add({name: 'john', age: 18}); //add Object
undo.add('name=john&age=18'); //add serialize string
undo.add([{name: 'name', value: 'john'}, {name: 'age', value: 18}]); //add serialize array 
console.log(undo.show());//[1, false, 'xyz', ['aaa','bbb'], {name: 'john', age: 18}, 'name=john&age=18', [{name: 'name', value: 'john'}, {name: 'age', value: 18}]]
//NOTICE THIS
undo.undo();
undo.undo();
console.log(undo.show());//history still same : [1, false, 'xyz', ['aaa','bbb'], {name: 'john', age: 18}, 'name=john&age=18', [{name: 'name', value: 'john'}, {name: 'age', value: 18}]]
console.log(undo.getIndex());//4
console.log(undo.getData());//{name: 'john', age: 18}
console.log(undo.hasRedo());//true
undo.add('new data'); //add new data. this will override the array
console.log(undo.hasRedo());//false
console.log(undo.show());//[1, false, 'xyz', ['aaa','bbb'], {name: 'john', age: 18}, 'new data']
``` 

#### show()
to get all data which saved in history.
```javascript
var undo = undoMgr();
console.log(undo.show());//[]
undo.add(['aaa', 'bbb']);
console.log(undo.show());//[['aaa','bbb']]
undo.add(false);
console.log(undo.show());//[['aaa','bbb'], false]
undo.undo();
console.log(undo.show());//[['aaa','bbb']]
``` 

#### count()
to get count of history. Same as `undo.show().length`
```javascript
var undo = undoMgr();
console.log(undo.count());//0
undo.add(['aaa', 'bbb']);
console.log(undo.count());//1
undo.add(false);
console.log(undo.count());//2
undo.undo();
console.log(undo.count());//1
``` 

#### getIndex()
return number of active index.
```javascript
var undo = undoMgr();
undo.add('aaa');
console.log(undo.getIndex()); //0
undo.add('bbb');
console.log(undo.getIndex()); //1
undo.undo();
console.log(undo.getIndex()); //0
undo.redo();
console.log(undo.getIndex()); //1
``` 

#### clear()
clear the history of data.
```javascript
var undo = undoMgr();
undo.add('aaa');
undo.add('bbb');
console.log(undo.show()); //['aaa','bbb']
undo.clear();
console.log(undo.show()); //[]
``` 

#### hasUndo()
Return true/false whether history has undo or not.
```javascript
var undo = undoMgr();
undo.add('bbb');
console.log(undo.hasUndo()); //false
undo.add([1,'a',99]);
console.log(undo.hasUndo()); //true
``` 

#### undo()
Perform undo.
```javascript
var undo = undoMgr();
undo.add(1);
undo.add(2);
undo.undo();
console.log(undo.getData()); //1
``` 

#### hasRedo()
Return true/false whether history has redo or not.
```javascript
var undo = undoMgr();
undo.add(true);
console.log(undo.hasUndo()); //false
console.log(undo.hasRedo()); //false
undo.add({name:'john', age: 18});
console.log(undo.hasUndo()); //true
console.log(undo.hasRedo()); //false
undo.undo();
console.log(undo.hasUndo()); //false
console.log(undo.hasRedo()); //true
``` 

#### redo()
Perform redo.
```javascript
var undo = undoMgr();
undo.add(1);
undo.add(2);
undo.undo();
console.log(undo.getData()); //1
undo.redo();
console.log(undo.getData()); //2
``` 

## Issue

if you have Any issue/question, you can post it in `issue` menu, or contact me at plonknimbuzz@gmail.com

## Credits

[Javascript-Undo-Manager](https://github.com/ArthurClemens/Javascript-Undo-Manager) created by [ArthurClemens](https://github.com/ArthurClemens).

## License

© 2018, __plonknimbuzz__. Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
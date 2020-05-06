## fendly.db
It doesn't contain error handling and advanced documentation for now.
---

![issues](https://img.shields.io/github/issues-raw/acarrr/fendly.db) ![license](https://img.shields.io/github/license/acarrr/fendly.db) ![latest version](https://img.shields.io/github/package-json/v/acarrr/fendly.db?label=latest%20version)

### API
- **db.set(key, value)** - This function sets a new data based on specified key in the database. [#L80 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L80)
- **db.get(key)** - This function gets a data by specified key in the database. [#L130 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L130)
- **db.fetch(key)** - A clone of `db.get(key)`. [#L38 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L38)
- **db.delete(key)** - This function deletes a data by specified key in the database. [#L160 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L160)
- **db.has(key)** - This function checks if the database has a data by specified key. [#L218 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L218)
- **db.push(key, value)** - This function push a value to a data by specified key. [#L228 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L228)
- **db.update(key, function)** - This function update value as you defined by specified key. [#L251 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L251)
- **db.updateEl(key, index, value)** - This function update value from a data by specified key. [#L273 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L273)
- **db.delElByIndex(key, index)** - This function deletes a value by specified index from a data by specified key. [#L312 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L312)
- **db.delElByVal(key, value)** - This function deletes specified value from a data by specified key. [#L346 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L346)
- **db.all()** - This function gets all data in the database. [#L378 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L378)
- **db.add()** - This function checks if is data number, after adds a value to specified data in the database. [#L388 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L388)
- **db.substract()** - This function checks if is data number, after substracts a value to specified data in the database. [#L425 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L425)
- **db.subs()** -  A clone of `db.substract(key)`. [#L46 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L41)

### Example
```js
const fendlydb = require("fendly.db");
const db = new fendlydb("./database.json");

db.set("a.b.c.d.e", "ok");
db.set("a.b.c.d.f", {"hmm": "lol"});
db.push("a.b.c.d.g", "ok"); // index 0
db.push("a.b.c.d.g", 212); // index 1
db.set("a.b.c.d.h", 12);
db.update("a.b.c.d.h", (x => x + 1));
db.updateEl("a.b.c.d.g", 1, 2342);

db.get("a.b.c");
/*
  {
    "d": {
      "e": "ok",
      "f": {
        "hmm": "lol"
      },
      "g": ["ok", 2342],
      "h": 13
    }
  }
*/
```

### Changelog
+ 0.0.3 version
- Added events and options.
- Added graceful-fs support.
- Fixed a minor bug but it is critical.

+ 0.0.2 version
- Added `.add()`, `.all()`, `.subs()`, `.substract()` and `.fetch()` functions.

+ 0.0.1 version
- Module is published.
- Added basic functions.

### Ask questions & Contribute
Add my Discord account for any problem. acar#3875

Look GitHub page for contribute. [GitHub Page](https://github.com/acarrr/fendly.db)

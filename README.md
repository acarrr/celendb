## fendly.db
It doesn't contain error handling and advanced documentation for now.
---

![issues](https://img.shields.io/github/issues-raw/acarrr/fendly.db)

### API
- **db.set(key, value)** - This function sets a new data based on specified key in the database. [#L50 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L50)
- **db.get(key)** - This function gets a data by specified key in the database. [#L88 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L88)
- **db.fetch(key)** - A clone of `db.get(key)`. [#L33 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L33)
- **db.delete(key)** - This function deletes a data by specified key in the database. [#L118 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L118)
- **db.has(key)** - This function checks if the database has a data by specified key. [#L157 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L157)
- **db.push(key, value)** - This function push a value to a data by specified key. [#L167 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L167)
- **db.update(key, function)** - This function update value as you defined by specified key. [#L179 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L179)
- **db.updateEl(key, index, value)** - This function update value from a data by specified key. [#L191 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L191)
- **db.delElByIndex(key, index)** - This function deletes a value by specified index from a data by specified key. [#L219 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L219)
- **db.delElByVal(key, value)** - This function deletes specified value from a data by specified key. [#L244 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L244)
- **db.all()** - This function gets all data in the database. [#L267 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L267)
- **db.add()** - This function checks if is data number, after adds a value to specified data in the database. [#L277 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L277)
- **db.substract()** - This function checks if is data number, after substracts a value to specified data in the database. [#L293 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L293)
- **db.subs()** -  A clone of `db.substract(key)`. [#L41 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L41)

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
+ 0.0.1 version
- Module is published.
- Added basic functions.

### Ask questions & Contribute
Add my Discord account for any problem. acar#3875

Look GitHub page for contribute. [GitHub Page](https://github.com/acarrr/fendly.db)

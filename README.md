## fendly.db
It doesn't contain error handling and advanced documentation for now.
---

### API
db.set(key, value) - This function sets a new data based on specified key in the database. [#L42 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L42)
\n
db.get(key) - This function gets a data by specified key in the database. [#L80 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L80)
\n
db.fetch(key) - A clone of `db.get(key)`. [#L33 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L33)
\n
db.delete(key) - This function deletes a data by specified key in the database. [#L110 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L110)
\n
db.has(key) - This function checks if the database has a data by specified key. [#L149 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L149)
\n
db.push(key, value) - This function push a value to a data by specified key. [#L159 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L159)
\n
db.update(key, function) - This function update value as you defined by specified key. [#L171 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L171)
\n
db.updateEl(key, index, value) - This function update value from a data by specified key. [#L183 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L183)
\n
db.delElByIndex(key, index) - This function deletes a value by specified index from a data by specified key. [#L211 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L211)
\n
db.delElByVal(key, value) - This function deletes specified value from a data by specified key. [#L236 index.js on GitHub](https://github.com/acarrr/fendly.db/blob/master/index.js#L236)

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
db.updateEl("a.b.c.d.e.g", 1, 2342);

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
Add my Discord account for any problem.
\n
acar#3875

Look GitHub page for contribute.
\n
[GitHub Page](https://github.com/acarrr/fendly.db)

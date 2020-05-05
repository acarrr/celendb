# fendly.db
## It doesn't contain error handling and advanced documentation for now.
## This is alpha version (:

### API
db.get(key) - Get data
db.set(key, value) - Set data
db.push(key, value) - Push data
db.delete(key) - Delete data
db.has(key) - Is database has this data?
db.update(key, function) - Update data
db.updateEl(key, index, value) - Update element from array by index
db.delElByIndex(key, index) - Delete element from array by index
db.delElByVal(key, value) - Delete element from array by value

### Example
```js
const fendlydb = require("fendly.db");
const db = new fendlydb("./database.json");

db.set("a.b.c.d.e", "ok");
db.set("a.b.c.d.f", {"hmm": "lol"});
db.push("a.b.c.d.g", "ok");
db.set("a.b.c.d.h", 12);
db.update("a.b.c.d.h", (x => x + 1));

db.get("a.b.c");
/*
  {
    "d": {
      "e": "ok",
      "f": {
        "hmm": "lol"
      },
      "g": ["ok"],
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
acar#3875

Look GitHub page for contribute.
[GitHub Page](https://github.com/acarrr/fendly.db)

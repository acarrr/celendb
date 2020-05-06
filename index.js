let fs;

try {
  fs = require("graceful-fs");
} catch(error) {
  fs = require("fs");
}

/**
 * The database class
 * @class
*/
class Database {
  /**
   * @param {String} filePath
   * @param {Object} options
   * @param {Boolean} options.enableEvents - Enables EventEmitter
   * @param {Boolean} options.saveReadable - Saves data in JSON readable format
  */
  constructor(filePath, options = {}) {
    this.filePath = filePath;

    if(!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, "{}");
    }

    let data = fs.readFileSync(this.filePath, "utf8");

    if((data === null) || (typeof data == "undefined") || (data == "")) {
      fs.writeFileSync(this.filePath, "{}");
    }

    /**
     * This function gets a data by specified key in the database.
     * @param {String} key
     * @returns {any}
    */
    this.fetch = this.get;

    /**
     * This function checks if is data number, after substracts a value to specified data in the database.
     * @param {String} key
     * @param {Number} value
     * @returns {Number|Boolean}
    */
    this.subs = this.substract;
    this.events;

    /**
     * @type {Object}
     * @property {Boolean} enableEvents - Are events activated?
     * @property {Boolean} saveReadable - Do saves data in JSON readable format?
    */
    this.options = {
      "enableEvents": false,
      "saveReadable": false
    };

    if((typeof options == "object") && options.hasOwnProperty("enableEvents") && (options.enableEvents === true)) {
      this.options.enableEvents = true;

      try {
        this.events = require("events");
      } catch(error) {
        this.events = require("eventemitter3");
      }
    }

    if((typeof options == "object") && options.hasOwnProperty("saveReadable") && (options.saveReadable === true)) {
      this.options.saveReadable = true;
    }
  }

  /**
   * This function sets a new data based on specified key in the database.
   * @param {String} key
   * @param {any} value
   * @returns {any}
  */
  set(key, value) {
    let obj = JSON.parse(fs.readFileSync(this.filePath, "utf8"));
    let oldValue = this.get(key);

    if(key.includes(".")) {
      let data = new String();

      for(let i = 0; i < key.split(".").length; i++) {
        if(i == 0) {
          data += ("obj");
        }

        data += (`["${key.split(".")[i]}"]`);

        if(typeof eval(data) == "undefined") {
          eval(`${data} = {}`);
        }
      }

      data += (" = ");
      data += ('((typeof value != "undefined") ? JSON.parse(JSON.stringify(value)) : undefined)');

      eval(data);
    } else {
      obj[key] = value;
    }

    if(this.options.enableEvents == true) {
      this.events.emit("data", {
        oldValue,
        "newValue": value,
        key,
        "event": "set"
      });
    }

    if(this.options.saveReadable == true) {
      fs.writeFileSync(this.filePath, JSON.stringify(obj), null, 2);
    } else {
      fs.writeFileSync(this.filePath, JSON.stringify(obj));
    }

    return this.get(key);
  }

  /**
   * This function gets a data by specified key in the database.
   * @param {String} key
   * @returns {any}
  */
  get(key) {
    let obj = JSON.parse(fs.readFileSync(this.filePath, "utf8"));

    if(key.includes(".")) {
      let data = new String();

      for(let i = 0; i < key.split(".").length; i++) {
        if(i == 0) {
          data += ("obj");
        }

        data += (`["${key.split(".")[i]}"]`);

        if(typeof eval(data) == "undefined") {
          return undefined;
          break;
        }
      }

      return eval(data);
    } else {
      return JSON.parse(fs.readFileSync(this.filePath, "utf8"))[key];
    }
  }

  /**
   * This function deletes a data by specified key in the database.
   * @param {String} key
   * @returns {Boolean}
  */
  delete(key) {
    let obj = JSON.parse(fs.readFileSync(this.filePath, "utf8"));
    let oldValue = this.get(key);

    if(key.includes(".")) {
      let data = new String();

      for(let i = 0; i < key.split(".").length; i++) {
        if(i == 0) {
          data += ("obj");
        }

        if(i == (key.split(".").length - 1)) {
          eval(`delete ${data}["${key.split(".")[i]}"]`);

          if(this.options.enableEvents == true) {
            this.events.emit("data", {
              oldValue,
              key,
              "event": "delete"
            });
          }

          fs.writeFileSync(this.filePath, JSON.stringify(obj));

          return true;
          break;
        } else {
          data += (`["${key.split(".")[i]}"]`);
        }

        if(typeof eval(data) == "undefined") {
          return false;
          break;
        }
      }
    } else {
      delete obj[key];

      if(this.options.enableEvents == true) {
        this.events.emit("data", {
          oldValue,
          key,
          "event": "delete"
        });
      }

      fs.writeFileSync(this.filePath, JSON.stringify(obj));

      return true;
    }
  }

  /**
   * This function checks if the database has a data by specified key.
   * @param {String} has
   * @returns {Boolean}
  */
  has(key) {
    return (typeof this.get(key) != "undefined");
  }

  /**
   * This function push a value to a data by specified key.
   * @param {String} key
   * @param {any} value
   * @returns {Array}
  */
  push(key, value) {
    let arr = ((this.has(key) && Array.isArray(this.get(key))) ? this.get(key) : new Array());
    arr.push(value);

    if(this.options.enableEvents == true) {
      this.events.emit("data", {
        "oldValue": this.get(key),
        "newValue": arr,
        "pushedValue": value,
        key,
        "event": "push"
      });
    }

    return this.set(key, arr);
  }

  /**
   * This function update value as you defined by specified key.
   * @param {String} key
   * @param {Function} value
   * @returns {any}
  */
  update(key, f) {
    let data = (this.has(key) ? this.get(key) : 0);

    if(this.options.enableEvents == true) {
      this.events.emit("data", {
        "oldValue": this.get(key),
        "newValue": f(data),
        key,
        "event": "update"
      });
    }

    return this.set(key, f(data));
  }

  /**
   * This function update value from a data by specified key.
   * @param {String} key
   * @param {Number} index
   * @param {any} value
   * @returns {Array}
  */
  updateEl(key, index, value) {
    let data = (this.has(key) ? this.get(key) : false);
    let newData = new Array();

    if(!Array.isArray(data)) {
      return false;
    }

    for(let i = 0; i < data.length; i++) {
      if(i == index) {
        newData.push(value);
      } else {
        newData.push(data[i]);
      }
    }

    if(this.options.enableEvents == true) {
      this.events.emit("data", {
        "oldValue": data,
        "newValue": newData,
        "updatedValue": value,
        "updatedIndex": index,
        key,
        "event": "updateElement"
      });
    }

    this.set(key, newData);

    return newData;
  }

  /**
   * This function deletes a value by specified index from a data by specified key.
   * @param {String} key
   * @param {Number} index
   * @param {any} value
   * @returns {Array}
  */
  delElByIndex(key, index) {
    let data = (this.has(key) ? this.get(key) : false);
    let newData = new Array();

    if(!Array.isArray(data)) {
      return false;
    }

    for(let i = 0; i < data.length; i++) {
      if(i != index) {
        newData.push(data[i]);
      }
    }

    if(this.options.enableEvents == true) {
      this.events.emit("data", {
        "oldValue": data,
        "newValue": newData,
        key,
        "event": "deleteElement"
      });
    }

    this.set(key, newData);

    return newData;
  }

  /**
   * This function deletes specified value from a data by specified key.
   * @param {String} key
   * @param {any} filter
   * @returns {Array}
  */
  delElByVal(key, filter) {
    let data = (this.has(key) ? this.get(key) : false);
    let newData = new Array();

    if(!Array.isArray(data)) {
      return false;
    }

    for(let i = 0; i < data.length; i++) {
      if(data[i] != filter) {
        newData.push(data[i]);
      }
    }

    if(this.options.enableEvents == true) {
      this.events.emit("data", {
        "oldValue": data,
        "newValue": newData,
        key,
        "event": "deleteElement"
      });
    }

    this.set(key, newData);

    return newData;
  }

  /**
   * This function gets all data in the database.
   * @returns {Object}
  */
  all() {
    return JSON.parse(fs.readFileSync(this.filePath, "utf8"));
  }

  /**
   * This function checks if is data number, after adds a value to specified data in the database.
   * @param {String} key
   * @param {Number} value
   * @returns {Number|Boolean}
  */
  add(key, value) {
    if(!this.has(key)) {
      if(this.options.enableEvents == true) {
        this.events.emit("data", {
          "oldValue": undefined,
          "newValue": value,
          key,
          "event": "addValue"
        });
      }

      return this.set(key, value);
    } else if(this.has(key) && (typeof this.get(key) == "number")) {
      let oldValue = this.get(key);
      let data = this.update(key, (x => x + value));

      if(this.options.enableEvents == true) {
        this.events.emit("data", {
          oldValue,
          "newValue": data,
          key,
          "event": "addValue"
        });
      }

      return data;
    } else {
      return false;
    }
  }

  /**
   * This function checks if is data number, after substracts a value to specified data in the database.
   * @param {String} key
   * @param {Number} value
   * @returns {Number|Boolean}
  */
  substract(key, value) {
    if(!this.has(key)) {
      if(this.options.enableEvents == true) {
        this.events.emit("data", {
          "oldValue": undefined,
          "newValue": (0 - value),
          key,
          "event": "substractValue"
        });
      }

      return this.set(key, (0 - value));
    } else if(this.has(key) && (typeof this.get(key) == "number")) {
      let oldValue = this.get(key);
      let data = this.update(key, (x => x - value));

      if(this.options.enableEvents == true) {
        this.events.emit("data", {
          oldValue,
          "newValue": data,
          key,
          "event": "substractValue"
        });
      }

      return data;
    } else {
      return false;
    }
  }
}

module.exports = Database;

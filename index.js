const fs = require("fs");

function parse(str) {
  return Function('"use strict";return (' + str + ')')();
}

/**
 * The database class
 * @class
*/
class Database {
  /**
   * @param {String} filePath
  */
  constructor(filePath) {
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
  }

  /**
   * This function sets a new data based on specified key in the database.
   * @param {String} key
   * @param {any} value
   * @returns {any}
  */
  set(key, value) {
    let obj = JSON.parse(fs.readFileSync(this.filePath, "utf8"));

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
      data += (`parse('${JSON.stringify(value)}')`);

      eval(data);

      fs.writeFileSync(this.filePath, JSON.stringify(obj));
    } else {
      obj[key] = value;

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

    if(key.includes(".")) {
      let data = new String();

      for(let i = 0; i < key.split(".").length; i++) {
        if(i == 0) {
          data += ("obj");
        }

        if(i == (key.split(".").length - 1)) {
          eval(`delete ${data}["${key.split(".")[i]}"]`);
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
      return this.set(key, value);
    } else if(this.has(key) && (typeof this.get(key) == "number")) {
      return this.update(key, (x => x + value));
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
      return this.set(key, (0 - value));
    } else if(this.has(key) && (typeof this.get(key) == "number")) {
      return this.update(key, (x => x - value));
    } else {
      return false;
    }
  }
}

module.exports = Database;

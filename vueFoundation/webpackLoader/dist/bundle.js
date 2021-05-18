/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : null;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__info__ = __webpack_require__(4);
//1.使用commonjs的模块化的规范
const { add, mul } = __webpack_require__(3) //利用require导入
console.log(add(20, 30));
console.log(mul(20, 30));

//2. 使用ES6的模块化的规范

console.log(__WEBPACK_IMPORTED_MODULE_0__info__["c" /* name */]);
console.log(__WEBPACK_IMPORTED_MODULE_0__info__["a" /* age */]);
console.log(__WEBPACK_IMPORTED_MODULE_0__info__["b" /* height */]);

//3.依赖css文件
__webpack_require__(5);
// 4.依赖less文件
__webpack_require__(9);
document.writeln('<h2>hello world</h2>')

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function add(num1, num2) {
    return num1 + num2;
}

function mul(num1, num2) {
    return num1 * num2;
}

module.exports = { //导出
    add,
    mul
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const name = 'wuwu';
/* harmony export (immutable) */ __webpack_exports__["c"] = name;

const age = '18'
/* harmony export (immutable) */ __webpack_exports__["a"] = age;

const height = '1.88'
/* harmony export (immutable) */ __webpack_exports__["b"] = height;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_css_loader_dist_cjs_js_style_css__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_css_loader_dist_cjs_js_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__node_modules_css_loader_dist_cjs_js_style_css__);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = __WEBPACK_IMPORTED_MODULE_0__node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js___default()(__WEBPACK_IMPORTED_MODULE_1__node_modules_css_loader_dist_cjs_js_style_css___default.a, options);



/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_1__node_modules_css_loader_dist_cjs_js_style_css___default.a.locals || {});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Imports
var urlEscape = __webpack_require__(7);
var ___CSS_LOADER_URL___0___ = urlEscape(__webpack_require__(8));

// Module
exports.push([module.i, "body {\r\n    /* background-color: aqua; */\r\n    background: url(" + ___CSS_LOADER_URL___0___ + ")\r\n}", ""]);



/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function escape(url) {
  if (typeof url !== 'string') {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url)) {
    return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
  }

  return url;
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_ref_1_2_special_less__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_ref_1_2_special_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_ref_1_2_special_less__);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = __WEBPACK_IMPORTED_MODULE_0__node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js___default()(__WEBPACK_IMPORTED_MODULE_1__node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_ref_1_2_special_less___default.a, options);



/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_1__node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_ref_1_2_special_less___default.a.locals || {});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// Module
exports.push([module.i, "body {\n  font-size: 50px;\n  color: orange;\n}\n", ""]);



/***/ })
/******/ ]);
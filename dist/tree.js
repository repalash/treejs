/*!
 * treejs
 * @version 1.8.0
 * @see https://github.com/daweilv/treejs
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Tree"] = factory();
	else
		root["Tree"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ajax = _interopRequireDefault(__webpack_require__(1));

var _index = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function uniq(arr) {
  var map = {};
  return arr.reduce(function (acc, item) {
    if (!map[item]) {
      map[item] = true;
      acc.push(item);
    }

    return acc;
  }, []);
}

function empty(ele) {
  while (ele.firstChild) {
    ele.removeChild(ele.firstChild);
  }
}

function animation(duration, callback) {
  requestAnimationFrame(function () {
    callback.enter();
    requestAnimationFrame(function () {
      callback.active();
      setTimeout(function () {
        callback.leave();
      }, duration);
    });
  });
}

function collapseFromLeaf(tree, leafNode) {
  try {
    var nodeLiElement = tree.liElementsById[leafNode.parent.id];
    if (!nodeLiElement.classList.contains('treejs-node__close')) nodeLiElement.getElementsByClassName('treejs-switcher')[0].click();
  } catch (error) {
    return;
  }

  if (Object.prototype.hasOwnProperty.call(leafNode, 'parent')) collapseFromLeaf(tree, leafNode.parent);
}

function expandFromRoot(tree, root) {
  var nodeLiElement = tree.liElementsById[root.id];
  if (nodeLiElement.classList.contains('treejs-node__close')) nodeLiElement.getElementsByClassName('treejs-switcher')[0].click();
  if (Object.prototype.hasOwnProperty.call(root, 'children')) root.children.forEach(function (child) {
    return expandFromRoot(tree, child);
  });
}

var Tree =
/*#__PURE__*/
function () {
  function Tree(container, options) {
    var _this = this;

    _classCallCheck(this, Tree);

    _index.default.use({
      target: container
    });

    var defaultOptions = {
      selectMode: 'checkbox',
      values: [],
      disables: [],
      beforeLoad: null,
      loaded: null,
      url: null,
      method: 'GET',
      closeDepth: null
    };
    this.treeNodes = [];
    this.nodesById = {};
    this.leafNodesById = {};
    this.liElementsById = {};
    this.willUpdateNodesById = {};
    this.container = container;
    this.options = Object.assign(defaultOptions, options);
    Object.defineProperties(this, {
      values: {
        get: function get() {
          return this.getValues();
        },
        set: function set(values) {
          return this.setValues(uniq(values));
        }
      },
      disables: {
        get: function get() {
          return this.getDisables();
        },
        set: function set(values) {
          return this.setDisables(uniq(values));
        }
      },
      selectedNodes: {
        get: function get() {
          var nodes = [];
          var nodesById = this.nodesById;
          Object.keys(nodesById).forEach(function (id) {
            if (Object.prototype.hasOwnProperty.call(nodesById, id) && (nodesById[id].status === 1 || nodesById[id].status === 2)) {
              var node = Object.assign({}, nodesById[id]);
              delete node.parent;
              delete node.children;
              nodes.push(node);
            }
          });
          return nodes;
        }
      },
      disabledNodes: {
        get: function get() {
          var nodes = [];
          var nodesById = this.nodesById;
          Object.keys(nodesById).forEach(function (id) {
            if (Object.prototype.hasOwnProperty.call(nodesById, id) && nodesById[id].disabled) {
              var node = Object.assign({}, nodesById[id]);
              delete node.parent;
              nodes.push(node);
            }
          });
          return nodes;
        }
      }
    });

    if (this.options.url) {
      this.load(function (data) {
        _this.init(data);
      });
    } else {
      this.init(this.options.data);
    }
  }

  _createClass(Tree, [{
    key: "init",
    value: function init(data) {
      var _Tree$parseTreeData = Tree.parseTreeData(data),
          treeNodes = _Tree$parseTreeData.treeNodes,
          nodesById = _Tree$parseTreeData.nodesById,
          leafNodesById = _Tree$parseTreeData.leafNodesById,
          defaultValues = _Tree$parseTreeData.defaultValues,
          defaultDisables = _Tree$parseTreeData.defaultDisables;

      this.treeNodes = treeNodes;
      this.nodesById = nodesById;
      this.leafNodesById = leafNodesById;
      this.render(this.treeNodes);
      var _this$options = this.options,
          values = _this$options.values,
          disables = _this$options.disables,
          loaded = _this$options.loaded;
      if (values && values.length) this.setValues(values);else if (defaultValues && defaultValues.length) this.setValues(defaultValues);
      if (disables && disables.length) this.setDisables(disables);else if (defaultDisables && defaultDisables.length) this.setDisables(defaultDisables);
      if (typeof loaded === 'function') loaded.call(this);
    }
  }, {
    key: "load",
    value: function load(callback) {
      var _this$options2 = this.options,
          url = _this$options2.url,
          method = _this$options2.method,
          beforeLoad = _this$options2.beforeLoad;
      (0, _ajax.default)({
        url: url,
        method: method,
        success: function success(result) {
          var data = result;

          if (beforeLoad) {
            data = beforeLoad(result);
          }

          callback(data);
        }
      });
    }
  }, {
    key: "render",
    value: function render(treeNodes) {
      var treeEle = Tree.createRootEle();
      treeEle.appendChild(this.buildTree(treeNodes, 0));
      this.bindEvent(treeEle);
      var ele = document.querySelector(this.container);
      empty(ele);
      ele.appendChild(treeEle);
    }
  }, {
    key: "buildTree",
    value: function buildTree(nodes, depth) {
      var _this2 = this;

      var rootUlEle = Tree.createUlEle();

      if (nodes && nodes.length) {
        nodes.forEach(function (node) {
          var liEle = Tree.createLiEle(node, depth === _this2.options.closeDepth - 1);
          _this2.liElementsById[node.id] = liEle;
          var ulEle = null;

          if (node.children && node.children.length) {
            ulEle = _this2.buildTree(node.children, depth + 1);
          }

          if (ulEle) liEle.appendChild(ulEle);
          rootUlEle.appendChild(liEle);
        });
      }

      return rootUlEle;
    }
  }, {
    key: "bindEvent",
    value: function bindEvent(ele) {
      var _this3 = this;

      ele.addEventListener('click', function (e) {
        var target = e.target;

        if (target.nodeName === 'SPAN' && target.classList.contains('treejs-checkbox')) {
          _this3.onItemClick(target.parentNode.nodeId);
        } else if (target.nodeName === 'SPAN' && target.classList.contains('treejs-label')) {
          _this3.onItemLabelClick(target.parentNode.nodeId);
        } else if (target.nodeName === 'LI' && target.classList.contains('treejs-node')) {
          _this3.onItemClick(target.nodeId);
        } else if (target.nodeName === 'SPAN' && target.classList.contains('treejs-switcher')) {
          Tree.onSwitcherClick(target);
        }
      }, false);
    }
  }, {
    key: "onItemClick",
    value: function onItemClick(id) {
      var node = this.nodesById[id];
      var onChange = this.options.onChange;

      if (!node.disabled) {
        this.setValue(id);
        this.updateLiElements();
      }

      if (onChange) onChange.call(this);
    }
  }, {
    key: "onItemLabelClick",
    value: function onItemLabelClick(id) {
      var onItemLabelClick = this.options.onItemLabelClick;
      if (onItemLabelClick) onItemLabelClick.call(this, id);
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var node = this.nodesById[value];
      if (!node) return;
      var prevStatus = node.status;
      var status = prevStatus === 1 || prevStatus === 2 ? 0 : 2;
      node.status = status;
      this.markWillUpdateNode(node);
      this.walkUp(node, 'status');
      this.walkDown(node, 'status');
    }
  }, {
    key: "getValues",
    value: function getValues() {
      var _this4 = this;

      var values = [];
      Object.keys(this.leafNodesById).forEach(function (id) {
        if (Object.prototype.hasOwnProperty.call(_this4.leafNodesById, id)) {
          if (_this4.leafNodesById[id].status === 1 || _this4.leafNodesById[id].status === 2) {
            values.push(id);
          }
        }
      });
      return values;
    }
  }, {
    key: "setValues",
    value: function setValues(values) {
      var _this5 = this;

      this.emptyNodesCheckStatus();
      values.forEach(function (value) {
        _this5.setValue(value);
      });
      this.updateLiElements();
      var onChange = this.options.onChange;
      if (onChange) onChange.call(this);
    }
  }, {
    key: "setDisable",
    value: function setDisable(value) {
      var node = this.nodesById[value];
      if (!node) return;
      var prevDisabled = node.disabled;

      if (!prevDisabled) {
        node.disabled = true;
        this.markWillUpdateNode(node);
        this.walkUp(node, 'disabled');
        this.walkDown(node, 'disabled');
      }
    }
  }, {
    key: "getDisables",
    value: function getDisables() {
      var _this6 = this;

      var values = [];
      Object.keys(this.leafNodesById).forEach(function (id) {
        if (Object.prototype.hasOwnProperty.call(_this6.leafNodesById, id)) {
          if (_this6.leafNodesById[id].disabled) {
            values.push(id);
          }
        }
      });
      return values;
    }
  }, {
    key: "setDisables",
    value: function setDisables(values) {
      var _this7 = this;

      this.emptyNodesDisable();
      values.forEach(function (value) {
        _this7.setDisable(value);
      });
      this.updateLiElements();
    }
  }, {
    key: "emptyNodesCheckStatus",
    value: function emptyNodesCheckStatus() {
      this.willUpdateNodesById = this.getSelectedNodesById();
      Object.values(this.willUpdateNodesById).forEach(function (node) {
        // eslint-disable-next-line no-param-reassign
        if (!node.disabled) node.status = 0;
      });
    }
  }, {
    key: "emptyNodesDisable",
    value: function emptyNodesDisable() {
      this.willUpdateNodesById = this.getDisabledNodesById();
      Object.values(this.willUpdateNodesById).forEach(function (node) {
        // eslint-disable-next-line no-param-reassign
        node.disabled = false;
      });
    }
  }, {
    key: "getSelectedNodesById",
    value: function getSelectedNodesById() {
      return Object.entries(this.nodesById).reduce(function (acc, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            id = _ref2[0],
            node = _ref2[1];

        if (node.status === 1 || node.status === 2) {
          acc[id] = node;
        }

        return acc;
      }, {});
    }
  }, {
    key: "getDisabledNodesById",
    value: function getDisabledNodesById() {
      return Object.entries(this.nodesById).reduce(function (acc, _ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            id = _ref4[0],
            node = _ref4[1];

        if (node.disabled) {
          acc[id] = node;
        }

        return acc;
      }, {});
    }
  }, {
    key: "updateLiElements",
    value: function updateLiElements() {
      var _this8 = this;

      Object.values(this.willUpdateNodesById).forEach(function (node) {
        _this8.updateLiElement(node);
      });
      this.willUpdateNodesById = {};
    }
  }, {
    key: "markWillUpdateNode",
    value: function markWillUpdateNode(node) {
      this.willUpdateNodesById[node.id] = node;
    }
  }, {
    key: "walkUp",
    value: function walkUp(node, changeState) {
      var parent = node.parent;

      if (parent) {
        if (changeState === 'status') {
          var pStatus = null;
          var statusCount = parent.children.reduce(function (acc, child) {
            if (!Number.isNaN(child.status)) return acc + child.status;
            return acc;
          }, 0);

          if (statusCount) {
            pStatus = statusCount === parent.children.length * 2 ? 2 : 1;
          } else {
            pStatus = 0;
          }

          if (parent.status === pStatus) return;
          parent.status = pStatus;
        } else {
          var pDisabled = parent.children.reduce(function (acc, child) {
            return acc && child.disabled;
          }, true);
          if (parent.disabled === pDisabled) return;
          parent.disabled = pDisabled;
        }

        this.markWillUpdateNode(parent);
        this.walkUp(parent, changeState);
      }
    }
  }, {
    key: "walkDown",
    value: function walkDown(node, changeState) {
      var _this9 = this;

      if (node.children && node.children.length) {
        node.children.forEach(function (child) {
          if (changeState === 'status' && child.disabled) return; // eslint-disable-next-line no-param-reassign

          child[changeState] = node[changeState];

          _this9.markWillUpdateNode(child);

          _this9.walkDown(child, changeState);
        });
      }
    }
  }, {
    key: "updateLiElement",
    value: function updateLiElement(node) {
      var classList = this.liElementsById[node.id].classList;

      switch (node.status) {
        case 0:
          classList.remove('treejs-node__halfchecked', 'treejs-node__checked');
          break;

        case 1:
          classList.remove('treejs-node__checked');
          classList.add('treejs-node__halfchecked');
          break;

        case 2:
          classList.remove('treejs-node__halfchecked');
          classList.add('treejs-node__checked');
          break;

        default:
          break;
      }

      switch (node.disabled) {
        case true:
          if (!classList.contains('treejs-node__disabled')) classList.add('treejs-node__disabled');
          break;

        case false:
          if (classList.contains('treejs-node__disabled')) classList.remove('treejs-node__disabled');
          break;

        default:
          break;
      }
    }
  }, {
    key: "collapseAll",
    value: function collapseAll() {
      var _this10 = this;

      Object.keys(this.leafNodesById).forEach(function (id) {
        var leafNode = _this10.leafNodesById[id];
        collapseFromLeaf(_this10, leafNode);
      });
    }
  }, {
    key: "expandAll",
    value: function expandAll() {
      expandFromRoot(this, this.treeNodes[0]);
    }
  }], [{
    key: "onSwitcherClick",
    value: function onSwitcherClick(target) {
      var liEle = target.parentNode;
      var ele = liEle.lastChild;
      var height = ele.scrollHeight;

      if (liEle.classList.contains('treejs-node__close')) {
        animation(150, {
          enter: function enter() {
            ele.style.height = 0;
            ele.style.opacity = 0;
          },
          active: function active() {
            ele.style.height = "".concat(height, "px");
            ele.style.opacity = 1;
          },
          leave: function leave() {
            ele.style.height = '';
            ele.style.opacity = '';
            liEle.classList.remove('treejs-node__close');
          }
        });
      } else {
        animation(150, {
          enter: function enter() {
            ele.style.height = "".concat(height, "px");
            ele.style.opacity = 1;
          },
          active: function active() {
            ele.style.height = 0;
            ele.style.opacity = 0;
          },
          leave: function leave() {
            ele.style.height = '';
            ele.style.opacity = '';
            liEle.classList.add('treejs-node__close');
          }
        });
      }
    }
  }, {
    key: "parseTreeData",
    value: function parseTreeData(data) {
      var treeNodes = deepClone(data);
      var nodesById = {};
      var leafNodesById = {};
      var values = [];
      var disables = [];

      var walkTree = function walkTree(nodes, parent) {
        nodes.forEach(function (node) {
          nodesById[node.id] = node;
          if (node.checked) values.push(node.id);
          if (node.disabled) disables.push(node.id); // eslint-disable-next-line no-param-reassign

          if (parent) node.parent = parent;

          if (node.children && node.children.length) {
            walkTree(node.children, node);
          } else {
            leafNodesById[node.id] = node;
          }
        });
      };

      walkTree(treeNodes);
      return {
        treeNodes: treeNodes,
        nodesById: nodesById,
        leafNodesById: leafNodesById,
        defaultValues: values,
        defaultDisables: disables
      };
    }
  }, {
    key: "createRootEle",
    value: function createRootEle() {
      var div = document.createElement('div');
      div.classList.add('treejs');
      return div;
    }
  }, {
    key: "createUlEle",
    value: function createUlEle() {
      var ul = document.createElement('ul');
      ul.classList.add('treejs-nodes');
      return ul;
    }
  }, {
    key: "createLiEle",
    value: function createLiEle(node, closed) {
      var li = document.createElement('li');
      li.classList.add('treejs-node');
      if (closed) li.classList.add('treejs-node__close');

      if (node.children && node.children.length) {
        var switcher = document.createElement('span');
        switcher.classList.add('treejs-switcher');
        li.appendChild(switcher);
      } else {
        li.classList.add('treejs-placeholder');
      }

      var checkbox = document.createElement('span');
      checkbox.classList.add('treejs-checkbox');
      li.appendChild(checkbox);
      var label = document.createElement('span');
      label.classList.add('treejs-label');
      var text = document.createTextNode(node.text);
      label.appendChild(text);
      li.appendChild(label);
      li.nodeId = node.id;
      return li;
    }
  }]);

  return Tree;
}();

exports.default = Tree;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _default(_options) {
  var defaultOptions = {
    method: 'GET',
    url: '',
    async: true,
    success: null,
    failed: null,
    data: {},
    'Content-Type': 'application/json; charset=utf-8'
  };
  var options = Object.assign(defaultOptions, _options);
  var xhr = new XMLHttpRequest();
  var postData = Object.entries(options.data).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    acc.push("".concat(key, "=").concat(value));
    return acc;
  }, []).join('&');

  if (options.method.toUpperCase() === 'POST') {
    xhr.open(options.method, options.url, options.async);
    xhr.setRequestHeader('Content-Type', options['Content-Type']);
    xhr.send(postData);
  } else if (options.method.toUpperCase() === 'GET') {
    var url = options.url;

    if (postData) {
      if (url.indexOf('?') !== -1) {
        url += "&".concat(postData);
      } else {
        url += "&".concat(postData);
      }
    }

    xhr.open(options.method, url, options.async);
    xhr.setRequestHeader('Content-Type', options['Content-Type']);
    xhr.send(null);
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var res = xhr.responseText;

      if (options['Content-Type'] === defaultOptions['Content-Type']) {
        res = JSON.parse(res);
      }

      options.success && options.success(res);
    } else {
      options.failed && options.failed(xhr.status);
    }
  };
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_index_js_node_modules_postcss_loader_lib_index_js_ref_5_2_node_modules_less_loader_dist_cjs_js_index_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_index_js_node_modules_postcss_loader_lib_index_js_ref_5_2_node_modules_less_loader_dist_cjs_js_index_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_index_js_node_modules_postcss_loader_lib_index_js_ref_5_2_node_modules_less_loader_dist_cjs_js_index_less__WEBPACK_IMPORTED_MODULE_1__);

            

var refs = 0;
var update;
var options = {"injectType":"lazyStyleTag"};

options.insert = function insertIntoTarget(element, options) {
                                ;(options.target || document.head).appendChild(element);
                            };
options.singleton = false;

var exported = {};

exported.locals = _node_modules_css_loader_index_js_node_modules_postcss_loader_lib_index_js_ref_5_2_node_modules_less_loader_dist_cjs_js_index_less__WEBPACK_IMPORTED_MODULE_1___default.a.locals || {};
exported.use = function() {
  if (!(refs++)) {
    update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_index_js_node_modules_postcss_loader_lib_index_js_ref_5_2_node_modules_less_loader_dist_cjs_js_index_less__WEBPACK_IMPORTED_MODULE_1___default.a, options);
  }

  return exported;
};
exported.unuse = function() {
  if (refs > 0 && !--refs) {
    update();
    update = null;
  }
};



;
       /* harmony default export */ __webpack_exports__["default"] = (exported);


/***/ }),
/* 3 */
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
    var nonce =  true ? __webpack_require__.nc : undefined;

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(false);
// imports


// module
exports.push([module.i, ".treejs {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  font-size: 14px;\n  margin-left: -18px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.treejs *:after,\n.treejs *:before {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.treejs > .treejs-node {\n  padding-left: 0;\n}\n.treejs .treejs-nodes {\n  list-style: none;\n  padding-left: 18px;\n  margin: 0;\n  overflow: hidden;\n  -webkit-transition: height 150ms ease-out, opacity 150ms ease-out;\n  -o-transition: height 150ms ease-out, opacity 150ms ease-out;\n  transition: height 150ms ease-out, opacity 150ms ease-out;\n}\n.treejs .treejs-node {\n  cursor: pointer;\n  overflow: hidden;\n}\n.treejs .treejs-node.treejs-placeholder {\n  padding-left: 18px;\n}\n.treejs .treejs-switcher {\n  display: inline-block;\n  vertical-align: middle;\n  width: 20px;\n  height: 20px;\n  cursor: pointer;\n  position: relative;\n  -webkit-transition: -webkit-transform 150ms ease-out;\n  transition: -webkit-transform 150ms ease-out;\n  -o-transition: transform 150ms ease-out;\n  transition: transform 150ms ease-out;\n  transition: transform 150ms ease-out, -webkit-transform 150ms ease-out;\n}\n.treejs .treejs-switcher:before {\n  position: absolute;\n  top: 8px;\n  left: 6px;\n  display: block;\n  content: ' ';\n  border: 4px solid transparent;\n  border-top: 4px solid rgba(245, 245, 245, 0.7);\n  -webkit-transition: border-color 150ms;\n  -o-transition: border-color 150ms;\n  transition: border-color 150ms;\n}\n.treejs .treejs-switcher:hover:before {\n  border-top: 4px solid rgba(245, 245, 245, 0.96);\n}\n.treejs .treejs-node__close > .treejs-switcher {\n  -webkit-transform: rotate(-90deg);\n      -ms-transform: rotate(-90deg);\n          transform: rotate(-90deg);\n}\n.treejs .treejs-node__close > .treejs-nodes {\n  height: 0;\n}\n.treejs .treejs-checkbox {\n  display: inline-block;\n  vertical-align: middle;\n  width: 20px;\n  height: 20px;\n  cursor: pointer;\n  position: relative;\n}\n.treejs .treejs-checkbox:before {\n  -webkit-transition: all 0.3s;\n  -o-transition: all 0.3s;\n  transition: all 0.3s;\n  cursor: pointer;\n  position: absolute;\n  top: 2px;\n  content: ' ';\n  display: block;\n  width: 16px;\n  height: 16px;\n  border: 1px solid #d9d9d9;\n  border-radius: 2px;\n}\n.treejs .treejs-checkbox:hover:before {\n  -webkit-box-shadow: 0 0 2px 1px #1890ff;\n          box-shadow: 0 0 2px 1px #1890ff;\n}\n.treejs .treejs-node__checked > .treejs-checkbox:before {\n  background-color: #1890ff;\n  border-color: #1890ff;\n}\n.treejs .treejs-node__checked > .treejs-checkbox:after {\n  position: absolute;\n  content: ' ';\n  display: block;\n  top: 4px;\n  left: 5px;\n  width: 5px;\n  height: 9px;\n  border: 2px solid #fff;\n  border-top: none;\n  border-left: none;\n  -webkit-transform: rotate(45deg);\n      -ms-transform: rotate(45deg);\n          transform: rotate(45deg);\n}\n.treejs .treejs-node__halfchecked > .treejs-checkbox:before {\n  background-color: #1890ff;\n  border-color: #1890ff;\n}\n.treejs .treejs-node__halfchecked > .treejs-checkbox:after {\n  position: absolute;\n  content: ' ';\n  display: block;\n  top: 9px;\n  left: 3px;\n  width: 10px;\n  height: 2px;\n  background-color: #fff;\n}\n.treejs .treejs-node__disabled {\n  cursor: not-allowed;\n  color: rgba(255, 255, 255, 0.25);\n}\n.treejs .treejs-node__disabled .treejs-checkbox {\n  cursor: not-allowed;\n}\n.treejs .treejs-node__disabled .treejs-checkbox:before {\n  cursor: not-allowed;\n  border-color: #d9d9d9 !important;\n  background-color: #f5f5f5 !important;\n}\n.treejs .treejs-node__disabled .treejs-checkbox:hover:before {\n  -webkit-box-shadow: none !important;\n          box-shadow: none !important;\n}\n.treejs .treejs-node__disabled .treejs-node__checked > .treejs-checkbox:after {\n  border-color: #d9d9d9;\n}\n.treejs .treejs-node__disabled .treejs-node__halfchecked > .treejs-checkbox:after {\n  background-color: #d9d9d9;\n}\n.treejs .treejs-node__disabled.treejs-node__checked > .treejs-checkbox:after {\n  border-color: #d9d9d9;\n}\n.treejs .treejs-node__disabled.treejs-node__halfchecked > .treejs-checkbox:after {\n  background-color: #d9d9d9;\n}\n.treejs .treejs-label {\n  vertical-align: middle;\n}\n", ""]);

// exports


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
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
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=tree.js.map
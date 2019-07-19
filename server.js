"use strict";

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _lowdb = _interopRequireDefault(require("lowdb"));

var _FileAsync = _interopRequireDefault(require("lowdb/adapters/FileAsync"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var app = (0, _express["default"])();
app.use(_express["default"]["static"](_path["default"].join(__dirname, "db")));
app.use("websites/thumbnails", _express["default"]["static"](_path["default"].join(__dirname, "db/websites/thumbnails")));
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());

var readFile = function readFile(file) {
  return new Promise(function (resolve) {
    _fs["default"].readFile(file, "utf8", function (e, data) {
      if (e) {
        console.log(e);
        resolve(null);
      }

      resolve(data);
    });
  });
};

var handleHtmlRequest =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, type) {
    var id, filePath, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params && req.params.id;
            filePath = _path["default"].join("".concat(__dirname, "/db/").concat(type, "/").concat(id, ".html"));
            _context.next = 4;
            return readFile(filePath);

          case 4:
            data = _context.sent;

            if (data) {
              res.send({
                __html: data
              });
            } else {
              res.send({
                __html: ""
              });
            }

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function handleHtmlRequest(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var adapter = new _FileAsync["default"]("db/db.json");
(0, _lowdb["default"])(adapter).then(function (db) {
  app.get("/questions/all", function (req, res) {
    var questions = db.get("questions").value();
    var record = db.get("record").value();
    res.send({
      questions: questions,
      record: record
    });
  });
  app.get("/blogs/all", function (req, res) {
    var blogs = db.get("blogs").value();
    res.send(blogs);
  });
  app.get("/blog/:id",
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              handleHtmlRequest(req, res, "blogs");

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }());
  app.get("/question/:id",
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(req, res) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              handleHtmlRequest(req, res, "questions");

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x6, _x7) {
      return _ref3.apply(this, arguments);
    };
  }());
  app.get("/answer/:id",
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(req, res) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              handleHtmlRequest(req, res, "answers");

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x8, _x9) {
      return _ref4.apply(this, arguments);
    };
  }());
  app.get("/websites/all", function (req, res) {
    var websites = db.get("websites").value();
    res.send(websites);
  });
  app.post("/questiondone/:id",
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(req, res) {
      var id, record, finished, index;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              id = req.params && req.params.id;

              if (id) {
                record = db.get("record").value();
                finished = record.finished || [];
                index = finished.indexOf(id);

                if (index < 0) {
                  finished.push(id);
                  record.finished = finished;
                  db.set("record", record).write();
                }
              }

              res.sendStatus(200);

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x10, _x11) {
      return _ref5.apply(this, arguments);
    };
  }());
}).then(function () {
  app.listen(8000, function () {
    return console.log("listening on port 8000");
  });
});

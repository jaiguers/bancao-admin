"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"auth\": () => (/* binding */ auth)\n/* harmony export */ });\n// Simulación simple de autenticación para el frontend\n// En producción, esto se manejará desde el backend\n// Simular estado de autenticación\nlet isAuthenticated = false;\nlet currentUser = null;\nconst auth = {\n    // Simular login\n    login: (email, password)=>{\n        return new Promise((resolve)=>{\n            // Simular delay de API\n            setTimeout(()=>{\n                // Simular credenciales válidas\n                if (email && password) {\n                    isAuthenticated = true;\n                    currentUser = {\n                        id: \"1\",\n                        email: email,\n                        name: \"Administrador\"\n                    };\n                    resolve({\n                        success: true,\n                        user: currentUser\n                    });\n                } else {\n                    resolve({\n                        success: false,\n                        error: \"Credenciales requeridas\"\n                    });\n                }\n            }, 1000);\n        });\n    },\n    // Simular logout\n    logout: ()=>{\n        isAuthenticated = false;\n        currentUser = null;\n    },\n    // Verificar si está autenticado\n    isAuthenticated: ()=>{\n        return isAuthenticated;\n    },\n    // Obtener usuario actual\n    getCurrentUser: ()=>{\n        return currentUser;\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9saWIvYXV0aC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUEsc0RBQXNEO0FBQ3RELG1EQUFtRDtBQVFuRCxrQ0FBa0M7QUFDbEMsSUFBSUEsZUFBZSxHQUFHLEtBQUs7QUFDM0IsSUFBSUMsV0FBVyxHQUFnQixJQUFJO0FBRTVCLE1BQU1DLElBQUksR0FBRztJQUNsQixnQkFBZ0I7SUFDaEJDLEtBQUssRUFBRSxDQUFDQyxLQUFhLEVBQUVDLFFBQWdCLEdBQWlFO1FBQ3RHLE9BQU8sSUFBSUMsT0FBTyxDQUFDLENBQUNDLE9BQU8sR0FBSztZQUM5Qix1QkFBdUI7WUFDdkJDLFVBQVUsQ0FBQyxJQUFNO2dCQUNmLCtCQUErQjtnQkFDL0IsSUFBSUosS0FBSyxJQUFJQyxRQUFRLEVBQUU7b0JBQ3JCTCxlQUFlLEdBQUcsSUFBSTtvQkFDdEJDLFdBQVcsR0FBRzt3QkFDWlEsRUFBRSxFQUFFLEdBQUc7d0JBQ1BMLEtBQUssRUFBRUEsS0FBSzt3QkFDWk0sSUFBSSxFQUFFLGVBQWU7cUJBQ3RCO29CQUNESCxPQUFPLENBQUM7d0JBQUVJLE9BQU8sRUFBRSxJQUFJO3dCQUFFQyxJQUFJLEVBQUVYLFdBQVc7cUJBQUUsQ0FBQztnQkFDL0MsT0FBTztvQkFDTE0sT0FBTyxDQUFDO3dCQUFFSSxPQUFPLEVBQUUsS0FBSzt3QkFBRUUsS0FBSyxFQUFFLHlCQUF5QjtxQkFBRSxDQUFDO2dCQUMvRCxDQUFDO1lBQ0gsQ0FBQyxFQUFFLElBQUksQ0FBQztRQUNWLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxpQkFBaUI7SUFDakJDLE1BQU0sRUFBRSxJQUFZO1FBQ2xCZCxlQUFlLEdBQUcsS0FBSztRQUN2QkMsV0FBVyxHQUFHLElBQUk7SUFDcEIsQ0FBQztJQUVELGdDQUFnQztJQUNoQ0QsZUFBZSxFQUFFLElBQWU7UUFDOUIsT0FBT0EsZUFBZTtJQUN4QixDQUFDO0lBRUQseUJBQXlCO0lBQ3pCZSxjQUFjLEVBQUUsSUFBbUI7UUFDakMsT0FBT2QsV0FBVztJQUNwQixDQUFDO0NBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYW5jYW8tYWRtaW4vLi9saWIvYXV0aC50cz9iZjdlIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFNpbXVsYWNpw7NuIHNpbXBsZSBkZSBhdXRlbnRpY2FjacOzbiBwYXJhIGVsIGZyb250ZW5kXHJcbi8vIEVuIHByb2R1Y2Npw7NuLCBlc3RvIHNlIG1hbmVqYXLDoSBkZXNkZSBlbCBiYWNrZW5kXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFVzZXIge1xyXG4gIGlkOiBzdHJpbmdcclxuICBlbWFpbDogc3RyaW5nXHJcbiAgbmFtZTogc3RyaW5nXHJcbn1cclxuXHJcbi8vIFNpbXVsYXIgZXN0YWRvIGRlIGF1dGVudGljYWNpw7NuXHJcbmxldCBpc0F1dGhlbnRpY2F0ZWQgPSBmYWxzZVxyXG5sZXQgY3VycmVudFVzZXI6IFVzZXIgfCBudWxsID0gbnVsbFxyXG5cclxuZXhwb3J0IGNvbnN0IGF1dGggPSB7XHJcbiAgLy8gU2ltdWxhciBsb2dpblxyXG4gIGxvZ2luOiAoZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyk6IFByb21pc2U8eyBzdWNjZXNzOiBib29sZWFuOyB1c2VyPzogVXNlcjsgZXJyb3I/OiBzdHJpbmcgfT4gPT4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIC8vIFNpbXVsYXIgZGVsYXkgZGUgQVBJXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIC8vIFNpbXVsYXIgY3JlZGVuY2lhbGVzIHbDoWxpZGFzXHJcbiAgICAgICAgaWYgKGVtYWlsICYmIHBhc3N3b3JkKSB7XHJcbiAgICAgICAgICBpc0F1dGhlbnRpY2F0ZWQgPSB0cnVlXHJcbiAgICAgICAgICBjdXJyZW50VXNlciA9IHtcclxuICAgICAgICAgICAgaWQ6ICcxJyxcclxuICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxyXG4gICAgICAgICAgICBuYW1lOiAnQWRtaW5pc3RyYWRvcidcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJlc29sdmUoeyBzdWNjZXNzOiB0cnVlLCB1c2VyOiBjdXJyZW50VXNlciB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXNvbHZlKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnQ3JlZGVuY2lhbGVzIHJlcXVlcmlkYXMnIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9LCAxMDAwKVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICAvLyBTaW11bGFyIGxvZ291dFxyXG4gIGxvZ291dDogKCk6IHZvaWQgPT4ge1xyXG4gICAgaXNBdXRoZW50aWNhdGVkID0gZmFsc2VcclxuICAgIGN1cnJlbnRVc2VyID0gbnVsbFxyXG4gIH0sXHJcblxyXG4gIC8vIFZlcmlmaWNhciBzaSBlc3TDoSBhdXRlbnRpY2Fkb1xyXG4gIGlzQXV0aGVudGljYXRlZDogKCk6IGJvb2xlYW4gPT4ge1xyXG4gICAgcmV0dXJuIGlzQXV0aGVudGljYXRlZFxyXG4gIH0sXHJcblxyXG4gIC8vIE9idGVuZXIgdXN1YXJpbyBhY3R1YWxcclxuICBnZXRDdXJyZW50VXNlcjogKCk6IFVzZXIgfCBudWxsID0+IHtcclxuICAgIHJldHVybiBjdXJyZW50VXNlclxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiaXNBdXRoZW50aWNhdGVkIiwiY3VycmVudFVzZXIiLCJhdXRoIiwibG9naW4iLCJlbWFpbCIsInBhc3N3b3JkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRUaW1lb3V0IiwiaWQiLCJuYW1lIiwic3VjY2VzcyIsInVzZXIiLCJlcnJvciIsImxvZ291dCIsImdldEN1cnJlbnRVc2VyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./lib/auth.ts\n");

/***/ }),

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ HomePage)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/auth */ \"./lib/auth.ts\");\n\n\n\n\nfunction HomePage() {\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        // Redirigir según el estado de autenticación\n        if (_lib_auth__WEBPACK_IMPORTED_MODULE_3__.auth.isAuthenticated()) {\n            router.push(\"/dashboard\");\n        } else {\n            router.push(\"/login\");\n        }\n    }, [\n        router\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"min-h-screen flex items-center justify-center bg-gray-50\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600\"\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\shelo\\\\OneDrive\\\\Documentos\\\\projects\\\\bancao-admin\\\\pages\\\\index.tsx\",\n            lineNumber: 19,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\shelo\\\\OneDrive\\\\Documentos\\\\projects\\\\bancao-admin\\\\pages\\\\index.tsx\",\n        lineNumber: 18,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUFpQztBQUNNO0FBQ0w7QUFFbkIsU0FBU0csUUFBUSxHQUFHO0lBQ2pDLE1BQU1DLE1BQU0sR0FBR0gsc0RBQVMsRUFBRTtJQUUxQkQsZ0RBQVMsQ0FBQyxJQUFNO1FBQ2QsNkNBQTZDO1FBQzdDLElBQUlFLDJEQUFvQixFQUFFLEVBQUU7WUFDMUJFLE1BQU0sQ0FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUMzQixPQUFPO1lBQ0xGLE1BQU0sQ0FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QixDQUFDO0lBQ0gsQ0FBQyxFQUFFO1FBQUNGLE1BQU07S0FBQyxDQUFDO0lBRVoscUJBQ0UsOERBQUNHLEtBQUc7UUFBQ0MsU0FBUyxFQUFDLDBEQUEwRDtrQkFDdkUsNEVBQUNELEtBQUc7WUFBQ0MsU0FBUyxFQUFDLG1FQUFtRTs7Ozs7Z0JBQU87Ozs7O1lBQ3JGLENBQ1A7QUFDSCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmFuY2FvLWFkbWluLy4vcGFnZXMvaW5kZXgudHN4PzA3ZmYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJ1xyXG5pbXBvcnQgeyBhdXRoIH0gZnJvbSAnLi4vbGliL2F1dGgnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lUGFnZSgpIHtcclxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKVxyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgLy8gUmVkaXJpZ2lyIHNlZ8O6biBlbCBlc3RhZG8gZGUgYXV0ZW50aWNhY2nDs25cclxuICAgIGlmIChhdXRoLmlzQXV0aGVudGljYXRlZCgpKSB7XHJcbiAgICAgIHJvdXRlci5wdXNoKCcvZGFzaGJvYXJkJylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJvdXRlci5wdXNoKCcvbG9naW4nKVxyXG4gICAgfVxyXG4gIH0sIFtyb3V0ZXJdKVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctZ3JheS01MFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFuaW1hdGUtc3BpbiByb3VuZGVkLWZ1bGwgaC0xMiB3LTEyIGJvcmRlci1iLTIgYm9yZGVyLXByaW1hcnktNjAwXCI+PC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApXHJcbn1cclxuXHJcbiJdLCJuYW1lcyI6WyJ1c2VFZmZlY3QiLCJ1c2VSb3V0ZXIiLCJhdXRoIiwiSG9tZVBhZ2UiLCJyb3V0ZXIiLCJpc0F1dGhlbnRpY2F0ZWQiLCJwdXNoIiwiZGl2IiwiY2xhc3NOYW1lIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/index.tsx\n");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/index.tsx"));
module.exports = __webpack_exports__;

})();
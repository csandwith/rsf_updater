"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatersf_updater2"]("main_window",{

/***/ "./src/views/nav.jsx":
/*!***************************!*\
  !*** ./src/views/nav.jsx ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Nav)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/dist/react-redux.mjs\");\n/* harmony import */ var _redux_navSlice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../redux/navSlice */ \"./src/redux/navSlice.js\");\n\n//import { ipcRenderer } from 'electron';\n\n\nfunction Nav() {\n  const currentPage = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.nav.value);\n  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();\n  const handleClick = event => {\n    const target = event.currentTarget.getAttribute(\"target\");\n    console.log(target);\n    dispatch((0,_redux_navSlice__WEBPACK_IMPORTED_MODULE_1__.navigateTo)(target));\n  };\n  const testFileWrite = event => {\n    electron.fileApi.writeTextToFile(\"Some Text\", \"test.txt\");\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"nav\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h1\", null, \"Nav: \", currentPage), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"navList\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    id: \"updaterNav\",\n    target: \"updater\",\n    onClick: handleClick\n  }, \"Updater\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    id: \"settingsNav\",\n    target: \"settings\",\n    onClick: handleClick\n  }, \"Settings\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    id: \"tempNav3\",\n    target: \"ignore\",\n    onClick: testFileWrite\n  }, \"Test file Write\")));\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdmlld3MvbmF2LmpzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUEwQjtBQUMxQjtBQUNzRDtBQUNQO0FBRWhDLFNBQVNJLEdBQUdBLENBQUEsRUFBRztFQUMxQixNQUFNQyxXQUFXLEdBQUdKLHdEQUFXLENBQUVLLEtBQUssSUFBS0EsS0FBSyxDQUFDQyxHQUFHLENBQUNDLEtBQUssQ0FBQztFQUMzRCxNQUFNQyxRQUFRLEdBQUdQLHdEQUFXLENBQUMsQ0FBQztFQUU5QixNQUFNUSxXQUFXLEdBQUlDLEtBQUssSUFBSztJQUMzQixNQUFNQyxNQUFNLEdBQUdELEtBQUssQ0FBQ0UsYUFBYSxDQUFDQyxZQUFZLENBQUMsUUFBUSxDQUFDO0lBQ3pEQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0osTUFBTSxDQUFDO0lBQ25CSCxRQUFRLENBQUNOLDJEQUFVLENBQUNTLE1BQU0sQ0FBQyxDQUFDO0VBQ2hDLENBQUM7RUFFRCxNQUFNSyxhQUFhLEdBQUlOLEtBQUssSUFBSztJQUM3Qk8sUUFBUSxDQUFDQyxPQUFPLENBQUNDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDO0VBQzdELENBQUM7RUFFRCxvQkFDSXBCLDBEQUFBO0lBQUtzQixTQUFTLEVBQUM7RUFBSyxnQkFDaEJ0QiwwREFBQSxhQUFJLE9BQUssRUFBQ0ssV0FBZ0IsQ0FBQyxlQUMzQkwsMERBQUE7SUFBS3NCLFNBQVMsRUFBQztFQUFTLGdCQUNwQnRCLDBEQUFBO0lBQVF1QixFQUFFLEVBQUMsWUFBWTtJQUFDWCxNQUFNLEVBQUMsU0FBUztJQUFDWSxPQUFPLEVBQUVkO0VBQVksR0FBQyxTQUFlLENBQUMsZUFDL0VWLDBEQUFBO0lBQVF1QixFQUFFLEVBQUMsYUFBYTtJQUFDWCxNQUFNLEVBQUMsVUFBVTtJQUFDWSxPQUFPLEVBQUVkO0VBQVksR0FBQyxVQUFnQixDQUFDLGVBQ2xGViwwREFBQTtJQUFRdUIsRUFBRSxFQUFDLFVBQVU7SUFBQ1gsTUFBTSxFQUFDLFFBQVE7SUFBQ1ksT0FBTyxFQUFFUDtFQUFjLEdBQUMsaUJBQXVCLENBQ3BGLENBQ0osQ0FBQztBQUVkIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcnNmX3VwZGF0ZXIyLy4vc3JjL3ZpZXdzL25hdi5qc3g/YmM1NyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuLy9pbXBvcnQgeyBpcGNSZW5kZXJlciB9IGZyb20gJ2VsZWN0cm9uJztcbmltcG9ydCB7IHVzZVNlbGVjdG9yLCB1c2VEaXNwYXRjaCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgbmF2aWdhdGVUbyB9IGZyb20gJy4uL3JlZHV4L25hdlNsaWNlJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTmF2KCkge1xuICAgIGNvbnN0IGN1cnJlbnRQYWdlID0gdXNlU2VsZWN0b3IoKHN0YXRlKSA9PiBzdGF0ZS5uYXYudmFsdWUpO1xuICAgIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcblxuICAgIGNvbnN0IGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwidGFyZ2V0XCIpO1xuICAgICAgICBjb25zb2xlLmxvZyh0YXJnZXQpO1xuICAgICAgICBkaXNwYXRjaChuYXZpZ2F0ZVRvKHRhcmdldCkpO1xuICAgIH07XG5cbiAgICBjb25zdCB0ZXN0RmlsZVdyaXRlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGVsZWN0cm9uLmZpbGVBcGkud3JpdGVUZXh0VG9GaWxlKFwiU29tZSBUZXh0XCIsIFwidGVzdC50eHRcIik7IFxuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdlwiPlxuICAgICAgICAgICAgPGgxPk5hdjoge2N1cnJlbnRQYWdlfTwvaDE+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5hdkxpc3RcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVwidXBkYXRlck5hdlwiIHRhcmdldD1cInVwZGF0ZXJcIiBvbkNsaWNrPXtoYW5kbGVDbGlja30+VXBkYXRlcjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJzZXR0aW5nc05hdlwiIHRhcmdldD1cInNldHRpbmdzXCIgb25DbGljaz17aGFuZGxlQ2xpY2t9PlNldHRpbmdzPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInRlbXBOYXYzXCIgdGFyZ2V0PVwiaWdub3JlXCIgb25DbGljaz17dGVzdEZpbGVXcml0ZX0+VGVzdCBmaWxlIFdyaXRlPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn0iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTZWxlY3RvciIsInVzZURpc3BhdGNoIiwibmF2aWdhdGVUbyIsIk5hdiIsImN1cnJlbnRQYWdlIiwic3RhdGUiLCJuYXYiLCJ2YWx1ZSIsImRpc3BhdGNoIiwiaGFuZGxlQ2xpY2siLCJldmVudCIsInRhcmdldCIsImN1cnJlbnRUYXJnZXQiLCJnZXRBdHRyaWJ1dGUiLCJjb25zb2xlIiwibG9nIiwidGVzdEZpbGVXcml0ZSIsImVsZWN0cm9uIiwiZmlsZUFwaSIsIndyaXRlVGV4dFRvRmlsZSIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJpZCIsIm9uQ2xpY2siXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/views/nav.jsx\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("55b530eb0e28ca84d0ef")
/******/ })();
/******/ 
/******/ }
);
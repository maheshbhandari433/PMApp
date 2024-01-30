"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectList = void 0;
var base_component_1 = require("./base-component");
var project_model_1 = require("../models/project-model");
var autobind_1 = require("../decorators/autobind");
var project_state_1 = require("../state/project-state");
var project_item_1 = require("./project-item");
// ProjectList Class
var ProjectList = function () {
    var _a;
    var _classSuper = base_component_1.Component;
    var _instanceExtraInitializers = [];
    var _dragOverHandler_decorators;
    var _dropHandler_decorators;
    var _dragLeaveHandler_decorators;
    return _a = /** @class */ (function (_super) {
            __extends(ProjectList, _super);
            function ProjectList(type) {
                var _this = _super.call(this, 'project-list', 'app', false, "".concat(type, "-projects")) || this;
                _this.type = (__runInitializers(_this, _instanceExtraInitializers), type);
                _this.assignedProjects = [];
                _this.configure();
                _this.renderContent();
                return _this;
            }
            ProjectList.prototype.dragOverHandler = function (event) {
                if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                    event.preventDefault();
                    var listEl = this.element.querySelector('ul');
                    listEl.classList.add('droppable');
                }
            };
            ProjectList.prototype.dropHandler = function (event) {
                var prjId = event.dataTransfer.getData('text/plain');
                project_state_1.projectState.moveProject(prjId, this.type === 'active' ? project_model_1.ProjectStatus.Active : project_model_1.ProjectStatus.Finished);
            };
            ProjectList.prototype.dragLeaveHandler = function (_) {
                var listEl = this.element.querySelector('ul');
                listEl.classList.remove('droppable');
            };
            ProjectList.prototype.configure = function () {
                var _this = this;
                this.element.addEventListener('dragover', this.dragOverHandler);
                this.element.addEventListener('dragleave', this.dragLeaveHandler);
                this.element.addEventListener('drop', this.dropHandler);
                project_state_1.projectState.addListener(function (projects) {
                    var relevantProjects = projects.filter(function (prj) {
                        if (_this.type === 'active') {
                            return prj.status === project_model_1.ProjectStatus.Active;
                        }
                        return prj.status === project_model_1.ProjectStatus.Finished;
                    });
                    _this.assignedProjects = relevantProjects;
                    _this.renderProjects();
                });
            };
            ProjectList.prototype.renderContent = function () {
                var listId = "".concat(this.type, "-projects-list");
                this.element.querySelector('ul').id = listId;
                this.element.querySelector('h2').textContent =
                    this.type.toUpperCase() + ' PROJECTS';
            };
            ProjectList.prototype.renderProjects = function () {
                var listEl = document.getElementById("".concat(this.type, "-projects-list"));
                listEl.innerHTML = '';
                for (var _i = 0, _b = this.assignedProjects; _i < _b.length; _i++) {
                    var prjItem = _b[_i];
                    new project_item_1.ProjectItem(this.element.querySelector('ul').id, prjItem);
                }
            };
            return ProjectList;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _dragOverHandler_decorators = [autobind_1.autobind];
            _dropHandler_decorators = [autobind_1.autobind];
            _dragLeaveHandler_decorators = [autobind_1.autobind];
            __esDecorate(_a, null, _dragOverHandler_decorators, { kind: "method", name: "dragOverHandler", static: false, private: false, access: { has: function (obj) { return "dragOverHandler" in obj; }, get: function (obj) { return obj.dragOverHandler; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _dropHandler_decorators, { kind: "method", name: "dropHandler", static: false, private: false, access: { has: function (obj) { return "dropHandler" in obj; }, get: function (obj) { return obj.dropHandler; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _dragLeaveHandler_decorators, { kind: "method", name: "dragLeaveHandler", static: false, private: false, access: { has: function (obj) { return "dragLeaveHandler" in obj; }, get: function (obj) { return obj.dragLeaveHandler; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ProjectList = ProjectList;

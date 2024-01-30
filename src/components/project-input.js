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
exports.ProjectInput = void 0;
var base_component_1 = require("./base-component");
var validation_1 = require("../util/validation");
var autobind_1 = require("../decorators/autobind");
var project_state_1 = require("../state/project-state");
// ProjectInput Class
var ProjectInput = function () {
    var _a;
    var _classSuper = base_component_1.Component;
    var _instanceExtraInitializers = [];
    var _submitHandler_decorators;
    return _a = /** @class */ (function (_super) {
            __extends(ProjectInput, _super);
            function ProjectInput() {
                var _this = _super.call(this, 'project-input', 'app', true, 'user-input') || this;
                _this.titleInputElement = (__runInitializers(_this, _instanceExtraInitializers), void 0);
                _this.titleInputElement = _this.element.querySelector('#title');
                _this.descriptionInputElement = _this.element.querySelector('#description');
                _this.peopleInputElement = _this.element.querySelector('#people');
                _this.commentInputElement = _this.element.querySelector('#comment');
                _this.configure();
                return _this;
            }
            ProjectInput.prototype.configure = function () {
                this.element.addEventListener('submit', this.submitHandler);
            };
            ProjectInput.prototype.renderContent = function () { };
            ProjectInput.prototype.gatherUserInput = function () {
                var enteredTitle = this.titleInputElement.value;
                var enteredDescription = this.descriptionInputElement.value;
                var enteredPeople = this.peopleInputElement.value;
                var enteredComment = this.commentInputElement.value;
                var titleValidatable = {
                    value: enteredTitle,
                    required: true,
                };
                var descriptionValidatable = {
                    value: enteredDescription,
                    required: true,
                    minLength: 5,
                };
                var peopleValidatable = {
                    value: +enteredPeople,
                    required: true,
                    min: 1,
                    max: 5,
                };
                var commentValidatable = {
                    value: enteredComment,
                    required: true,
                    minLength: 5,
                };
                if (!(0, validation_1.validate)(titleValidatable) ||
                    !(0, validation_1.validate)(descriptionValidatable) ||
                    !(0, validation_1.validate)(peopleValidatable) ||
                    !(0, validation_1.validate)(commentValidatable)) {
                    alert('Invalid input, please try again!');
                    return;
                }
                else {
                    return [enteredTitle, enteredDescription, +enteredPeople, enteredComment];
                }
            };
            ProjectInput.prototype.clearInputs = function () {
                this.titleInputElement.value = '';
                this.descriptionInputElement.value = '';
                this.peopleInputElement.value = '';
                this.commentInputElement.value = '';
            };
            ProjectInput.prototype.submitHandler = function (event) {
                event.preventDefault();
                var userInput = this.gatherUserInput();
                if (Array.isArray(userInput)) {
                    var title = userInput[0], desc = userInput[1], people = userInput[2], comment = userInput[3];
                    project_state_1.projectState.addProject(title, desc, people, comment);
                    this.clearInputs();
                }
            };
            return ProjectInput;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _submitHandler_decorators = [autobind_1.autobind];
            __esDecorate(_a, null, _submitHandler_decorators, { kind: "method", name: "submitHandler", static: false, private: false, access: { has: function (obj) { return "submitHandler" in obj; }, get: function (obj) { return obj.submitHandler; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ProjectInput = ProjectInput;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = exports.ProjectStatus = void 0;
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (exports.ProjectStatus = ProjectStatus = {}));
var Project = /** @class */ (function () {
    function Project(id, title, description, people, comment, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.comment = comment;
        this.status = status;
    }
    return Project;
}());
exports.Project = Project;

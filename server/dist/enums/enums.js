"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskPriority = exports.TaskStatus = void 0;
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["TO_DO"] = "To Do";
    TaskStatus["IN_PROGRESS"] = "In Progress";
    TaskStatus["UNDER_REVIEW"] = "Under Review";
    TaskStatus["FINISHED"] = "Finished";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
var TaskPriority;
(function (TaskPriority) {
    TaskPriority["LOW"] = "Low";
    TaskPriority["MEDIUM"] = "Medium";
    TaskPriority["URGENT"] = "Urgent";
})(TaskPriority || (exports.TaskPriority = TaskPriority = {}));
//# sourceMappingURL=enums.js.map
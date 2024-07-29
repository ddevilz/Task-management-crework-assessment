"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const config_1 = require("./config/config");
const cors_1 = __importDefault(require("cors"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const app = (0, express_1.default)();
(0, db_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1", index_routes_1.default);
app.use(error_middleware_1.notFound);
app.use(error_middleware_1.errorHandler);
app.get("/", (_req, res) => {
    res.status(200).send("Hello World!");
});
app.listen(config_1.config.PORT, () => {
    console.log("App listening on port " + config_1.config.PORT);
});
exports.default = app;
//# sourceMappingURL=app.js.map
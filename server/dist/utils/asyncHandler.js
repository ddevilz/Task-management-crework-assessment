"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
const asyncHandler = (func) => async (req, res, next) => {
    try {
        await func(req, res, next);
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.asyncHandler = asyncHandler;
//# sourceMappingURL=asyncHandler.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// lib/server.ts
const app_1 = require("app");
const PORT = 3000;
app_1.default.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});

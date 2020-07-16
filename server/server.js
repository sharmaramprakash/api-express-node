const express = require('express');
const app = express();
const router = require('../router/expressrouter');
app.use('/api', router);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Lisening on the port ${port}`));
//# sourceMappingURL=server.js.map
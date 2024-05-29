const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

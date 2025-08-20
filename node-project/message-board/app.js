const express = require('express');
const indexRouter = require('./routes/indexRouter');
const dbSeeding = require('./db/seeding');

const PORT = process.env.PORT || 3000;
const app = express();
dbSeeding();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouter);

app.listen(PORT, () => {
    console.log(`Server running at port:${PORT}`);
});
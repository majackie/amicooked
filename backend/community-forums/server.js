const { app } = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Microservice running on port ${PORT}`);
});
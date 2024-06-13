require('./config/db')

const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express");

const swaggerConfig = require('./swagger');
const { swaggerSpec, swaggerOptions} = swaggerConfig;


const app = require('express')()
const port = 3000

const UserRouter = require('./api/User')

const bodyParser = require('express').json
app.use(bodyParser())

  
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerJsdoc(swaggerSpec), swaggerOptions)
);
  

app.use('/usuario', UserRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).json({ message: 'Erro interno do servidor!' });
})
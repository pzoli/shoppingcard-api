require("dotenv").config();
import express, { Router } from 'express';
const app = express();
import swaggerUi from 'swagger-ui-express';
import fs from "fs";
import bodyParser from 'body-parser';
import connection from "./db";
import routeItem from './routes/routeItem';
import routeCategory from './routes/routeCategory';
import routeAmountType from './routes/routeAmountType';


connection();

const port = process.env.PORT || 8080

const jsonParser = bodyParser.json();
app.use(jsonParser);

app.use('/api/admin/crud/item', routeItem);
app.use('/api/admin/crud/category', routeCategory);
app.use('/api/admin/crud/amounttype', routeAmountType);

const file = fs.readFileSync('./openapi.json', 'utf8')
const swaggerDocument = JSON.parse(file)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const router = Router();
router.get("/json", async (req, res) => {
    res.send(swaggerDocument);
})
app.use('/api', router);


app.listen(port, async () => {
    console.log(`App is running at http://localhost:${port}`);
})
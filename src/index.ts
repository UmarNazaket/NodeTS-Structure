import express, {Express} from 'express';
import routes from './routes';
import connection from "./connection";
const app: Express = express();


app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use('/', routes);

app.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

app.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});


const PORT: any = process.env.PORT ?? 3000;
connection.then((data) => {
    app.listen(PORT, () => {
        console.log(`The server is running on port ${PORT}`)
    })
}).catch((error) => {
    console.log(error.message)
})


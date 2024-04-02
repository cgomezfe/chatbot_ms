import  express  from "express"
import config from "./config"
import chatbotRoutes from "./routes/chatbot.routes"

const app = express()

//settings
app.set('port', config.port )

//middleware
//app.use(cors());
//app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(chatbotRoutes   )

export default app



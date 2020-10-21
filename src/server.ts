import fastify from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import fastifyFormbody from 'fastify-formbody';
import dotenv from 'dotenv';
import helmet from 'fastify-helmet';
import fastswagger from 'fastify-swagger';

dotenv.config({ path: __dirname + '/../.env' });
import routes from './routes';

const app: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify(
    {
        logger: true,
        trustProxy: true
    }
);
app.register(helmet);
app.register(fastifyFormbody);

const host = process.env.HOST || (require('../config/url.json')[process.env.NODE_ENV]).host;
const scheme = process.env.SCHEME || (require('../config/url.json')[process.env.NODE_ENV]).scheme;
const expose = process.env.NODE_ENV === 'production' ? false : true;

const configs = (require('../config/url.json')[process.env.NODE_ENV]);


app.register(fastswagger, {
    exposeRoute: true,
    routePrefix: '/',
    swagger: {
        info: {
            title: 'GATEWAY SERVICE',
            description: 'All micro-services',
            version: '1.0.0'
        },
        host: '0.0.0.0:'+process.env.PORT,
        schemes: "",
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
            { name: 'Auth', description: 'Auth related endpoints' }          
        ],
        securityDefinitions: {
            "Authorization": {
                "type": "apiKey",
                "name": "Authorization",
                "in": "header"
            }
        }
    }
});

routes(app);
// socketRoutes(app);

app.listen(+process.env.PORT, '0.0.0.0', (err, address) => {
    if(err){
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`Server listening on ${address}`);
});

module.exports = app;
import * as fastify from 'fastify';

import userRoute from './user';
import authRoute from './auth';

export default (app: fastify.FastifyInstance) => {

    app.register(userRoute, { prefix: '/api/v1/user' });
    app.register(authRoute, { prefix: '/api/v1/user' });
    
};
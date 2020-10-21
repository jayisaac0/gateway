import * as fastify from 'fastify';

import authRoute from './v1/auth';

export default (app: fastify.FastifyInstance) => {
    authRoute(app);                                                                                                                                                                                                                                                                                           
};
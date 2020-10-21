import * as fastify from 'fastify';
import Responses from '../../../utils/responses';
import {RouteSchema} from '../../../@types/routeschema';
import Requests from '../../../utils/requests';
import requestmaker from '../../../utils/requestmaker';

export default (app: fastify.FastifyInstance, options, done) => {

    const action = 'Auth';
    
    const userInterface = {
        email: {type: 'string'},
        password: {type: 'string'},
    };
    /**
     * USER LOGIN AUTH ENDPOINT HERE
     */
    const createUserSchema: RouteSchema = {
        tags: [`${action}`], summary: `Login to app`,
        body: Requests.requestBody(userInterface, ['email', 'password']),
        response: {
            400: Responses.errorResponseObj(),
            200: Responses.successResponseObj(userInterface)
        }
    }
    app.post('/auth', { schema: createUserSchema}, async(request, response) => {
        let user;
        try {
            user = await requestmaker({
                service: 'auth',
                action: 'user/auth',
                method: 'POST',
                data: request.body
            })
        } catch (ex) {
            return response.code(400).send(ex)
        }
        response.send(user);
    });

    done();
};
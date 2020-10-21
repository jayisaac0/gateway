import * as fastify from 'fastify';
import Responses from '../../../utils/responses';
import {RouteSchema} from '../../../@types/routeschema';
import Requests from '../../../utils/requests';
import requestmaker from '../../../utils/requestmaker';

export default (app: fastify.FastifyInstance, options, done) => {

    const action = 'Auth';

    const userInterface = {
        first_name: {type: 'string', minLength: 4},
        last_name: {type: 'string', minLength: 4, maxLength: 255 },
        email: {type: 'string'},
        user_name: {type: 'string'},
        password: {type: 'string'},
    };

    /**
     * USER REGISTRATION AUTH ENDPOINT HERE
     */
    const createUserSchema: RouteSchema = {
        tags: [`${action}`], summary: `Create new user endpoint`,
        body: Requests.requestBody(userInterface, ['first_name', 'last_name', 'email', 'password']),
        response: {
            400: Responses.errorResponseObj(),
            200: Responses.successResponseObj(userInterface)
        }
    }
    app.post('/signup', { schema: createUserSchema}, async(request, response) => {
        let user;
        try {
            user = await requestmaker({
                service: 'auth',
                action: 'user/signup',
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
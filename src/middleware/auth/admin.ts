import fastify from 'fastify';
import reqmaker from '../../utils/requestmaker';
import Responses from '../../utils/responses';

export default async function(request: fastify.FastifyRequest, response, next) {
    const token = request.headers["authorization"] || "";
    console.log(request.headers);
    
    let validate;
    try {
      validate = await reqmaker({
          service: 'auth',
          action: 'user/auth-token',
          method: 'POST',
          headers: {
              Authorization: token
          }  
      });
    } catch (e) {
      return response.code(401).send(e);
    }

    request["token"] = token;
    request["userInfo"] = validate.success;

    return;
}
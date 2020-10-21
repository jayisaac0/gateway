import fastify from 'fastify';

export interface RouteSchema extends fastify.RouteSchema {
    tags?: string[];
    body?: object;
    data?: object;
    params?: object;
    response?: any;
    description?: string;
    summary?: string;
    url?: string;
}
import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';

import { getTodosForUser as getTodosForUser } from '../../businessLogic/todos';
import { getUserId } from '../utils';
//
import { createLogger } from '../../utils/logger';
import { getToken } from '../../utils/getJwt';
import { TodoItem } from '../../models/Todo.d';
import { getTodos } from '../../businessLogic/todos';

const logger = createLogger('getTodos');

// TODO: Get all TODO items for a current user
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here
   // const todos = '...'

   logger.info('Processing GetTodos event...');
   const jwtToken: string = getToken(event);
   const headers = {
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Credentials': true
   };
 
   try {
     const todoList: TodoItem[] = await getTodos(jwtToken);
     logger.info('Successfully retrieved todolist');
     return {
       statusCode: 200,
       headers,
       body: JSON.stringify({ todoList })
     };
   } catch (error) {
     logger.error(`Error: ${error.message}`);
     return {
       statusCode: 500,
       headers,
       body: JSON.stringify({ error })
     };
   }


   // return undefined

  }

)
handler.use(
  cors({
    credentials: true
  })
)

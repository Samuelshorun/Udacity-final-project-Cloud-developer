import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { CreateTodoRequest } from '../../requests/CreateTodoRequest';
import { getUserId } from '../utils';
import { createTodo } from '../../businessLogic/todos';
//
import { createLogger } from '../../utils/logger';
import { getToken } from '../../utils/getJwt';
import { TodoCreate, TodoItem } from '../../models/Todo.d';

const logger = createLogger('createTodo');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    // TODO: Implement creating a new TODO item
//
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    };
  
    try {
      const newTodo: TodoItem = await createTodo(jwtToken, newTodoData);
      logger.info('Successfully created a new todo item.');
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ newTodo })
      };
    } catch (error) {
      logger.error(`Error: ${error.message}`);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error })
      };
    }

  }
    //return undefined
)

handler.use(
  cors({
    credentials: true
  })
)

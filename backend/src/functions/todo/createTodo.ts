import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { AppSyncIdentityCognito, AppSyncResolverEvent } from "aws-lambda";
import { Todo } from "../../model/Todo";
import mksuid from "mksuid";
import { createDynamoDbClient } from "../../util/createDynamoDbClient";

export const handler = async (event: AppSyncResolverEvent<Todo>): Promise<Todo> => {
  const todo: Todo = event.arguments;

  //Use KSUID for which is similar to UUID, but it is sortable because the first part contains a timestamp
  todo.id = mksuid(); 
  todo.user = (event.identity as AppSyncIdentityCognito).sub;

  const client = createDynamoDbClient();
  const ddbDocClient = DynamoDBDocumentClient.from(client);

  await ddbDocClient.send(
    new PutCommand({
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        PK: `USER#${todo.user}`,
        SK: `TODO#${todo.id}`,
        id: todo.id,
        name: todo.name,
        user: todo.user
      },
    })
  );

  return event.arguments;
}


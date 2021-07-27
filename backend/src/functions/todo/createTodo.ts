import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { AppSyncIdentityCognito, AppSyncResolverEvent } from "aws-lambda";
import { uuid } from "short-uuid";
import { Todo } from "../../model/Todo";
import { createDynamoDbClient } from "../../util/createDynamoDbClient";

export const handler = async (event: AppSyncResolverEvent<Todo>): Promise<Todo> => {
  console.log(JSON.stringify(event, null, 2));

  const todo: Todo = event.arguments;

  todo.id = uuid();
  todo.user = (event.identity as AppSyncIdentityCognito).sub;

  const client = createDynamoDbClient();
  const ddbDocClient = DynamoDBDocumentClient.from(client);

  await ddbDocClient.send(
    new PutCommand({
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        PK: `TODO#${todo.id}`,
        SK: `TODO#${todo.id}`,
        GSIPK: `USER#${todo.user}`,
        GSISK: `ORDER#${todo.order?.toString().padStart(5, "0")}#${todo.order}`,
        id: todo.id,
        name: todo.name
      },
    })
  );

  return event.arguments;
}


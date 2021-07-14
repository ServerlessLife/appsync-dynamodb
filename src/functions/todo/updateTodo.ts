import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { AppSyncResolverEvent } from "aws-lambda";
import { Todo } from "../../model/Todo";

export const handler = async (event: AppSyncResolverEvent<Todo>): Promise<Todo> => {
  const todo = event.arguments;

  const client = new DynamoDBClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  });
  const ddbDocClient = DynamoDBDocumentClient.from(client); 

  await ddbDocClient.send(
    new PutCommand({
      TableName : "todo",
      Item: {
        PK: `TODO#${todo.id}`,
        SK: `TODO#${todo.id}`,
        GSIPK: `USER#${todo.userKey}`,
        GSISK: `ORDER#${todo.order.toString().padStart(5, "0")}#${todo.id}`,
        ...todo
      },
    })
  );

  return event.arguments;
}

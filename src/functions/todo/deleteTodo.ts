import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { AppSyncResolverEvent } from "aws-lambda";
import { Todo } from "../../model/Todo";

export const handler = async (event: AppSyncResolverEvent<Todo>): Promise<boolean> => {
  const todo = event.arguments;

  const client = new DynamoDBClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  });
  const ddbDocClient = DynamoDBDocumentClient.from(client); 

  await ddbDocClient.send(
    new DeleteCommand({
      TableName : "todo",
      Key: {
        PK: `TODO#${todo.id}`,
        SK: `TODO#${todo.id}`,
      },
    })
  );

  return true;
}

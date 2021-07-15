import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { AppSyncResolverEvent } from "aws-lambda";
import { Todo } from "../../model/Todo";
import { createDynamoDbClient } from "../../util/createDynamoDbClient";

export const handler = async (event: AppSyncResolverEvent<Todo>): Promise<Todo> => {
  const todo = event.arguments;

  const client = createDynamoDbClient();
  const ddbDocClient = DynamoDBDocumentClient.from(client); 

  await ddbDocClient.send(
    new PutCommand({
      TableName : process.env.DYNAMODB_TABLE,
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

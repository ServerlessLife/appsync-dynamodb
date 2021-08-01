import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { AppSyncIdentityCognito, AppSyncResolverEvent } from "aws-lambda";
import { Todo } from "../../model/Todo";
import { createDynamoDbClient } from "../../util/createDynamoDbClient";

export const handler = async (event: AppSyncResolverEvent<Todo>): Promise<Todo> => {
  const todo = event.arguments;

  const client = createDynamoDbClient();
  const ddbDocClient = DynamoDBDocumentClient.from(client);
  const user = (event.identity as AppSyncIdentityCognito).sub;

  await ddbDocClient.send(
    new UpdateCommand({
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        PK: `USER#${user}`,
        SK: `TODO#${todo.id}`,
      },
      ExpressionAttributeNames: {
        '#name': "name"
      },
      UpdateExpression: "set #name = :name",
      ExpressionAttributeValues: {
        ":name": todo.name
      },
    })
  );

  return event.arguments;
}

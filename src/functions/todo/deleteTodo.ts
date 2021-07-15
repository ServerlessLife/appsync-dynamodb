import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { AppSyncResolverEvent } from "aws-lambda";
import { Todo } from "../../model/Todo";
import { createDynamoDbClient } from "../../util/createDynamoDbClient";

export const handler = async (event: AppSyncResolverEvent<Todo>): Promise<boolean> => {
  const todo = event.arguments;

  const client = createDynamoDbClient();
  const ddbDocClient = DynamoDBDocumentClient.from(client); 

  await ddbDocClient.send(
    new DeleteCommand({
      TableName : process.env.DYNAMODB_TABLE,
      Key: {
        PK: `TODO#${todo.id}`,
        SK: `TODO#${todo.id}`,
      },
    })
  );

  return true;
}

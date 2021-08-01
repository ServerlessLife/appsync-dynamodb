import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { AppSyncIdentityCognito, AppSyncResolverEvent } from "aws-lambda";
import { Todo } from "../../model/Todo";
import { createDynamoDbClient } from "../../util/createDynamoDbClient";

export const handler = async (event: AppSyncResolverEvent<{ userKey: string }>): Promise<Todo[]> => {
  const client = createDynamoDbClient();
  const ddbDocClient = DynamoDBDocumentClient.from(client);

  const user = (event.identity as AppSyncIdentityCognito).sub;

  //return only requested fields
  const expressionAttributeNames = {}
  for (const field of event.info.selectionSetList) {
    expressionAttributeNames[`#${field}`] = field
  }
  const projectionExpression = event.info.selectionSetList.map(i => `#${i}`).join(", ")

  const data = await ddbDocClient.send(
    new QueryCommand(
      {
        TableName: process.env.DYNAMODB_TABLE,
        KeyConditionExpression: "PK = :PK",
        ExpressionAttributeValues: {
          ":PK": { S: `USER#${user}` },
        },
        ExpressionAttributeNames: expressionAttributeNames,        
        ProjectionExpression: projectionExpression
      }
    )
  );

  const list = data.Items.map(i => (<Todo>{
    id: i.id?.S,
    name: i.name?.S
  }));

  return list;
}

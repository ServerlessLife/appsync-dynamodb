import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, AppSyncResolverEvent } from "aws-lambda";
import { uuid } from "short-uuid";
import { Todo } from "../../model/Todo";

export const handler = async (event : AppSyncResolverEvent<{ userKey: string }>) : Promise<Todo[]> => {
  const userKey = event.arguments.userKey

  console.log("userKey: ", userKey);

  const client = new DynamoDBClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  });
  const ddbDocClient = DynamoDBDocumentClient.from(client); 

  const data = await ddbDocClient.send(
    new ScanCommand(
      {
        TableName : "todo",
      }
    )
  );

  const list =  data.Items.map(i => (<Todo>{
    id: i.id.S,
    name: i.name.S,
    userKey: i.userKey.S,
    order: i.order.N as any
  }));

  return list;
}

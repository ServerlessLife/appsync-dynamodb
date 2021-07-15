import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";

export function createDynamoDbClient() {
  let config: DynamoDBClientConfig;

  if (process.env.IS_OFFLINE) {
    config = {
      region: 'localhost',
      endpoint: 'http://localhost:8000',
    }
  }
  else {
    config = {};
  }

  return new DynamoDBClient(config);
}

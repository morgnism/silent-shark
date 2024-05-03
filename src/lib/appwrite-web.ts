import { Client } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('6610c470041ebcf6ff30');

const subscribeInvestments = () => {
  client.subscribe(
    'databases.tank.collections.investment.documents',
    (data) => {},
  );
};

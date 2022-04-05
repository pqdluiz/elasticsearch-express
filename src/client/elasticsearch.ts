import elasticsearch, { Client } from 'elasticsearch';

async function getClient(): Promise<Client> {
  const client = new elasticsearch.Client({
    host: 'localhost:9200',
    // log: 'trace'
  });

  return client;
}

export default getClient;
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema, Resolver, Query } from "type-graphql";
import cors from "cors";

const app = Express();
app.use(cors());

@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello() {
    return "Hello World";
  }
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  const apolloserver = new ApolloServer({ schema });
  await apolloserver.start();
  apolloserver.applyMiddleware({ app });
};

main();

const port = process.env.PORT || 4000;

app.listen({ port }, () => {
  console.log(`Apollo Server on  http://localhost:${port}`);
});

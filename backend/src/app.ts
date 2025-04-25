import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { ApolloServer } from '@apollo/server';
import { koaMiddleware } from '@as-integrations/koa';
import helloRoutes from './routes/hello';
import authRoutes from './routes/auth';
import healthRoutes from './routes/health';
import { typeDefs } from './graphql/schema/schema';
import { resolvers } from './graphql/resolvers/resolvers';
import { createContext, MyContext } from './graphql/context';

const app = new Koa();

// Middleware
app.use(bodyParser());

// Routes
app.use(helloRoutes.routes()).use(helloRoutes.allowedMethods());
app.use(authRoutes.routes()).use(authRoutes.allowedMethods());
app.use(healthRoutes.routes()).use(healthRoutes.allowedMethods());

const PORT = process.env.PORT || 3000;

async function startServer() {
  // Apollo Server setup
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
  });

  // Start Apollo Server
  await server.start();

  // Apply Apollo middleware
  app.use(
    koaMiddleware(server, {
      context: createContext,
    })
  );

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});

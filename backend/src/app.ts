import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helloRoutes from './routes/hello';

const app = new Koa();

// Middleware
app.use(bodyParser());

// Routes
app.use(helloRoutes.routes()).use(helloRoutes.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

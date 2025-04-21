import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helloRoutes from './routes/hello';
import authRoutes from './routes/auth';

const app = new Koa();

// Middleware
app.use(bodyParser());

// Routes
app.use(helloRoutes.routes()).use(helloRoutes.allowedMethods());
app.use(authRoutes.routes()).use(authRoutes.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

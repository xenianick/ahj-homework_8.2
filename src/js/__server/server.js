const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');
const WS = require('ws');
const uuid = require('uuid');

const app = new Koa();
const router = new Router();

app.use(koaBody({
  urlencoded: true,
  multipart: true,
  json: true,
}));

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());

const wsServer = new WS.Server({ server });

const usersNames = [];
const usersMessages = [];

router.get('/', async (ctx) => {
  ctx.response.body = usersMessages;
});

app.use(async (ctx, next) => {
  const origin = ctx.request.get('Origin');
  if (!origin) {
    await next();
    return;
  }
  const headers = { 'Access-Control-Allow-Origin': '*' };
  if (ctx.request.method !== 'OPTIONS') {
    ctx.response.set({ ...headers });
    try {
      await next();
      return;
    } catch (e) {
      e.headers = { ...e.headers, ...headers };
      throw e;
    }
  }
  if (ctx.request.get('Access-Control-Request-Method')) {
    ctx.response.set({
      ...headers,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
    });
    if (ctx.request.get('Access-Control-Request-Headers')) {
      ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Allow-Request-Headers'));
    }
    ctx.response.status = 204;
  }
});

let id;

router.post('/', async (ctx) => {
  const isSpareUserName = usersNames.findIndex((item) => item === ctx.request.body.name);
  if (isSpareUserName === -1) {
    id = uuid.v4();
    usersNames.push({ name: ctx.request.body.name, id });
    ctx.response.status = 204;
  } else {
    ctx.response.status = 205;
  }
});

const clients = [];

wsServer.on('connection', (ws) => {
  clients.push({ ws, id });
  const errCallback = (err) => {
    if (err) {
      console.log(err);
    }
  };
  const interval = setInterval(() => {
    const usersNamesJson = JSON.stringify(usersNames);
    ws.send(usersNamesJson);
  }, 1000);
  ws.on('message', (msg) => {
    usersMessages.push(msg);
    clients
      .filter((client) => client.ws !== ws && client.ws.readyState === WS.OPEN)
      .forEach((client) => client.ws.send(msg, errCallback));
  });
  ws.on('close', () => {
    const elToDel = clients.find((client) => client.ws === ws);
    const elToDelIndex = clients.indexOf(elToDel);
    clients.splice(elToDelIndex, 1);
    const userNameIndex = usersNames.findIndex((name) => name.id === elToDel.id);
    usersNames.splice(userNameIndex, 1);
    clearInterval(interval);
  });
});

app.use(router.routes());
app.use(router.allowedMethods());

server.listen(port);

# dashboard

## Prerequisite

### Redis

```
redis-cli> config set notify-keyspace-events 'K$'
```
See more at [redis configuration](http://redis.io/topics/notifications#configuration).

## Develop

### Server
```bash
cd server
NODE_LOG_LEVEL=debug node app.js
```

### Client
```bash
cd client
npm run server
```

# dashboard

## Prerequisite

### Redis

```
redis-cli> config set notify-keyspace-events 'K$'
```
[redis configuration](http://redis.io/topics/notifications#configuration)

## Develop

### Server
```bash
cd server
NODE_LOE_LEVEL=debug node app.js
```

### Client
```bash
cd client
npm run server
```

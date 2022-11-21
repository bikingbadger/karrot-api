## Karrot API

## Setup Development Environment

### Create database

```mongodb
use yamadori

db.createUser(
{	user: "karrotadmin",
	pwd: "karrot123",
	roles:[{role: "userAdminAnyDatabase" , db:"admin"}]
});
```

### Create Docker Container

```bash
cd yamadori-api
docker network create karrot-net
docker-compose up --build -d mongodb
```
### Rebuild Image

```bash
docker-compose up --build
```
mongodb://karrotadmin:karrot123@karrot-mongodb:27018/karrotdb?authMechanism=DEFAULT&retryWrites=true&w=majority
mongodb://karrotadmin:karrot123@localhost:27018/karrotdb?authMechanism=DEFAULT






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
docker build -t karrot-api .
docker run -dp 3000:3000 --name="karrotapi" -h 127.0.0.1 karrot-api
```





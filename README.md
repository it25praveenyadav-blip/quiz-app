# Quiz App

## Local run

The app works locally with an in-memory H2 database by default, so you do not need a MySQL install for development. If you want to use MySQL or another database, set the matching `SPRING_DATASOURCE_*` environment variables before starting the app.

```powershell
$env:ADMIN_PASSWORD = "admin123"
.\mvnw.cmd spring-boot:run
```

The app listens on port `8083` by default. Open the user pages at `http://localhost:8083/user/signin.html` and the admin panel at `http://localhost:8083/admin/index.html`. If port 8083 is already busy, stop the other app instance or choose another port:

```powershell
$env:PORT = "9090"
.\mvnw.cmd spring-boot:run
```

Open both pages on the same port so they use the same app instance and database.

## Render deploy

The Render deployment profile uses PostgreSQL in `application-render.properties` and expects `DB_*` and `ADMIN_PASSWORD` environment variables.

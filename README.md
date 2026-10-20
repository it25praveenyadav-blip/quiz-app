# Quiz App

## Local run

The app works locally with an in-memory H2 database by default, so you do not need a MySQL install for development. If you want to use MySQL or another database, set the matching `SPRING_DATASOURCE_*` environment variables before starting the app.

```powershell
$env:ADMIN_PASSWORD = "admin123"
.
\mvnw.cmd spring-boot:run
```

The app listens on `http://localhost:8081` by default to avoid port conflicts with other local services. If 8081 is already busy, start it with a different port:

```powershell
$env:PORT = "9090"
.
\mvnw.cmd spring-boot:run
```

Then open `/admin/index.html` on that same port and sign in with the configured admin password.

## Render deploy

The Render deployment profile uses PostgreSQL in `application-render.properties` and expects `DB_*` and `ADMIN_PASSWORD` environment variables.

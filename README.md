# Quiz App

## Database-backed questions

The app uses MySQL for local development. Install and start MySQL Server, then set credentials in the PowerShell terminal before running the app:

```powershell
$env:SPRING_DATASOURCE_USERNAME = "root"
$env:SPRING_DATASOURCE_PASSWORD = "your-MySQL-password"
.\mvnw.cmd spring-boot:run
```

By default, the app connects to `localhost:3306` and creates the `quiz_app` database if the MySQL user has permission. To use another host or database, set `SPRING_DATASOURCE_URL`; credentials can be supplied with `SPRING_DATASOURCE_USERNAME` and `SPRING_DATASOURCE_PASSWORD`. The app uses `ddl-auto=update` to create/update tables. The in-memory H2 database is only used by tests.

Run the application with `.\mvnw.cmd spring-boot:run` and open `/admin/index.html` on the same server. The development admin password is `PASSWORD123`. Set the `ADMIN_PASSWORD` environment variable to use a different password before deployment.

# Quiz App

## Database-backed questions

The admin panel stores custom questions in the file-backed H2 database (`quizdb.mv.db`) in the application's working directory. The quiz page loads saved questions from the backend; local restarts do not clear them.

Run the application with `.\mvnw.cmd spring-boot:run` and open `/admin/index.html` on the same server. The development admin password is `PASSWORD123`. Set the `ADMIN_PASSWORD` environment variable to use a different password before deployment.

For deployments that need data to survive redeploys, configure persistent storage and set `SPRING_DATASOURCE_URL` to an H2 database location on that storage.

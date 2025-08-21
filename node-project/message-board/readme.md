1. After create the database in koyeb, there are info you can use to set in the application's env value to let the application to use the specified DB.

2. DB connection mentioned in the koyeb DB, the node part should have ssl setting.
    After a bit search, set the ssl like below in the postgres Pool:
        ssl: {
            rejectUnauthorized: false   // allow self-signed certs
        }

3. The express-validator needs to be mentioned that the postNewMessage in controller is array, which passed into the route as a middleware, express auto flatten it and pass the value to the next middleware automatically.

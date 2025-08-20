Silly error:

1. Not adding the require('dotenv').config in the first line.

I found the process.env.DATABASE_PASSWORD cannot be read, always told me that the password is not correct.
Actually, require the router --> require the controller --> require the db --> require the pool --> new Pool will read the DATABASE_PASSWORD, at that moment the dotevn has not been configed, so move the require('dotenv').config() up to the first line solve the problem.

2. Running the PostgresSQL filter query, but not return the result.rows, print the value in the controller always undefined.

First is the replacement part took me a while [`%${searchValue}%`], then the printed controller value always undefined, made me thinking that the replacement is not correct, but actually after fixing the replacement part, I forgot to return the result.rows.
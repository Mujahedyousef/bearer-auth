# bearer-auth
auth-server is able to allow a user to create an account as well as to handle Basic Authentication (user provides a username + password). When a “good” login happens, the user is considered to be “authenticated” and our auth-server generates a JWT signed “Token” which is returned to the application  We will now be using that Token to re-authenticate users to shield access to any route that requires a valid login to access.

## XML
![xml](/Auth/image/XML.jpg)
|Name|Link|
|----|----|
|Actions|[Actions](https://github.com/Mujahedyousef/bearer-auth/actions)|
|PR|[PR](https://github.com/Mujahedyousef/bearer-auth/pull/2)|
|Heroku|[Heroku](https://mujahed-bearer-auth.herokuapp.com/)|

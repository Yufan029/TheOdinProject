1. Store the session info into the database, using connect-pg-simple.

2. should install 'express-session', wrongly installed the 'passport-session'.

3. For passport username & password authentication, custom fields trick me a while. use email field to authenticate.
const customFields = {
            usernameField: "email",
            passwordField: "password"
        },

4. custom middleware for res.locals.currentUser = req.user really handy

5. captcha really nice to have, image send the get request to /captcha then the server send back the create captcha data, save the text into session.

6. dynamically add the class in ejs.
   <p <%- currentUser && (currentUser.ismember || currentUser.isadmin) ? '' : 'class="blur-content"' %>>blur message.</p>
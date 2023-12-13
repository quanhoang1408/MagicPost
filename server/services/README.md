The services folder can hold complex business logic that isn't directly tied to a specific endpoint.
=> No need request and response objects.

This helps keep controllers clean and focused.
For example, if you have a controller that handles user registration, you might have a service that handles sending the confirmation email.
This way, the controller can focus on the registration process and the service can focus on sending the email. 
This also makes it easier to test the service logic without having to mock the request and response objects.

Might contain generate a JWT token, send an email, or interact with a database.
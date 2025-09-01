#NOTES FOR CREATING TINDER-CLONE BE

1. Initialize node js project.

npm init.
It will create a package.json file

2. Install express. 
npm install express


What is the difference between ^, ~, in dependencies. 
14.1.0 -> Major, minor, patch.  


package.lock will tell the exact version that we are using in dependencies. 

npm install nodemon -> This is for reload automatically without killing the server. 

---

Episode 3: 

- Create a repository
- Initialize the repository
- Differences between node_modules, package.json, package-lock.json
- Understand the difference between caret, tilde, normal in package.json dependencies. 
- What are dependencies and dev dependecies. 
- How to install globally ( For example : nodemon )
- Install express js
- Create a server
- Listen to port 8080
- Write request handlers using app.use() for /test, /hello
- Install nodemon and update dev and build scripts in package.json


---

Episode 4: 

- Create .gitignore file and add node_modules in .gitignore.
- Initialize git repository and create a remote repository. 
- Push the existing code to github. 

- Sequence of code matters if you add middlewares like .use()
- Order of route matters, please be careful otherwise your routes will not behave as expected. 
- HTTP Methods 
    1. API Calls from postman.
-Install postman, create workspace, add collections with test api calls. 
- Why http://localhost:7777/test/hello ( GET ) call and ( POST ) call gives the same data.

- How to handle different API methods in express. 
- app.use("/test") => will map all the http methods that are calling /test/
- app.get("/test") => This will only match get api call to /test/ route.

- Advanced route handling with 
- using ?, *, + 
- ? => optional.
- * => anything can be written.
- + => kind of regex. 
- We can also use regex also here. 
- These advanced route handling is not generally used in real time, mean time you can ignore to learn.

- How to get the dynamic params in route. 
- req.query will give the params.


- How to handle dynamic routes => /user/:userId
- /user/707 => How to get userId => req.params













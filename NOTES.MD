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


Episode 5 : 

- If we don't send res.send() in route handler, request will just hang and it will just timed out. 
- One route can also have multiple route handlers.
- app.use("/user", () => {console.log('route handler 1')}, () => {console.log('route handler 2)})
    - If route handler1 has res.send(), it won't run the next route handler.
    - If route handler1 doesn't sending res.send(), and route handler2 has res.send(), still it doesn't send anything in the response. it will just hang. 
    - To work like that, we need to use 'next' function. 
    - next() needs to be called in first route handler. so that next() will ask to execute the route handler2


- Now, lets say route handler have res.send() and next(), and route handler 2 have res.send()
- What will it do ?? 
    Now res.send() in route handler1 will work and next() will get called which will go to the route handler2 and here there it will throw an error, saying it is trying to send another response with the same url.
- Cannot set the headers after they are sent to the client. 



- route handler1 have 
    next();
    res.send('Response1);

- route handler2 have 
    res.send('Response2');

Here it seems, Response2 comes, and it will throw an error because client already send one response and it wont send again. 




- What will happen if next() is called in last route handler ?? 
    It will throw an error saying, cannot find /GET because, there is no next route handler. 


- app.use("/user", [() => {}, () => {}]) -> We can pass array of functions. 
- We can mix and match also, like few in array and other route handlers are normally. 


- app.use("/route", rh1, rh2, rh3)
- app.use("/route", [rh1, rh2, rh3])
- app.use("/route", rh1, [rh2, rh3])



- app.get("/user", routeHandler1);
- app.get("/user", routeHandler2);

if routeHandler2 has res.send() it will send the response after executing the routerHandler1 logic.


* Why do we need multiple route handlers if you can do things in one place. 
- Because of middlewares. 


Ideally we should name only main thing as route handler, other than those we need to call as middle ware. 

- route will go through chain of middle wares and sends some response. 

- When we make an api call it will go through a middle ware chain and it will go to request handler. 

- What is middlewares.
- How expressjs handles request handlers with middlewares.

- What is the difference between app.use() and app.all()
- Why do we need middlewares. 
- Write a dummy authentication middleware for admin. 
- Write a dummy authentication middleware for user routes except /user/sign-up. 
- We can also use third party middlewares. 


Error Handlers : 

1. In middle ware function if you are passing two parameters express will treat as req and res. 
2. If you are passing three parameters it will treat as req, res, next
3. If you pass four parameters it will pass as err, req, res, next 
4. Learn how to handle syncrhonous errors and asynchronous errors.


5. Write a common error handler at the end of the routes to catch some errors if missed in catch blocks.



Episode 6: ( Database, Schema, and Mongoose)


- We should do app.listen() once database is connected only. 
- Create a free cluster in mongodb application. 
- Connect mongodburi to the application. 
- Make sure to listen to port after mongodb connection is established.
- Create a User Schema and User Model. 
- What will happen if we send _id manually ?? 
    It will take it as mongo object id only, but don't play with _id. Let mongodb handle it. 

- What is __v in mongo document ?
    It is version of each document, when we change any document it will update the version. 

- Create a sign-up api to add users to database. 
- Try to push documents using api call and push dummy data using .save() on mongoose model. 
- Always wrap in try catch block when you are doing db operations.



Episode 7 : 

- What is the difference json object and javascript object.
- JSON object needs key as a string. This is one difference. 
- JSON object can't take comma(,) at the end of the object. 

- When postman or broswer sends a request it will be in readableStream
- request sent by postman and browser will send in json format. To read the json data we need a middleware. 

- Add the express.json() middleware which helps to convert json object to javascript object which helps to create the newUser instance of User model and save it in users collection.

- User.findOne({emailId: "krishna@gmail.com"}) - It will return only single document. 
- Mongodb functions. 
    1. find()
    2. findById(userId)
    3. findByIdAndDelete(userId)
    4. findByIdAndUpdate(userId, updatedData)
        If you are passing a new key which is not in key, mongo doesn't add that key in the db. 
        Mongo will handle interally, any key apart from the schema will be ignored.


Episode 8 : 

- Schema Validations. 
    1. default: 
    2. required:
    3. unique:
    4. validate:
    5. trim: 
    6. lowercase:
    7. minLength:
    8. maxLength:
    9. min: ( This is for Number )
    10. max: ( This is for Number )


- By Default, Validate method in schema will only get called when new document in collection is getting created. If we try to update a document. It wont throw the error.

- We need to add runValidators: true in findByIdAndUpdate options.
- Timestamps in mongodb schema. 


API level validations.

* Like we dont want to give an option to udpate the emailId in user schema.
* We should allow users to update only certain fields of the user schema.

- use validator.js

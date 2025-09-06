Tinder API List

authRouter
POST - /signup
POST - /login
POST - /logout

profileRouter
GET - /profile ( View profile information )
PATCH - /profile ( Updating the profile )
PATCH - /profile/update-password ( Updating the password)

connectionRequestRouter
POST - /request/send/interested/${userId}
POST - /request/send/ignored/${userId}
POST - /request/review/accepted/${requestId}
POST - /request/review/rejected/${requestId}


userRouter
GET - /user/connections ( List of connections )
GET - /user/requests/received 
GET - /user/feed



Status : 

Profile can be ignored/interested. 
Tinder calls ignored as pass, interested as like. 


After interested -> status can be move to accepted, rejected. 
    Authors: Gunnar Marteinsson & Sigurdur Mar Atlason    

# punchcard.com
this is a simple app where both companies and their users can register, and users can then issue a "punch". When they've collected enough punches (usually 10), they will get a discount at the company (perhaps a free meal at a restaurant after buying 10 meals, or 20% discount of their next purchase at some shop etc.).

##Setup instructions
**1)** clone the project: ```git clone https://github.com/sigurdura13/punchcard.com.git```

**2)** go into repo folder ```cd punchcard.com```

**3)** run ```npm install```

**4)** run ```node punchcard.js```

**5)** curl away!


##Supported API references
**/api/companies - GET**
*Returns a list of all registered companies*

**/api/companies - POST**
*Adds a new company. The required properties are "name" and "punchCount", indicating how many punches a user needs to collect in order to get a discount.*

**/api/companies/{id} - GET**
*Returns a given company by id.*

**/api/users/ - GET**
*Returns a list of all users.*

**/api/users/ - POST**
*Adds a new user to the system. The following properties must be specified: name, email.*

**/api/users/{id}/punches - GET**
*Returns a list of all punches registered for the given user. Each punch contains information about what company it was added to, and when it was created. It should be possible to filter the list by adding a "?company={id}" to the query.*

**/api/users/{id}/punches - POST**
*Adds a new punch to the user account. The only information needed is the id of the company.*

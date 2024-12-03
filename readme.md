### 0. Usage 

The url is validated on this format: http://www.example.com
**PROTOCOLS MUST BE PRESENT**

Commands:

1) Install dependencies:    npm install
2) Test:                    npm test
3) Start Server:            npm start
4) Start Dev:               npm run dev

//GET -> locahost:8000/<<MINIFIED_URL>>
//POST -> lodalhost:8000 (content-type: appliation/json) (body: {'url': 'https://www.linkedin.com'})


### 1. Minification URL Algorithm: 

1) Use the first/last 6 letters of existing hashing algorithms (MD5, Bcrypt, SHA256) as minified url candidate, by putting original url inside.
   
2) Check Map/Dictionary Data structure if key already exists

3) If key does not exist (no collision), that is our key and we save it in our map-like data structure.
   
4) If key exists, use following to resolve collision:

5) If the value (Original Url) is the same, we can just return the existing key 

6) Else we add the current time stamp to it and start from step 1 until there is not collision on step (3)

### 2. Limitations:

1) The data is huge and our in-memory storage(RAM) is low, we can round-robin delete it based on the timestamp.

2) The in memory storage is low so we can use a horizontally scalable document database, mongodb, slower, but we can scale it easily

3) The case where we run out of 6 alphanumeric & reserved URL letters, 


### 3. Minified Url Properties:

Alphanumeric (26+26+10)^6. Could use ~, ., _, - for a 4^6 time more combination


### 4. Approaches Considered

1) Built-in btoa(). Issue is that it contains redundancy of www. or .com. in its first & last code. so the uniqueness pool becomes small

2) Hashing functions The uuid library is a good option. 

3) Rely on mongodb unique id generator (last 6 digits)

4) Another is to use timestamps last digits.



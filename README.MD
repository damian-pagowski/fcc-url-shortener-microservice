# Description
API Project: URL shortener microservice
# Running local

## .env file
create .env file in project root directory.
In .env file specify port number. For example:
```
PORT=3050
```
## installing project
```
npm i
npm start
```
Application requires MongoDB server access to persist and load data. 
System variavles must be defined in .env file. Example below:
```
PORT=3050
DB_SERVER_ADDR=127.0.0.1
DB_PORT=27017
DB_NAME=urls
```
# Example Usage
## Creating Shortened URL
```
POST /api/shorturl/new
```
with parameter:
```
url = "http://stackoverflow.com"
```
will return 

```
{
    "original_url": "https://stackoverflow.com",
    "short_url": 1
}
```
## Using Shortened URL

```
GET /api/shorturl/1
```
will redirect to: https://stackoverflow.com

## Invalid URL

If invalid URL was provided (original or shortened) service will respond with
```
{"error":"invalid URL"}
```
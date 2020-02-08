## Install nodejs and npm using apt
```
#> sudo apt install nodejs npm
```

## Install node dependencies
```
#> npm i
```

## Set up the sqlite3 database
```
#> npm run initdb
```

## To run the server
```
#> node server.js --debug
```

## To test the server
```
#> curl http://localhost:8081/files
#> curl -X POST -H "Content-Type: application/json" -d @example.json http://localhost:8081/files
```

# API Documentation
## To retrieve all entries in the Skynet link database (GET request)
```
#> curl http://localhost:8081/files
```
Sample response:
```
[
  {
    "fileLink": "AABZjrS1ZT6Q2K-CcXKKE78M2j5KEJSEaCltcNi_wPE3OA",
    "fileName": "vivaldi-stable_2.10.1745.23-1_amd64.deb",
    "fileType": "deb",
    "fileDescription": "Vivaldi Stable Web Browser for Debian based Systems."
  },
  {
    "fileLink": "XADyBtepOn4N9_cILGYD5issx269K-uRdFBye6FRVia2XQ",
    "fileName": "2014 Sia Whitepaper",
    "fileType": "PDF",
    "fileDescription": "The 2014 Sia whitepaper written by Nebulous"
  }
]
```

## To retrieve a single entry with all the details (GET request)
```
#> curl http://localhost:8081/files?fileLink=AABZjrS1ZT6Q2K-CcXKKE78M2j5KEJSEaCltcNi_wPE3OA
```
Sample response:
```
{
  "fileLink": "AABZjrS1ZT6Q2K-CcXKKE78M2j5KEJSEaCltcNi_wPE3OA",
  "fileName": "vivaldi-stable_2.10.1745.23-1_amd64.deb",
  "fileType": "deb",
  "fileCategory": "application",
  "fileUploadedTimestamp": 1581111921,
  "fileUploadedUser": "anonymous",
  "fileDescription": "Vivaldi Stable Web Browser for Debian based Systems.",
  "fileRating": null,
  "fileSize": 64724924
}
```

## To delete a single entry (GET request)
```
#> curl http://localhost:8081/files/delete?fileLink=AABZjrS1ZT6Q2K-CcXKKE78M2j5KEJSEaCltcNi_wPE3OA
```
Sample response:
```
No JSON response, but a 200 status should be returned.
```

## To add a single new entry (POST request)
```
#> curl -X POST -H "Content-Type: application/json" -d @example1.json http://localhost:8081/files
```
Sample data in `example1.json`
```
{
    "fileLink": "XADyBtepOn4N9_cILGYD5issx269K-uRdFBye6FRVia2XQ",
    "fileName": "2014 Sia Whitepaper",
    "fileType": "PDF",
    "fileCategory": "ebook",
    "fileUploadedTimestamp": 1581111845,
    "fileUploadedUser": "anonymous",
    "fileSize": 134568,
    "fileDescription": "The 2014 Sia whitepaper written by Nebulous"
}
```
Sample response:
```
No JSON response, but a 200 status should be returned
```

## To mark a Skynet link as dead (POST request)
```
#> curl -X POST -H "Content-Type: application/json" -d @deadexample.json http://localhost:8081/files/dead
```
Sample data in `deadexample.json`
```
{
    "fileLink": "XADyBtepOn4N9_cILGYD5issx269K-uRdFBye6FRVia2XQ",
    "fileDead": 0
}
```

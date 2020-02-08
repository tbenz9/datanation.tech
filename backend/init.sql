create table FILES ( fileLink TEXT PRIMARY KEY, fileName TEXT, fileType TEXT, fileCategory TEXT, fileUploadedTimestamp INTEGER, fileUploadedUser INTEGER, fileDescription TEXT, fileRating INTEGER, fileDead INTEGER, fileSize INTEGER );
create table COMMENTS ( commentID INTEGER PRIMARY KEY AUTOINCREMENT, fileLink TEXT, commentTimestamp INTEGER, commentUser INTEGER, commentBody TEXT );
create table RATINGS ( ratingsID INTEGER PRIMARY KEY AUTOINCREMENT, fileLink TEXT, rating INTEGER );
create table USERS ( userID INTEGER PRIMARY KEY AUTOINCREMENT, userName TEXT, userPassword TEXT, userAnonymous INTEGER, userRating INTEGER );

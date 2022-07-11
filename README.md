# Photo-API
A [REST API](https://photo-app.heroku.app)
with a mySQL-database for storing photos and albums with authentication settings and other validation rules

## Using
- NodeJS
- mySQL
- JavaScript

## Table of contents
* [Assignment](#assignment)
* [Specification](#specification)
* [Tools](#tools)
* [Screenshot](#screenshot)

## Assignment
Create a simple REST API with a mySQL-database which should function as the backend for a future photo application.

A user should only be able to see their own albums and photos and only be able to add their own photos in their own albums.


## Specification
#### Users
- register new users

#### Photos
- a user should be able to list it´s photos
- create a new photo
- uppdate a photo

#### Album
- a user should be able to list it´s albums
- create new album
- uppdate an album

#### Album > Foton
- list photos in an album
- add photos to an album

#### The photo app MUST:
- Follow REST
- Be MVC structured
- Use Bookshelf as ORM
- Use autentication through HTTP Basic (if not opting for the VG grade where you should use JWT-tokens)
- Hashing/salting of password through bcrypt
- Validation of all data a user can send in
- All answers should be wrapped according to the JSend-specification
- All requests and responses shall follow the for every end point given structure
- Error handleing: (for example if the user is trying to add a photo not belonging to the user to an album, or add a photo to an album that does not exist)
- Use correct HTTP-status codes
- Version controlled thorugh git
- Deployed to Heroku
- have semantic code

#### I opted to:
- Use JWT instead of HTTP Basic Auth ( log in to get a JWT-token)
- The user to have the possibility of deleting a photo, including removal of possible links bewteen photo and album
- The user to have the possibility of deleting an album, including removal of possible links bewteen album and photo

#### Time limit
- 1,5 weeks

## Tools
- phpMyAdmin
- VS Code
- Postman
- Heroku

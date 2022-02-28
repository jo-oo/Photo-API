# Photo-app
A REST API with a mySQL-database for storing photos and albums with authentication settings and other validation rules


NodeJS
mySQL
JavaScript

Table of contents
Assignment
Tools
Screenshot
Assignment
Create a simple REST API with a mySQL-database whick should function as the backend for a future photo application.

A user should only be able to see their own albums and photos and only be able to add their own photos in their own albums.


The photo app MUST:
Följa REST
MVC-strukturerad
Använda Bookshelf som ORM
Autentisering via HTTP Basic (om man ej gör VG-uppgiften att använda JWT-tokens)
Hashing/salting av lösenord via bcrypt
Validering av samtlig data en användare kan skicka in
Alla svar ska vara wrappade enligt JSend-specifikationen
Alla förfrågningar och svar ska följa för varje ändpunkt angiven struktur.
Felhantering (t.ex. om användaren försöker komma åt en annan användares album eller foton, eller om användaren försöker lägga till ett foto som inte tillhör användaren i ett album, eller lägga till ett foto i ett album som inte finns)
Använda korrekta HTTP-statuskoder
Självklart vara versionshanterad med hjälp av git (och inte bara en enda monster-commit)
All källkod vara korrekt indenterad (så klart!)////have semantic code..
Deploy:ad till Heroku
have semantic code


Specification

-Användare-
registrera nya användare

-Foton-
lista sina foton
skapa ett nytt foto
uppdatera ett foto

-Album-
lista sina album
skapa nya album
uppdatera ett album

-Album > Foton-
lista foton i ett album
lägga till foto i ett album

I opted to:
Use JWT instead of HTTP Basic Auth ( logga in för att få en JWT-token)
The user to have the possibility of deleting a photo, including removal of possible links bewteen photo and album
The user to have the possibility of deleting an album, including removal of possible links bewteen album and photo
The user to have the possibility of adding multiple photos simultaneously to one album
The user to have the possibility of removing a photo from an album, including removal of possible links bewteen photo and album


Time limit
1,5 weeks
Tools
VS Code
Screenshot


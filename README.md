# Malcolm Laing - 05/08/2019

## Installation

`yarn`

`yarn start` // starts both client and api server

`yarn start-client` // starts client
`yarn start-api` // starts api

`yarn test` // runs the (client side) tests

## Security

The app only accepts files of type `png` and `jpg`. There are two ways of determining a files mimetype on the client side. The first way is to look at the files

## Improvements

The app does _not_ upload files to the API. The API only stores JSON data.

To remedy this, I could run the library `json-server` together with an express server, and add the file uploading there. The files would be uploaded using FormData.

Another option would be to base 64 incode the files and store their value as a string in `db.json`. I didn't want to do this because of the size it would take.

The integration testing is incomplete.

There are integration tests for viewing the list, and for deleting a document.

Tests are mising for creating a document, and for searching for documents.

I wanted to write a test for searching for documents. However, my implementation of a debounced search value made this difficult, and I was not able to solve this in time.

## Libraries

I used the library [axios](https://github.com/axios/axios) for making HTTP requests. I chose to use this instead of fetch because it made it easier to mock, and made it easier to handle errors.

I used the library [testing-library/react](https://github.com/testing-library/react-testing-library) for writing tests.

## API

The mock API is created with [json-server](https://github.com/typicode/json-server)

It runs by default on `http://localhost:3001`

Use the command `yarn start` to start the API from this subfolder, or `yarn start-api` to start it from the project root.

A brief explanation of the endpoints follows

### GET /document

This returns an array of all available documents. You can also search as follows: `/document?q=searchTerm`.

### DELETE /document/:id.

What it does: deletes a document.
What it returns: empty object

#### POST /document

What it does: creates a document.
What it accepts: JSON representation of the document.

## Other notes

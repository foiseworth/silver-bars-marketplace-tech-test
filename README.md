# Gruffalo Silver Bars
#### by Andrew Herrington

## Installation
`npm install`

## Running
`npm start`

## Endpoints

- `/summary [GET]` - get a summary of orders
- `/cancel [POST] {id: [STRING]}` - cancel an order via its id
- `/register [POST] {userId: [STRING], orderQuantity: [NUMBER], pricePerKg: [NUMBER], orderType: [STRING BUY|SELL]}` - register a new order

## Developing
- To run tests: `npm test`
- To run linter: `npm run lint`

## Further development

Some of the things that I would do to further improve this solution:

- Add integration test using [supertest](https://github.com/visionmedia/supertest) to test index.js file
- Performance of summary api endpoint is poor because it sorts/groups/order on each request. Would add caching or memoization to improve.
- Add more detailed errors to api responses
- Return id of created order in API response when calling register
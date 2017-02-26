# Gruffalo Silver Bars
#### by Andrew Herrington

N.B. You will see that I have made use of [Ramda](http://ramdajs.com/) a functional javascript library. Whilst I'm more than happy to write more procedural code, I have written this project in a more functional style. Ramda is a powerful library that can be slightly obtuse if you have not used it before. However it allows you to write expressive and concise code.

## Requirements
- Node v7.6.0

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
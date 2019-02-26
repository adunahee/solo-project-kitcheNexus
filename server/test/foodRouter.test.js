const app = require('../server');
const testServer = require('supertest');

//tests get route for edamam api autocomplete
test('should return 403 if user unauthenticated', () => {
    return testServer(app).get('/api/food/searchString').then((res) => {
        return expect(res.statusCode).toBe(403);
    })
})
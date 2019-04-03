const app = require('../server');
const testServer = require('supertest');

// gets token before testing
// let token;
// const body = {
//     username: process.env.TEST_USER,
//     password: process.env.TEST_PW,
// }
// const config = {
//     headers: { 'Content-Type': 'application/json' },
//     withCredentials: true,
// }

// beforeAll((done) => {
//     testServer(app)
//         .post('/api/user/login')
//         .send(
//             body,
//             config)
//         .end((err, response) => {
//             token = response.body.token;
//             done();
//         });
// });

//tests get route for edamam api autocomplete
describe('/api/food GET route', () => {
    //protected route requires token
    test('should return 403 if user unauthenticated', () => {
        return testServer(app)
            .get('/api/food/searchString')
            .then((res) => {
                return expect(res.statusCode).toBe(403);
            });
    });

    //test that verified user gets back autocomplete results from edamam api
    // test('should return an array of 3 when sent "tac" string', () => {
    //     return testServer(app)
    //         .get('/api/food/tac')
    //         .set('Authorization', `Bearer ${token}`)
    //         .then((res) => {
    //             // expect(res.data.length).toBe(3);
    //             // expect(res.data).toEqual(['tac', 'taco', 'tacos']);
    //             expect(res.statusCode).toBe(200);
    //             expect(res.type).toBe('application/json');
    //         });
    // });
});

//tests for login router
describe('/api/user post route for login', () => {
    test('valid credentials should log user in', () => {
        const loginInfo = {
            username: process.env.TEST_USER,
            password: process.env.TEST_PW,
        }
        return (testServer(app)
            .post('/api/user/login')
            .send(loginInfo)
            .then((response) => {
                // expect(response.body.token).toBe('asdf');
                return expect(response.statusCode).toBe(200);
            }));
    });
    //invalid credentials should not log user in
    test('invalid credentials should prevent user from recieving a token', () => {
        const loginInfo = {
            username: 'S0me gibberish',
            password: 'D3f not the r1ght pw',
        };
        return (testServer(app)
            .post('/api/user/login')
            .send(loginInfo)
            .then((res) => {
                expect(res.body.token).toBe(undefined);
                return expect(res.statusCode).toBe(401);
            }));
    });
});

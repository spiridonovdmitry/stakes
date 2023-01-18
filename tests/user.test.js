const app = require( '../index.js')
const request = require('supertest')
const mongoose = require("mongoose")




describe("тест1", () => {
    describe("регистрация", () => {
        test("Ожидается статус 200", async () => {
            const response = await request(app).post("/api/user/registration").send({
                "login" : "qqq",
                "password" : "pass",
                "email": "qqq@email.ru",
                "role" : 2
            });
            expect(response.statusCode).toBe(200);
        })
    })
})
var ntoken

describe("тест2", () => {
    describe("Логин", () => {
        test("Ожидается статус 200", async () => {
            const response = await request(app).post("/api/user/login").send({
                "login" : "qqq",
                "password" : "pass",
            });
            expect(response.statusCode).toBe(200);
            var {token} = response.body
            ntoken = token
        })
    })
})


describe("тест3", () => {
    describe("Сделать ставку", () => {
        test("Ожидается статус 200", async () => {
            const response = await request(app).post("/api/user/makestake/").send({
                "userId" : "34",
                "stakeId" : "1",
                "resultId": "9",
                "sum": 100
            }).set("Authorization", ntoken);
            
            expect(response.statusCode).toBe(200);
        })
    })
})

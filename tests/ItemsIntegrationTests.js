require("should");

const request = require("supertest");
const mongoose = require("mongoose");

process.env.ENV = "Tests";

const app = require("../app.js");

const Item = mongoose.model("Item");
const agent = request.agent(app);

describe("Items CRUD test", () => {
  it("should allow a item to be posted and return _id", done => {
    const itemsPost = {
      itemName: "Post Item",
      itemDescription: "Can you post it",
      quality: "A*"
    };

    agent
      .post("/api/items")
      .send(itemsPost)
      .expect(200)
      .end((err, results) => {
        console.log(results);
        //results.body.should.not.have.property("_id");
        results.body.should.have.property("_id");
        done();
      });
  });

  afterEach(done => {
    Item.deleteMany({}).exec();
    done();
  });
});

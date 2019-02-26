const should = require("should");
const sinon = require("sinon");
const itemsController = require("../controllers/itemsController");

// BDD unit test

describe("Items Controller Tests:", () => {
  describe("POST", () => {
    it("should not allow a empty item name on POST", () => {
        // mock item 
        const Items = function (item) { this.save = () => {}};

        const req = {
            body: {
                itemDescription: "Test Metal part"
            }
        };

        const res = {
            //Spy function that will keep track of whats called
            status: sinon.spy(),
            send: sinon.spy(),
            json: sinon.spy()
        };

        const controller = itemsController(Items);
        controller.post(req,res);

        res.status.calledWith(400).should.equal(true, `Bad status ${res.status.args[0][0]}`);
        res.send.calledWith('Items name is required').should.equal(true);
    });
  });
});

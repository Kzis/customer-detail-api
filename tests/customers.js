// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app, { setup } from '../src/server'
let expect = require("chai").expect;

// Configure chai
chai.use(chaiHttp);
chai.should();

let server = null

describe("customers", () => {
    before(async () => {
        server = await setup()
    });

    describe("POST /customers/searchByNextPremiumSummary", () => {

        it("searchByNextPremiumSummary Status : 200", function (done) {

            chai.request(app)
                .post('/customers/searchByNextPremiumSummary')
                .send({
                    headerData: {
                        messageId: "123456789191",
                        sentDateTime: "11-12-2018T11:18:43.131",
                        responseDateTime: "04-01-2019T08:53:35.014"
                    },
                    requestRecord: {
                        partyId: "369"
                    }
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')

                    expect(res.body.responseRecord.paymentList[0].policy_no).to.equal("21777337")
                    expect(res.body.responseRecord.paymentList[0].nextDueDate).to.equal("27/08/2556");

                    // expect(res.body.data.responseRecord.paymentList[1].policy_no).to.equal("37155309")
                    // expect(res.body.data.responseRecord.paymentList[1].premium).to.equal(9900)

                    expect(res.body.responseStatus.errorMessage).to.equal("ดำเนินการเรียบร้อย")

                    done();
                });
        });

        // Test 404 Not Found
        it("searchByNextPremiumSummary Status : 404", function (done) {

            chai.request(app)
                .post('/customers/searchByNextPremiumSummary')
                .send({
                    headerData: {
                        messageId: "123456789191",
                        sentDateTime: "11-12-2018T11:18:43.131",
                        responseDateTime: "04-01-2019T08:53:35.014"
                    },
                    requestRecord: {
                        partyId: "XXXX"
                    }
                })
                .end((err, res) => {

                    res.body.should.be.a('object');
                    expect(res.body.responseStatus.errorCode).to.equal(404)
                    expect(res.body.responseStatus.errorMessage).to.equal("ไม่พบข้อมูลที่ต้องการในระบบ")

                    done();
                });
        });

        //Test Error
        it("searchByNextPremiumSummary Status : 500", function (done) {

            chai.request(app)
                .post('/customers/searchByNextPremiumSummary')
                .send({
                    headerData: {
                        messageId: "",
                        sentDateTime: "",
                        responseDateTime: ""
                    }
                })
                .end((err, res) => {

                    res.body.should.be.a('object')
                    expect(res.body.responseStatus.errorCode).to.equal(500)
                    expect(res.body.responseStatus.errorMessage).to.equal("ติดต่อผู้ดูแลระบบ")

                    done();
                });
        });

    });

    describe("POST /customers/searchCustomer", () => {

        //Test status 200 policy_no + cert_no
        it("searchCustomer policy_no + cert_no Status : 200", function (done) {

            chai.request(app)
                .post('/customers/searchCustomer')
                .send({
                    headerData: {
                        messageId: "",
                        sentDateTime: "",
                        responseDateTime: ""
                    },
                    requestRecord: {
                        citizenId: "1250200125288"
                    }
                })
                .end((err, res) => {

                    res.body.should.be.a('object')
                    // expect(res.body.data.responseRecord[0].party_id).to.equal("860076")
                    // expect(res.body.data.responseRecord[0].fname_th).to.equal("ธXXX")
                    // expect(res.body.data.responseRecord[0].lname_th).to.equal("วิเชียรรัXXX")
                    expect(res.body.responseStatus.errorCode).to.equal(200)
                    expect(res.body.responseStatus.errorMessage).to.equal("ดำเนินการเรียบร้อย")

                    done();
                });
        });


        //Test status 200 policy_no
        it("searchCustomer policy_no Status : 200", function (done) {

            chai.request(app)
                .post('/customers/searchCustomer')
                .send({
                    headerData: {
                        messageId: "",
                        sentDateTime: "",
                        responseDateTime: ""
                    },
                    requestRecord: {
                        citizenId: "0000650301"
                    }
                })
                .end((err, res) => {

                    res.body.should.be.a('object')
                    // expect(res.body.data.responseRecord[0].party_id).to.equal("8652")
                    // expect(res.body.data.responseRecord[0].fname_th).to.equal("พรทิXXX")
                    // expect(res.body.data.responseRecord[0].lname_th).to.equal("ธนวรรษXXX")
                    expect(res.body.responseStatus.errorCode).to.equal(200)
                    expect(res.body.responseStatus.errorMessage).to.equal("ดำเนินการเรียบร้อย")

                    done();
                });
        });

        //Test 404 Not Found
        it("searchCustomer Status : 404", function (done) {

            chai.request(app)
                .post('/customers/searchCustomer')
                .send({
                    headerData: {
                        messageId: "",
                        sentDateTime: "",
                        responseDateTime: ""
                    },
                    requestRecord: {
                        citizenId: "1250200125288",
                        firstName: "test"
                    }
                })
                .end((err, res) => {

                    res.body.should.be.a('object')
                    expect(res.body.responseStatus.errorCode).to.equal(404)
                    expect(res.body.responseStatus.errorMessage).to.equal("ไม่พบข้อมูลที่ต้องการในระบบ")

                    done();
                });
        });

        // //Test Error
        it("searchCustomer Status : 500", function (done) {

            chai.request(app)
                .post('/customers/searchCustomer')
                .send({
                    headerData: {
                        messageId: "",
                        sentDateTime: "",
                        responseDateTime: ""
                    }
                })
                .end((err, res) => {

                    res.body.should.be.a('object')
                    expect(res.body.responseStatus.errorCode).to.equal(500)
                    expect(res.body.responseStatus.errorMessage).to.equal("ติดต่อผู้ดูแลระบบ")

                    done();
                });
        });

    });

    describe("POST /customers/searchByCustomerRef", () => {
        //Test status 200
        it("searchByCustomerRef Status : 200", function (done) {

            chai.request(app)
                .post('/customers/searchByCustomerRef')
                .send({
                    headerData: {
                        messageId: "123456789191",
                        sentDateTime: "11-12-2018T11:18:43.131",
                        responseDateTime: "04-01-2019T08:53:35.014"
                    },
                    requestRecord: {
                        partyId: "6252195"
                    }
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')

                    // expect(res.body.data.responseRecord[0].party_id).to.equal("6252195")
                    // expect(res.body.data.responseRecord[0].govt_id).to.equal("3460100418717");

                    expect(res.body.responseStatus.errorMessage).to.equal("ดำเนินการเรียบร้อย")

                    done();
                });
        });

        //Test 404 Not Found
        it("searchByCustomerRef Status : 404", function (done) {

            chai.request(app)
                .post('/customers/searchByCustomerRef')
                .send({
                    headerData: {
                        messageId: "",
                        sentDateTime: "",
                        responseDateTime: ""
                    },
                    requestRecord: {
                        partyId: "xxxxxxx"
                    }
                })
                .end((err, res) => {

                    res.body.should.be.a('object')
                    expect(res.body.responseStatus.errorCode).to.equal(404)
                    expect(res.body.responseStatus.errorMessage).to.equal("ไม่พบข้อมูลที่ต้องการในระบบ")

                    done();
                });
        });

        // //Test Error
        it("searchByCustomerRef Status : 500", function (done) {

            chai.request(app)
                .post('/customers/searchByCustomerRef')
                .send({
                    headerData: {
                        messageId: "",
                        sentDateTime: "",
                        responseDateTime: ""
                    }
                })
                .end((err, res) => {

                    res.body.should.be.a('object')
                    expect(res.body.responseStatus.errorCode).to.equal(500)
                    expect(res.body.responseStatus.errorMessage).to.equal("ติดต่อผู้ดูแลระบบ")

                    done();
                });
        });

    });

    describe("POST /customers/calculateBenefitlnfo", () => {

        it("calculateBenefitlnfo-เงินปันผล Status : 200", function (done) {

            chai.request(app)
                .post('/customers/calculateBenefitlnfo')
                .send({
                    headerData: {
                        messageId: "123456789191",
                        sentDateTime: "11-12-2018T11:18:43.131",
                        responseDateTime: "04-01-2019T08:53:35.014"
                    },
                    requestRecord: {
                        partyId: "3167149",
                        policyNo: "25008863",
                        certNo: ""
                    }
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')

                    expect(res.body.responseRecord.partyId).to.equal("3167149")
                    expect(res.body.responseStatus.errorMessage).to.equal("ดำเนินการเรียบร้อย")

                    done();
                });
        });

        it("calculateBenefitlnfo-เงินจ่ายคืน Status : 200", function (done) {

            chai.request(app)
                .post('/customers/calculateBenefitlnfo')
                .send({
                    headerData: {
                        messageId: "123456789191",
                        sentDateTime: "11-12-2018T11:18:43.131",
                        responseDateTime: "04-01-2019T08:53:35.014"
                    },
                    requestRecord: {
                        partyId: "3230770",
                        policyNo: "25008869",
                        certNo: ""
                    }
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')

                    expect(res.body.responseRecord.partyId).to.equal("3230770")
                    expect(res.body.responseStatus.errorMessage).to.equal("ดำเนินการเรียบร้อย")

                    done();
                });
        });
    });

    describe("POST /customers/policyStrategyUnitlink", () => {

        //Test status 200
        it("policyStrategyUnitlink Status : 200", function (done) {

            chai.request(app)
                .post('/customers/policyStrategyUnitlink')
                .send({
                    headerData: {
                        messageId: "123456789191",
                        sentDateTime: "11-12-2018T11:18:43.131",
                        responseDateTime: "04-01-2019T08:53:35.014"
                    },
                    requestRecord: {
                        policyno: "22801869"
                    }
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')

                    expect(res.body.responseRecord.strategyList[0].premiumtype).to.equal("RPP")
                    // expect(res.body.data.responseRecord.strategyList[0].fundid).to.equal("CIMB-PRINCIPAL JEQ")
                    expect(res.body.responseStatus.errorMessage).to.equal("ดำเนินการเรียบร้อย")

                    done();
                });
        });

        //Test 404 Not Found
        it("policyStrategyUnitlink Status : 404", function (done) {

            chai.request(app)
                .post('/customers/policyStrategyUnitlink')
                .send({
                    headerData: {
                        messageId: "123456789191",
                        sentDateTime: "11-12-2018T11:18:43.131",
                        responseDateTime: "04-01-2019T08:53:35.014"
                    },
                    requestRecord: {
                        policyno: "228018691"
                    }
                })
                .end((err, res) => {

                    res.body.should.be.a('object')
                    expect(res.body.responseStatus.errorCode).to.equal(404)
                    expect(res.body.responseStatus.errorMessage).to.equal("ไม่พบข้อมูลที่ต้องการในระบบ")

                    done();
                });
        });

        // //Test Error
        it("policyStrategyUnitlink Status : 500", function (done) {

            chai.request(app)
                .post('/customers/policyStrategyUnitlink')
                .send({
                    headerData: {
                        messageId: "",
                        sentDateTime: "",
                        responseDateTime: ""
                    }
                })
                .end((err, res) => {

                    res.body.should.be.a('object')
                    expect(res.body.responseStatus.errorCode).to.equal(500)
                    expect(res.body.responseStatus.errorMessage).to.equal("ติดต่อผู้ดูแลระบบ")

                    done();
                });
        });

    });

    describe("POST /customers/receiptDetail", () => {
        //Test status 200
        it("receiptDetail Status : 200", function (done) {

            chai.request(app)
                .post('/customers/receiptDetail')
                .send({
                    headerData: {
                        messageId: "123456789191",
                        sentDateTime: "11-12-2018T11:18:43.131",
                        responseDateTime: "04-01-2019T08:53:35.014"
                    },
                    requestRecord: {
                        rpNo: "000520000379",
                        type: "IND",
                        payDate: "2560"
                    }
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')

                    expect(res.body.responseStatus.errorMessage).to.equal("ดำเนินการเรียบร้อย")

                    done();
                });
        });

        //Test 404 Not Found
        it("receiptDetail Status : 404", function (done) {

            chai.request(app)
                .post('/customers/receiptDetail')
                .send({
                    headerData: {
                        messageId: "",
                        sentDateTime: "",
                        responseDateTime: ""
                    },
                    requestRecord: {
                        rpNo: "000520000379",
                        type: "OL",
                        payDate: "2560"
                    }
                })
                .end((err, res) => {

                    res.body.should.be.a('object')
                    expect(res.body.responseStatus.errorCode).to.equal(404)
                    expect(res.body.responseStatus.errorMessage).to.equal("ไม่พบข้อมูลที่ต้องการในระบบ")

                    done();
                });
        });

        // //Test Error
        it("receiptDetail Status : 500", function (done) {

            chai.request(app)
                .post('/customers/receiptDetail')
                .send({
                    headerData: {
                        messageId: "",
                        sentDateTime: "",
                        responseDateTime: ""
                    }
                })
                .end((err, res) => {

                    res.body.should.be.a('object')
                    expect(res.body.responseStatus.errorCode).to.equal(500)
                    expect(res.body.responseStatus.errorMessage).to.equal("ติดต่อผู้ดูแลระบบ")

                    done();
                });
        });

    });


    after(() => {
        if (!server) return
        server.close()
    })
});
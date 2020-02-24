import CustomersDAO from './dao'
import CustomersService from './service'
import CustomerService from './service'
import JsonUtils from '../../utils/json-utils'

class CustomersController {

    static getSearchByCitizenId(req, res) {

        CustomersService.findSearchByCitizenId(req.body)
            .then((data) => {
                res.send(data)
            })
    }

    static getSearchByCustomerName(req, res) {

        CustomersService.fineSearchByCustomerName(req.body)
            .then((data) => {
                res.send(data)
            })

    }

    static getsearchByPolicyNo(req, res) {

        CustomersService.fineSearchByPolicyNo(req.body)
            .then((data) => {
                res.send(data)
            })

    }

    static getStaticCard(req, res) {

        CustomersService.getStaticCard(req.body)
            .then((data) => {
                res.json({
                    data: data
                })
            })
    }

    static searchCustomer(req, res) {
        if (JsonUtils.isMockup(req.body)) {
            let responseRecord = {
                party_id: "3451163",
                pname_th: "นาย",
                fname_th: "อนันXX",
                lname_th: "เหลืองสถิตย์กXX",
                govt_id: "3101202889356",
                birth_date: "1961-09-11T17:00:00.000Z",
                race: "",
                gender: "M",
                citizen: "THA",
                blood_group: "",
                height: null,
                weight: null,
                policyNumber: [
                    {
                        policy_no: "06701184",
                        cert_no: ""
                    }
                ]
            }
            let data = JsonUtils.getMockData(req.body, responseRecord)
            return res.send(data)
        } else {
            CustomersService.searchCustomer(req.body)
                .then((data) => {
                    res.send(data)
                })
        }
    }

    static searchByCustomerRef(req, res) {
        if (JsonUtils.isMockup(req.body)) {
            let responseRecord = {
                party_id: "123456",
                pname_th: "น.ส.",
                fname_th: "นุศรินทXX",
                lname_th: "เจียมประกXX",
                govt_id: "1100701094777",
                birth_date: "1989-11-28T17:00:00.000Z",
                age: 30,
                homePhone: [],
                mobilePhone: [],
                email: [],
                address: []
            }
            let data = JsonUtils.getMockData(req.body, responseRecord)
            return res.send(data)
        } else {
            CustomersService.searchByCustomerRef(req.body)
                .then((data) => {
                    res.send(data)
                })
        }

    }

    static searchByNextPremiumSummary(req, res) {

        if (JsonUtils.isMockup(req.body)) {
            let responseRecord = {
                totalPremium: 0,
                paymentList: [
                    {
                        policy_no: "LE38",
                        cert_no: "00272467",
                        nextDueDate: null,
                        payPeriod: null,
                        premium: 0
                    },
                    {
                        policy_no: "LE99",
                        cert_no: "02708303",
                        nextDueDate: null,
                        payPeriod: null,
                        premium: 0
                    }
                ]
            }
            let data = JsonUtils.getMockData(req.body, responseRecord)
            return res.send(data)
        } else {
            CustomerService.searchNextPremiumSummary(req.body)
                .then((data) => {
                    return res.send(data)
                })
        }

    }
    //==============================================================================================
    static receiptDetail(req, res) {
        if (JsonUtils.isMockup(req.body)) {
            let responseRecord = {
                riderList: [
                    {
                        rider_type: "6",
                        premium: "test.",
                        extra_premium: "FRXXX"
                    },
                    {
                        rider_type: "7",
                        premium: "test.",
                        extra_premium: "FRXXX"
                    },
                    {
                        rider_type: "8",
                        premium: "test.",
                        extra_premium: "FRXXX"
                    }
                ]
            }
            let data = JsonUtils.getMockData(req.body, responseRecord)
            return res.send(data)
        } else {
            CustomersService.receiptDetail(req.body)
                .then((data) => {
                    res.send(data)
                })
        }
    }

    static policyStrategyUnitlink(req, res) {
        if (JsonUtils.isMockup(req.body)) {
            let responseRecord = {
                strategyList: [
                    {
                        premiumType: "premiumType",
                        fundId: "fundId",
                        fundName: "fundName",
                        percentage: "percentage",
                    }
                ]
            }
            let data = JsonUtils.getMockData(req.body, responseRecord)
            return res.send(data)
        } else {
            CustomersService.policyStrategyUnitlink(req.body)
                .then((data) => {
                    res.send(data)
                })
        }

    }

    static costOfInsurance(req, res) {
        if (JsonUtils.isMockup(req.body)) {
            let responseRecord = {
                transactionCost: [
                    {
                        policyMonth: "01/2562",
                        coi: "1.11",
                        pf: "2.22",
                        ep: "3.33",
                        rider: "4.44",
                        extra: "5.55",
                        total: "16.65"
                    }
                ]
            }
            let data = JsonUtils.getMockData(req.body, responseRecord)
            return res.send(data)
        } else {
            CustomersService.costOfInsurance(req.body)
                .then((data) => {
                    res.send(data)
                })
        }

    }

    static calculateBenefitlnfo(req, res) {
        if (JsonUtils.isMockup(req.body)) {
            let responseRecord = {
                rp_av: 20.0,
                rsp_av: 21.1,
                tp_av: 22.2,
                total_av: 23.2,
            }
            let data = JsonUtils.getMockData(req.body, responseRecord)
            return res.send(data)
        } else {
            CustomersService.calculateBenefitlnfo(req.body)
                .then((data) => {
                    res.send(data)
                })
        }

    }

    static serviceRequestList(req, res) {
        if (JsonUtils.isMockup(req.body)) {
            let responseRecord = {
                srList: [
                    {
                        createDate: '25621223',
                        contactChannel: 'CC',
                        contactMethod: 'test',
                        mainSubject: 'test',
                        subSubject: 'test',
                        srStatus: 'test'
                    },
                    {
                        createDate: '25621223',
                        contactChannel: 'ACC',
                        contactMethod: 'test',
                        mainSubject: 'test',
                        subSubject: 'test',
                        srStatus: 'test'
                    },
                    {
                        createDate: '25621223',
                        contactChannel: 'LOY',
                        contactMethod: 'test',
                        mainSubject: 'test',
                        subSubject: 'test',
                        srStatus: 'test'
                    }
                ]
            }
            let data = JsonUtils.getMockData(req.body, responseRecord)
            return res.send(data)
        } else {
            CustomersService.serviceRequestList(req.body)
                .then((data) => {
                    res.send(data)
                })
        }
    }

    static serviceRequestDetail(req, res) {
        if (JsonUtils.isMockup(req.body)) {
            let responseRecord = {
                mainSubject: 'test',
                subSubject: 'test',
                contactChannel: 'CC',
                contactMethod: 'test',
                reference: 'test',
                detail: 'test',
                srOwner: 'test'
            }
            let data = JsonUtils.getMockData(req.body, responseRecord)
            return res.send(data)
        } else {
            CustomersService.serviceRequestDetail(req.body)
                .then((data) => {
                    res.send(data)
                })
        }
    }

    static appUNWList(req, res) {
        if (JsonUtils.isMockup(req.body)) {
            let responseRecord = {
                appUNWList: [
                    {
                        mainSubject: 'test',
                        subSubject: 'test',
                        contactChannel: 'CC',
                        contactMethod: 'test',
                        reference: 'test',
                        detail: 'test',
                        srOwner: 'test'
                    },
                    {
                        mainSubject: 'test',
                        subSubject: 'test',
                        contactChannel: 'ACC',
                        contactMethod: 'test',
                        reference: 'test',
                        detail: 'test',
                        srOwner: 'test'
                    },
                    {
                        mainSubject: 'test',
                        subSubject: 'test',
                        contactChannel: 'LOY',
                        contactMethod: 'test',
                        reference: 'test',
                        detail: 'test',
                        srOwner: 'test'
                    }
                ]
            }
            let data = JsonUtils.getMockData(req.body, responseRecord)
            return res.send(data)
        } else {
            CustomersService.appUNWList(req.body)
                .then((data) => {
                    res.send(data)
                })
        }
    }

    static posTransaction(req, res) {
        if (JsonUtils.isMockup(req.body)) {
            let responseRecord = [
                {
                    "policyNo": "11111",
                    "transactionDate": DateUtils.setDateFormat(),
                    "transactionDesc": "TEST"
                },
                {
                    "policyNo": "22222",
                    "transactionDate": DateUtils.setDateFormat(),
                    "transactionDesc": "TEST"
                },
                {
                    "policyNo": "33333",
                    "transactionDate": DateUtils.setDateFormat(),
                    "transactionDesc": "TEST"
                },
                {
                    "policyNo": "44444",
                    "transactionDate": DateUtils.setDateFormat(),
                    "transactionDesc": "TEST"
                },
                {
                    "policyNo": "55555",
                    "transactionDate": DateUtils.setDateFormat(),
                    "transactionDesc": "TEST"
                }
            ]
            let data = JsonUtils.getMockData(req.body, responseRecord)
            return res.send(data)
        } else {
            CustomersService.posTransaction(req.body)
                .then((data) => {
                    res.send(data)
                })
        }
    }


    static calculatePolicyLoan(req, res) {
        if (JsonUtils.isMockup(req.body)) {
            let responseRecord = {
                totalLoanAmount: "10,000",
                calLoanList: [
                    {
                        policyNo: "policyNo",
                        certNo: "certNo",
                        loanAmount: "10,000",
                        type: "type"
                    }
                ]
            }
            let data = JsonUtils.getMockData(req.body, responseRecord)
            return res.send(data)
        } else {
            CustomersService.calculatePolicyLoan(req.body)
                .then((data) => {
                    res.send(data)
                })
        }

    }

    static claimInquiry(req, res) {

        CustomersService.claimInquiry(req.body)
            .then((data) => {
                res.send(data)
            })
    }

    static claimDetail(req, res) {

        CustomersService.claimDetail(req.body)
            .then((data) => {
                res.send(data)
            })
    }


}



export default CustomersController;

import controller from './controller';

export function setup(router) {

    router
        .post('/searchByCitizenId', controller.getSearchByCitizenId)
        .post('/searchByCustomerName', controller.getSearchByCustomerName)
        .post('/searchByPolicyNo', controller.getsearchByPolicyNo)
        .post('/getStaticCard', controller.getStaticCard)

        .post('/searchCustomer', controller.searchCustomer) //CUS-20
        .post('/searchByCustomerRef', controller.searchByCustomerRef) //CUS-21
        //CUS-22 : Spring
        .post('/receiptDetail', controller.receiptDetail) //CUS-23
        .post('/policyStrategyUnitlink', controller.policyStrategyUnitlink) //CUS-24
        .post('/searchByNextPremiumSummary', controller.searchByNextPremiumSummary) //CUS-25
        .post('/costOfInsurance', controller.costOfInsurance) //CUS-26
        //CUS-27 : Spring
        .post('/posTransaction', controller.posTransaction) //CUS-28 - ยังไม่เสร็จดูใน Trello เพิ่ม
        .post('/calculateBenefitlnfo', controller.calculateBenefitlnfo)//CUS-29
        .post('/calculatePolicyLoan', controller.calculatePolicyLoan) //CUS-30
        .post('/serviceRequestList', controller.serviceRequestList) //CUS-31
        .post('/serviceRequestDetail', controller.serviceRequestDetail) //CUS-32
        .post('/appUNWList', controller.appUNWList) //CUS-33
        .post('/claimInquiry', controller.claimInquiry) //CUS-34
        .post('/claimDetail', controller.claimDetail)//CUS-35

}

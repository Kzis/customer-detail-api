import controller from './controller';

export function setup(router) {

    router
        // PolicyDataService
        .post('/PolicyDetailsOL', controller.policyDetailsOL) //POL_DB_02_01
        .post('/PolicyDetailsCL', controller.policyDetailsCL) //POL_DB_02_02
        .post('/PolicyDetailsUnitLink', controller.policyDetailsUnitLink) // POL_DB_02_03
        .post('/NextPayPeriod', controller.nextPayPeriod) //POL_DB_03 #######
        .post('/GetLoanPremium', controller.getLoanPremium) // POL_DB_04
        .post('/GetRiderDetial', controller.getRiderDetial) //POL_DB_05
        .post('/GetBeneficiaryInfo', controller.getBeneficiaryInfo) // POL_DB_10
        .post('/GetPaymentHistory', controller.getPaymentHistory) //POL_DB_11
        .post('/GetCoverageOverview', controller.getCoverageOverview) //POL_DB_12
        .post('/DisplayPolicyList', controller.displayPolicyList) //cus-22
        .post('/ActualValuePolicy', controller.actualValuePolicy) // CUS-27

        //CSV
        .post('/ClaimInquiry', controller.claimInquiry) // CLM-01
        .post('/ClaimDetail', controller.claimDetail) // CLM-02
}

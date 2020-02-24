
import controller from './controller';

export function setup(router) {

    router
        .get('/getOccupation', controller.getOccupation)
        .get('/getSubDistCode', controller.getSubDistCode)
        .get('/getIncomeRange', controller.getIncomeRange)
        .get('/getParticipantRole', controller.getParticipantRole)
        .get('/getBloodGroup', controller.getBloodGroup)
        .get('/getReligion', controller.getReligion)
        .get('/getCountryCode', controller.getCountryCode)
        .get('/getAll', controller.getAll)
        .get('/getMaritalStatus', controller.getMaritalStatus)
        .get('/getEducationLevel', controller.getEducationLevel)

}
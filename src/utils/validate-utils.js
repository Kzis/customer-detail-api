
class ValidateUtils {


    static validateRequireField(data) {
        if (data === undefined || data === null || data === "") {
            return true;
        } else {
            return false;
        }
    }

    static checkLength(data, length) {
        return data.length > length
    }

    static checkPolicy(policyNo, certNo) {
        if (policyNo.length == 8) { //policy case
            return certNo.length == 0
        } else if (policyNo.length == 4) { //policy+cert case
            return certNo.length == 8
        } else {
            return false
        }
    }

    static convertToString(data) {
        if(data === undefined){
            return ''
        } else {
            return data != null ? data : ''
        } 
    } 

    static convertToInteger(data) {
        return data != null ? data : 0
    } 

    static convertToBoolean(data) {
        return data != null ? data : false
    }
}

export default ValidateUtils;

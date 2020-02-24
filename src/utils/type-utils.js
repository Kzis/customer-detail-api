class TypeUtils {

    static convertType(type) {
        let getType
        let typeList = []

        if (type.toUpperCase() !== '' && type.toUpperCase() !== undefined) {
            typeList = type.toUpperCase().split("-")
            if (typeList.length > 1) {
                getType = typeList[1].toUpperCase()
               
            } else {
                getType = type.toUpperCase()
            }
        }

        //console.log("typeList = ", typeList)
        //console.log("typeList.size = ", typeList.length)
        //console.log("getType = ", getType)

        return getType
    }

}


export default TypeUtils;
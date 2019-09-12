
const Finder = {

    where(condition) { //Articles.where({authorId:1 , categoryId:1})
        const collection = this.collection()

        return Object
            .keys(condition)    // ['authorId', 'categoryId']
            .reduce(
                (results, key) => results.filter(item => item[key] === condition[key])
                , collection)

        // results ค่าตั้งต้นจะเป็น collection

    },

    findAll() {
        return this.collection()
    },

    find(id) {
        return this.findRecord(id)
    },

    findRecord(id) {
        return this.collection().find(record => record.id === +id)
    },

    findIndex(id) {
        return this.collection().findIndex(record => record.id === +id)
    },
}

export default Finder



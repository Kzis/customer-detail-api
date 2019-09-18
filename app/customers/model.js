
import DatabaseUtils from '../databaseUtils'

const Customers = {

    ...DatabaseUtils,
    key: 'customers',

    findAll: async function () {
        let client = null
        let dataFromQuery = null
        let data = null

        try {
            const queryString = ('SELECT * FROM public.customer')
            client = await this.getConnections()
            dataFromQuery = await client.query(queryString)
            data = (dataFromQuery.rowCount > 0) ? dataFromQuery.rows : null

        } catch (err) {
            console.log(err)
        } finally {
            client.release()
        }

        return data
    },

    findById: async function (id) {
        let client = null
        let dataFromQuery = null
        let data = null

        try {
            const queryString = 'SELECT * FROM public.customer WHERE id = $1'
            const params = [id]

            client = await this.getConnections()
            dataFromQuery = await client.query(queryString, params)
            data = (dataFromQuery.rowCount > 0) ? dataFromQuery.rows : null

        } catch (err) {
            console.log(err)
        } finally {
            client.release()
        }

        return data
    },


    findByParams: async function (body) {
        let client = null
        let dataFromQuery = null
        let data = null

        try {
            const queryString = 'SELECT * FROM public.customer WHERE id = $1 and name_en = $2'
            const params = [body.id, body.name_en]

            client = await this.getConnections()
            dataFromQuery = await client.query(queryString, params)
            data = (dataFromQuery.rowCount > 0) ? dataFromQuery.rows : null

        } catch (err) {
            console.log(err)
        } finally {
            client.release()
        }

        return data
    },

    addUser: async function (body) {
        let client = null
        let dataFromQuery = null
        let data = null

        const query = {
            text: 'INSERT INTO customer (TITLE_CODE,NAME_TH,NAME_EN,SURNAME_TH,SURNAME_EN,GENDER,TEL,EMAIL,BIRTHDATE)' +
                'VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *',
            values: [body.titleCode, body.nameTh, body.nameEn, body.surnameTh, body.surnameEn, body.gender, body.tel, body.email, body.birthdate],
        }

        try {

            client = await this.getConnections()
            dataFromQuery = await client.query(query)
            data = (dataFromQuery.rowCount > 0) ? dataFromQuery.rows : null

        } catch (err) {
            console.log(err)
        } finally {
            client.release()
        }

        return data
    },

}

export default Customers;
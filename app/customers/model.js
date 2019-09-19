
import DatabaseUtils from '../../utils/database-utils'

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

    add: async function (body) {
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

    update: async function (id, body) {

        let client = null
        let dataFromQuery = null
        let data = null

        const query = {
            text: 'UPDATE public.customer ' +
                'SET title_code=$2, name_th=$3, name_en=$4, surname_th=$5, surname_en=$6, gender=$7, tel=$8, email=$9, birthdate=$10 ' +
                'WHERE id=$1 RETURNING *',
            values: [id, body.titleCode, body.nameTh, body.nameEn, body.surnameTh, body.surnameEn, body.gender, body.tel, body.email, body.birthdate],
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

    delete: async function (id) {
        let client = null

        try {
            const queryString = 'DELETE FROM public.customer WHERE id = $1'
            const params = [id]

            client = await this.getConnections()
            client.query(queryString, params)

        } catch (err) {
            console.log(err)
        } finally {
            client.release()
        }

    }
}

export default Customers;
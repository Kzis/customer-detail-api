const { Pool } = require('pg')
const config = require('../config/app_config')
 
const postgreSQL = config.postgreSQL

const pool = new Pool(postgreSQL)
pool.connect()

module.exports = {
    findAllUser: async function(){
        let data = null
        
        try {
            data = await pool.query('select * from public.users')
            if(data.rowCount > 0){
                data = data.rows
            }
        } catch (error) {
            console.log(error)
        }     
        return data
    },
    findUserById: async function(){
        let data = null
        
        try {
            data = await pool.query('select * from public.users')
            if(data.rowCount > 0){
                data = data.rows
            }
        } catch (error) {
            console.log(error)
        }     
        return data
    }
}
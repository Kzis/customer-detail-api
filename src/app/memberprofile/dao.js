import DataBaseUtils from '../../utils/database-utils'

class MemberProfileDAO {

    constructor() {
        this.key = 'memberprofile';
    }
    static async getCustomerTier(party_id) {
      //  console.log("========== getCustomerTier DAO", party_id)
        let client = await DataBaseUtils.getConnectionsCustomerParty()
        let condition
        let paramsValues = []
        if (party_id !== '' && party_id != undefined) {
            condition = ' and infinite.party_id = $1'
            paramsValues.push(party_id)
        }

        let queryString = {
            text: ' select infinite.party_id, t.tier_name, '
                + ' infinite.program_id, '
                + ' infinite.tier_id, '
                + ' infinite.net_prem_amt, '
                + ' infinite.inactive_flag, '
                + ' t.tier_name'
                + ' from infinite.cust_program_stat infinite '
                + '  inner join infinite.tier t on infinite.tier_id = t.tier_id and infinite.program_id = t.program_id '
                + ' where 1=1 ' + condition,
            values: paramsValues
        }
       // console.log("========= queryString", queryString)
        let data = await DataBaseUtils.execute(client, queryString)
       // console.log("========== data DAO", data)
        return data
    }

    
    static async getListReceipt(party_id){
        let client = await DataBaseUtils.getConnectionsCustomerParty()
        let condition
        let paramsValues = []
        if(party_id !== '' && party_id !=undefined){
            condition = ' and pp.party_id =$1'
            paramsValues.push(party_id)
        }

        let queryString = {
            text:' select pp.party_id,r.rp_no,r.policy_no,r.gross_prem_amt,r.pay_period, '
                +' r.net_prem_amt,r.pay_date,r.policy_status_1  '
                +' from "policy".policy_participant pp  '
                +' right join infinite.receipt r on pp.policy_no = r.policy_no '
                +' where 1=1 ' + condition,
            values: paramsValues    
        }
      //  console.log("========= queryString", queryString)
        let data = await DataBaseUtils.execute(client, queryString)
      /// console.log("========== data DAO", data)
        return data
    }


    static async getDetailreceiptData(rp_no){
       // console.log("========== getDetailreceiptData DAO", policy_no)
        let client = await DataBaseUtils.getConnectionsCustomerParty()
        let condition
        let paramsValues = []
        if (rp_no !=='' && rp_no != undefined){
            condition = ' and r.rp_no =$1'
            paramsValues.push(rp_no)
            
        }
        let queryString ={
            text:' select r.policy_no, r.rp_no, r.eff_date, '
                +' r.policy_status_1, rd.gross_prem_amt, '
                +' rd.net_prem_amt,r.pay_period, ' 
                +' ps.plan_name,rd.pct_prem,r.pay_date'
                +' from infinite.receipt r '
                +' inner join infinite.receipt_dtl rd  on r.rp_no = rd.rp_no '
                +' inner join infinite.plan_spec ps on ps.plan_code = r.plan_code  '
                +' inner join infinite.prem_type pt on rd.prem_type = pt.prem_type '
                +' where 1=1 '+ condition,
                values: paramsValues
        }
        // console.log("========= queryString", queryString)
        let data = await DataBaseUtils.execute(client, queryString)
        // console.log("========== data DAO", data)
        return data
    }


    static async getLogTier(party_id){
        let client = await DataBaseUtils.getConnectionsCustomerParty()
        let condition
        let paramsValues = []
        if(party_id !=='' && party_id !=undefined){
            condition = ' and cpsh.party_id =$1 '
            paramsValues.push(party_id)
        }
        let queryString = {
            text:' select cpsh.party_id,pg.program_name,t.tier_name,cpsh.start_date,cpsh.end_date '
                +' from infinite.cust_program_stat_hist  cpsh '
                +' inner join infinite."program" pg on cpsh.program_id = pg.program_id '
                +' inner join infinite.tier t on cpsh.tier_id = t.tier_id and cpsh.program_id = t.program_id ' 
                +' where 1=1 ' + condition,
                values: paramsValues
        }
         let data = await DataBaseUtils.execute(client, queryString)

         return data

    }
    static async getYearPrevileage(program_id,tier_id){
               console.log("========== getDetailreceiptData DAO", program_id)
                      console.log("========== getDetailreceiptData2 DAO", tier_id)

        let client = await DataBaseUtils.getConnectionsCustomerParty()
        
        let paramsValues = []
        let condition = ''
        let where
        let count = 1
        if(program_id !='' && program_id !=undefined){
            condition = condition + ' AND i.program_id = $' + count++
            paramsValues.push(program_id)
        }
        if(tier_id !='' && tier_id !=undefined){
            condition = condition + ' AND i.tier_id = $' + count++
            paramsValues.push(tier_id)
        }

        where = 'where 1=1' + condition

        if(program_id != null || tier_id != null){
            let queryString = {
                text: 'select  i.privilege_id,i.privilege_year,i."name" from infinite.privilege i'
                     +' '+ where,
                     values: paramsValues
            }
             console.log("========= queryString", queryString)
            let data = await DataBaseUtils.execute(client, queryString)
        console.log("========== data DAO", data)
            return data
        }

    }

}
export default MemberProfileDAO;
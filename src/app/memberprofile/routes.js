import controller from './controller';
export function setup(router) {  
   
   router
      .post('/getCustomerTier',controller.getCustomerTier)
      .post("/getYearPrevileage",controller.getYearPrevileage)
      .post("/getListReceipt",controller.getListReceipt)   
      .post("/getDetailreceiptData", controller.getDetailreceiptData)
      .post("/getListRedeem",controller.getListRedeem)
      .post("/getLogTier",controller.getLogTier) 


  

}
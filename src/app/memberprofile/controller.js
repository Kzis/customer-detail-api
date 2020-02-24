import STATUS from "../../master/http-status";
import MemberProfileService from "./service";
class MemberProfileController {

  static getCustomerTier(req,res){
      MemberProfileService.getCustomerTier(req.body)
      .then((data)=>{
          res.json({ data })
      })

  }  

  static getYearPrevileage(req, res, ) {
    MemberProfileService.getYearPrevileage(req.body)
    .then((data)=>{
      res.json({ data })
    })
  }

  static getListReceipt(req, res) {
    MemberProfileService.getListReceipt(req.body)
    .then((data)=>{
      res.json({ data })
    })
  }

  static getDetailreceiptData(req, res) {
    MemberProfileService.getDetailreceiptData(req.body)
    .then((data)=>{
      res.json({ data })
    })
  }

  static getListRedeem(req, res, ) {
    const idNo = req.body.idNo;
    if (idNo != undefined) {
      res.status(STATUS.OK.CODE).json({
        message: "Post getListRedeem successfully",
        post: {
          idNo: idNo,
          dateTimeUse: "",
          namePervileage: ""
        }
      });
    } else {
      res.status(STATUS.NOT_FOUND.CODE).json({
        Error: "Not Found"
      });
    }
  }

  static getLogTier(req, res) {
    MemberProfileService.getLogTier(req.body)
    .then((data)=>{
      res.json({ data })
    })
  }
}

export default MemberProfileController;

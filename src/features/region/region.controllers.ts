// controllers/region.controller.ts
import { Request, Response } from "express";
import { RegionService } from "./region.services";
import { validate } from "../../validations/validate";
import { RegionValidation } from "./region.validations";

export class RegionController {
  static async getProvinces(req: Request, res: Response) {
    const data = await RegionService.getProvinces();
    res.json({ success: true, data });
  }

  static async getCities(req: Request, res: Response) {
    const { params } = validate(RegionValidation.GET_CITIES, {
      params: req.params,
    });
    const data = await RegionService.getCities({params});
    res.json({ success: true, data });
  }

  static async getDistricts(req: Request, res: Response) {
    const { params } = validate(RegionValidation.GET_DISTRICTS,{
      params:req.params
    }) 
    const data = await RegionService.getDistricts({params});
    res.json({ success: true, data });
  }
  static async getSubDistricts(req:Request,res:Response){
    const {params} = validate(RegionValidation.GET_SUB_DISTRICTS,{
      params:req.params
    })
    const data = await RegionService.getSubDistrict({params})
    res.json({ success: true, data });
  }
}

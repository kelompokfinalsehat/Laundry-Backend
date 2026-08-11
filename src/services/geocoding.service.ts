import { opencageClient } from "../configs/axios.config";
import { OPENCAGE_API_KEY } from "../configs/env.config";
import { ResponseError } from "../utils/errors/response-error.utils";

export class GeocodingService {
    static async getCoordinate(address: string){
        try {
            const res = await opencageClient.get("/json", {
                params: {
                    q: address,
                    key: OPENCAGE_API_KEY
                }
            })
    
            const results = res.data.results[0]
            if(!results || results.length) throw new ResponseError('VALIDATION_ERROR', 'Invalid Address.')
            
            return {
                latitude: results.geometry.lat,
                longitude: results.geometry.lng
            }
            
        } catch (error) {
            if(error instanceof ResponseError) throw error

            throw new ResponseError('GEOCODING_SERVICE_ERROR')
        }
    }
}
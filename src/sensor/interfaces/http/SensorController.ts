import {createSensorUseCase} from "../../application";
import { Request, Response } from "express";

export class SensorController {

    async create(req:Request, res:Response) {
        try{
            const sensor =await createSensorUseCase.execute(req.body);
            res.status(201).json(sensor);
        }catch(err:any){
            res.status(400).json(err.message);}
    }
    async findById(req:Request, res:Response) {
        try{
             const sensor =await createSensorUseCase.execute(req.body);
             res.status(201).json(sensor);
        }catch(err:any){
            res.status(400).json(err.message);
        }
    }
    
}
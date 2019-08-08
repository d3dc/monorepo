import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Resource } from '../entity/Resource';

export default class ResourceController {

    /**
     * List all resources
     * @param req 
     * @param res 
     */
    static async listAll(req: Request, res: Response) {
        // Get resources from database
        const resourceRepository = getRepository(Resource);
        const options: any = {
            select: ['id', 'name', 'position','createdAt']
        };
        if (req.query.limit) {
            options.take = req.query.limit;
        }
        const resources = await resourceRepository.find(options);

        // Send the resources object
        res.send(resources);
    };
}

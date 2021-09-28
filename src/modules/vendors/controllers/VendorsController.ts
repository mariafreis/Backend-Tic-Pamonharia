import { Request, Response } from 'express';
import CreateVendorService from '../services/CreateVendorService';
import DeleteVendorService from '../services/DeleteVendorService';
import ListVendorService from '../services/ListVendorService';
import ShowVendorService from '../services/ShowVendorService';
import UpdateVendorService from '../services/UpdateVendorService';

export default class VendorsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listVendors = new ListVendorService();

    const vendors = await listVendors.execute();

    return response.json(vendors);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showVendor = new ShowVendorService();

    const vendor = await showVendor.execute({ id });
    return response.json(vendor);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cellphone, area } = request.body;

    const createVendor = new CreateVendorService();

    const vendor = await createVendor.execute({
      name,
      cellphone,
      area,
    });

    return response.json(vendor);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, cellphone, area } = request.body;
    const { id } = request.params;

    const updateVendor = new UpdateVendorService();

    const vendor = await updateVendor.execute({
      id,
      name,
      cellphone,
      area,
    });

    return response.json(vendor);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteVendor = new DeleteVendorService();

    await deleteVendor.execute({ id });

    return response.json([]);
  }
}

// ** shared
import { LocalBusinessModel } from '../models';
import { BaseResponse } from './base.types';

export interface LbsServiceParams {
    name?: string;
    country?: string;
    state?: string;
    city?: string;
    industry?: string;
    page?: number;
}

export interface LbsServiceResponse
    extends BaseResponse<{ companies: LocalBusinessModel[] }> {}

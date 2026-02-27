import {AssetStatus, AssetType} from './asset-enums';

export interface Asset {
  id: number;
  name: string;
  serialNumber: string;
  type: AssetType;
  status: AssetStatus;
  purchaseDate: string; // YYYY-MM-DD
  createdAt: string;
  updatedAt: string;
}

export interface AssetCreateRequest {
  name: string;
  serialNumber: string;
  type: AssetType;
  status: AssetStatus;
  purchaseDate: string;
}

export type AssetUpdateRequest = Partial<AssetCreateRequest>;

export interface Page<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number; // current page number
}

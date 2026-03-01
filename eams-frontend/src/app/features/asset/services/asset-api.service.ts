import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Asset, AssetCreateRequest, AssetUpdateRequest, Page} from '../models/asset.model';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AssetApiService {
  private readonly http = inject(HttpClient);

  // TODO move to env file in the future
  private readonly apiUrl = 'http://localhost:8080/api/v1/assets';

  /**
   * GET /api/v1/assets
   * Fetches a paginated list of assets.
   */
  getAssets(page: number = 0, size: number = 10, sort: string ='createdAt,desc'): Observable<Page<Asset>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', sort);

    return this.http.get<Page<Asset>>(this.apiUrl , {params});
  }

  /**
   * GET /api/v1/assets/{id}
   */
  getAssetById(id: number): Observable<Asset> {
    return this.http.get<Asset>(`${this.apiUrl}/${id}`)
  }

  /**
   * POST /api/v1/assets
   */
  createAsset(asset: AssetCreateRequest): Observable<Asset> {
    return this.http.post<Asset>(this.apiUrl, asset);
  }

  /**
   * PUT /api/v1/assets/{id}
   */
  updateAsset(id: number, asset: AssetUpdateRequest): Observable<Asset> {
    return this.http.put<Asset>(`${this.apiUrl}/${id}`, asset);
  }

  /**
   * DELETE /api/v1/assets/{id}
   */
  deleteAsset(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

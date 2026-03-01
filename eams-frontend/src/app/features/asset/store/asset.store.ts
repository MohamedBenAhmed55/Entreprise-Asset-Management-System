import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, EMPTY } from 'rxjs';
import { AssetApiService } from '../services/asset-api.service';
import { Asset } from '../models/asset.model';
import {MessageService} from 'primeng/api';


type AssetState = {
  assets: Asset[];
  loading: boolean;
  error: string | null;
  totalElements: number;
  currentPage: number;
  pageSize: number;
}

const initialState: AssetState = {
  assets: [],
  loading: false,
  error: null,
  totalElements: 0,
  currentPage: 0,
  pageSize: 10,
}

export const AssetStore = signalStore(
  { providedIn: 'root' },
  withState<AssetState>(initialState),
  withMethods((store ) => {
    const assetApi = inject(AssetApiService);
    const messageService = inject(MessageService);

    return {
      loadAssets: rxMethod<{ page: number; size: number }>(
        pipe(
          tap(() => patchState(store, { loading: true, error: null })),
          switchMap(({ page, size }) =>
            assetApi.getAssets(page, size).pipe(
              tap((response) => {
                patchState(store, {
                  assets: response.content,
                  totalElements: response.totalElements,
                  currentPage: response.number,
                  loading: false,
                });
              }),
              catchError((error) => {
                console.log('API Error:', error);
                patchState(store, {
                  error: 'Failed to load assets. Please try again.',
                  loading: false,
                });
                return EMPTY;
              })
            )
          )
        )
      ),

      updatePagination: (page: number, size: number) => {
        patchState(store, { currentPage: page, pageSize: size });
      },
      deleteAsset: rxMethod<number>(
        pipe(
          tap(() => patchState(store, {loading: true})),
          switchMap((id) =>
            assetApi.deleteAsset(id).pipe(
              tap(() => {
                const updatedAssets = store.assets().filter(asset => asset.id !== id);

                patchState(store, {
                  assets: updatedAssets,
                  totalElements: store.totalElements() - 1, // Keep pagination accurate
                  loading: false
                });

                messageService.add({
                  severity: 'success',
                  summary: 'Deleted',
                  detail: 'Asset has been successfully deleted.',
                  life: 3000
                })
              }),
              catchError((error) => {
                patchState(store, {loading: false});
                return EMPTY;
              })
            )
          )
        )
      ),
      createAsset: rxMethod<any>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((payload) =>
            assetApi.createAsset(payload).pipe(
              tap((newAsset: Asset) => {
                // Prepend the new asset to the top of the list
                patchState(store, {
                  assets: [newAsset, ...store.assets()],
                  totalElements: store.totalElements() + 1,
                  loading: false
                });

                messageService.add({
                  severity: 'success',
                  summary: 'Created',
                  detail: 'Asset has been successfully created.',
                  life: 3000
                });
              }),
              catchError((error) => {
                patchState(store, { loading: false });
                return EMPTY; // Global error interceptor handles the toast
              })
            )
          )
        )
      ),

      updateAsset: rxMethod<any>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((payload) =>
            // Assuming your payload has the ID, and your API expects (id, payload)
            assetApi.updateAsset(payload.id, payload).pipe(
              tap((updatedAsset: Asset) => {
                // Find the old asset and replace it with the new one from the backend
                const updatedAssets = store.assets().map((asset) =>
                  asset.id === updatedAsset.id ? updatedAsset : asset
                );

                patchState(store, {
                  assets: updatedAssets,
                  loading: false
                });

                messageService.add({
                  severity: 'success',
                  summary: 'Updated',
                  detail: 'Asset has been successfully updated.',
                  life: 3000
                });
              }),
              catchError((error) => {
                patchState(store, { loading: false });
                return EMPTY;
              })
            )
          )
        )
      ),
    };
  })
);


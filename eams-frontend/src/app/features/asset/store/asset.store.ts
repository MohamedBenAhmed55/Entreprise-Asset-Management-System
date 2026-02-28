import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, EMPTY } from 'rxjs';
import { AssetApiService } from '../services/asset-api.service';
import { Asset } from '../models/asset.model';


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
    };
  })
);


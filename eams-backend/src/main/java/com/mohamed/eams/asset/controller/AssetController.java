package com.mohamed.eams.asset.controller;

import com.mohamed.eams.asset.dto.AssetCreateRequest;
import com.mohamed.eams.asset.dto.AssetResponse;
import com.mohamed.eams.asset.dto.AssetUpdateRequest;
import com.mohamed.eams.asset.service.AssetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/assets")
@RequiredArgsConstructor
public class AssetController {

    private final AssetService assetService;

    @GetMapping
    public ResponseEntity<Page<AssetResponse>> getAllAssets(
            @PageableDefault(size = 10, sort = "createdAt")Pageable pageable) {
        return ResponseEntity.ok(assetService.getAllAssets(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssetResponse> getAssetById(@PathVariable Long id){
        return ResponseEntity.ok(assetService.getAssetById(id));
    }

    @PostMapping
    public ResponseEntity<AssetResponse> createAsset(@Valid @RequestBody AssetCreateRequest request) {
        AssetResponse response = assetService.createAsset(request);

        // Return 201 Created with the Location header of the new resource
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(response.id())
                .toUri();

        return ResponseEntity.created(location).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetResponse> updateAsset(
            @PathVariable Long id,
            @Valid @RequestBody AssetUpdateRequest request) {
        return ResponseEntity.ok(assetService.updateAsset(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> retireAsset(@PathVariable Long id) {
        assetService.retireAsset(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }
}

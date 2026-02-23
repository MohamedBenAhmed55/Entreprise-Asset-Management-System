package com.mohamed.eams.asset.dto;

import com.mohamed.eams.asset.model.AssetStatus;
import com.mohamed.eams.asset.model.AssetType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AssetUpdateRequest(
        @NotBlank(message = "Asset name is required")
        @Size(min = 3, max = 100)
        String name,
        @NotNull(message = "Asset type is required")
        AssetType type,
        @NotNull(message = "Asset status is required")
        AssetStatus status
) {
}

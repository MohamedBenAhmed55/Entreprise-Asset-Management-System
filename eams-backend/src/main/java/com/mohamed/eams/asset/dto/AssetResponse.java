package com.mohamed.eams.asset.dto;

import com.mohamed.eams.asset.model.AssetStatus;
import com.mohamed.eams.asset.model.AssetType;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record AssetResponse(
        Long id,
        String name,
        String serialNumber,
        AssetType type,
        AssetStatus status,
        LocalDate purchaseDate,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}

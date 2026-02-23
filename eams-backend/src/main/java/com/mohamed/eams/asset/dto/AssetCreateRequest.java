package com.mohamed.eams.asset.dto;

import com.mohamed.eams.asset.model.AssetType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record AssetCreateRequest(
        @NotBlank(message = "Asset name is required")
        @Size(min = 3, max = 100, message = "Name must be between 3 and 300 characters")
        String name,
        @NotBlank(message = "Serial number is required")
        String serialNumber,
        @NotNull(message = "Asset type is required")
        AssetType type,
        @PastOrPresent(message = "Purchase date cannot be in the future")
        LocalDate purchaseDate
) {

}

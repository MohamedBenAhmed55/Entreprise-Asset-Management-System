package com.mohamed.eams.asset.mapper;

import com.mohamed.eams.asset.dto.AssetCreateRequest;
import com.mohamed.eams.asset.dto.AssetResponse;
import com.mohamed.eams.asset.dto.AssetUpdateRequest;
import com.mohamed.eams.asset.model.Asset;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

// componentModel = "spring" allows us to inject this via @RequiredArgsConstructor in the Service
// unmappedTargetPolicy = ReportingPolicy.IGNORE prevents warnings for fields we intentionally don't map
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AssetMapper {

    // Converts the Creation DTO into an Entity.
    // We forcefully set the default status to AVAILABLE upon creation.
    @Mapping(target = "status", constant = "AVAILABLE")
    Asset toEntity(AssetCreateRequest request);

    // Converts the Entity into the output DTO
    AssetResponse toResponse(Asset entity);

    // Updates an existing Entity using the Update DTO.
    // @MappingTarget tells MapStruct to update the passed 'entity' object rather than creating a new one.
    void updateEntityFromDto(AssetUpdateRequest request, @MappingTarget Asset entity);
}

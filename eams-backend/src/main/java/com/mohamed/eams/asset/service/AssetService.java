package com.mohamed.eams.asset.service;

import com.mohamed.eams.asset.dto.AssetCreateRequest;
import com.mohamed.eams.asset.dto.AssetResponse;
import com.mohamed.eams.asset.dto.AssetUpdateRequest;
import com.mohamed.eams.asset.mapper.AssetMapper;
import com.mohamed.eams.asset.model.Asset;
import com.mohamed.eams.asset.model.AssetStatus;
import com.mohamed.eams.asset.repository.AssetRepository;
import com.mohamed.eams.common.exception.BusinessRuleException;
import com.mohamed.eams.common.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AssetService {

    private final AssetRepository assetRepository;
    private final AssetMapper assetMapper;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional(readOnly = true)
    public Page<AssetResponse> getAllAssets(Pageable pageable){
        log.info("Fetching assets page:{}", pageable.getPageNumber());
        return assetRepository.findAll(pageable).map(assetMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public AssetResponse getAssetById(Long id){
        log.info("Fetching asset by id");
        return assetRepository.findById(id)
                .map(assetMapper::toResponse)
                .orElseThrow(() -> new EntityNotFoundException("Asset not found with Id: " + id));
    }

    @Transactional
    public AssetResponse createAsset(AssetCreateRequest request){
        if(assetRepository.existsBySerialNumber(request.serialNumber())) {
            throw new BusinessRuleException("An asset with this serial number already exists.");
        }

        Asset asset = assetMapper.toEntity(request);
        Asset savedAsset = assetRepository.save(asset);

        log.info("Created new asset with ID: {}", savedAsset.getId());

        return assetMapper.toResponse(savedAsset);
    }

    @Transactional
    public AssetResponse updateAsset(Long id, AssetUpdateRequest request) {
        Asset existingAsset = assetRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Asset not found with ID: " + id));

        if(existingAsset.getStatus() == AssetStatus.RETIRED) {
            throw new BusinessRuleException("Cannot modify a retired asset.");
        }

        assetMapper.updateEntityFromDto(request, existingAsset);

        Asset updatedAsset = assetRepository.save(existingAsset);
        return assetMapper.toResponse(updatedAsset);
    }

    @Transactional
    public void retireAsset(Long id){
        Asset asset = assetRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Asset not found with ID: " + id));

        asset.setStatus(AssetStatus.RETIRED);
        assetRepository.save(asset);

        log.info("Asset ID {} has been retired.", id);
    }
}

package com.mohamed.eams.asset.repository;

import com.mohamed.eams.asset.model.Asset;
import com.mohamed.eams.asset.model.AssetStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {

    boolean existsBySerialNumber(String serialNumber);

    Optional<Asset> findBySerialNumber(String serialNumber);

    Page<Asset> findByStatus(AssetStatus status, Pageable pageable);
}

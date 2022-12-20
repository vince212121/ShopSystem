package com.vl.server.vendor;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

// Add cross origin if using local environment
@CrossOrigin
@Repository
@RepositoryRestResource(collectionResourceRel = "vendors", path = "vendors")
public interface VendorRepository extends CrudRepository<Vendor, Long> {
    // extend so we can return the number of rows deleted
    @Modifying
    @Transactional
    @Query("delete from Vendor where id = ?1")
    int deleteOne(Long vendorid);
}
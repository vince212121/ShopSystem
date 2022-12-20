package com.vl.server.purchaseorder;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@RequiredArgsConstructor
public class PurchaseOrder {
    @Id
    @GeneratedValue
    private Long Id;
    private Long vendorid;
    private BigDecimal amount;
    @JsonFormat(pattern = "yyyy-MM-dd@HH:mm:ss")
    private LocalDateTime podate;
    @OneToMany(mappedBy = "poid", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PurchaseOrderLineItem> items = new ArrayList<PurchaseOrderLineItem>();
}

package com.vl.server.product;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
@Data
@RequiredArgsConstructor
public class Product {
    @Id
    private String id;
    private int vendorid;
    private String name;
    private BigDecimal costprice;
    private BigDecimal msrp;
    // Reorder point
    private int rop;
    // Economic order quantity
    private int eoq;
    // Quantity on hand
    private int qoh;
    // Quantity on order
    private int qoo;
    
    // private String qrcode;
    @Basic(optional = true)
    @Lob
    private byte[] qrcode;
    
    @Basic(optional = true)
    private String qrcodetxt;

}

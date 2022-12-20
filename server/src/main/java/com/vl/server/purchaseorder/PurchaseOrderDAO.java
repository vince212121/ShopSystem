package com.vl.server.purchaseorder;

import com.vl.server.product.Product;
import com.vl.server.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceContext;
import java.time.LocalDateTime;

@Component
public class PurchaseOrderDAO {
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public PurchaseOrder create(PurchaseOrder clientrep) {
        PurchaseOrder realPurchaseOrder = new PurchaseOrder();
        realPurchaseOrder.setPodate(LocalDateTime.now());
        realPurchaseOrder.setVendorid(clientrep.getVendorid());
        realPurchaseOrder.setAmount(clientrep.getAmount());
        entityManager.persist(realPurchaseOrder);

        for (PurchaseOrderLineItem item : clientrep.getItems()) {
            PurchaseOrderLineItem realItem = new PurchaseOrderLineItem();
            realItem.setPoid(realPurchaseOrder.getId());
            realItem.setProductid(item.getProductid());
            realItem.setQty(item.getQty());
            realItem.setPrice(item.getPrice());

            // we also need to update the QOO on the product table
            Product prod = productRepository.getReferenceById(item.getProductid());
            prod.setQoo(prod.getQoo() + item.getQty());
            productRepository.saveAndFlush(prod);

            entityManager.persist(realItem);
        }
        entityManager.refresh(realPurchaseOrder);
        return realPurchaseOrder;
    }
}

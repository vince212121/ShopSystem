package com.vl.server.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Add cross origin if using local environment
@CrossOrigin
@RestController
public class ProductController {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private QRCodeGenerator qrGenerator;

    @GetMapping("/api/products")
    public ResponseEntity<Iterable<Product>> findAll() {
        Iterable<Product> products = productRepository.findAll();
        return new ResponseEntity<Iterable<Product>>(products, HttpStatus.OK);
    }

    @PutMapping("/api/products")
    public ResponseEntity<Product> updateOne(@RequestBody Product product) {
        product.setQrcode(qrGenerator.generateQRCode(product.getQrcodetxt()));
        Product updatedProduct = productRepository.save(product);
        return new ResponseEntity<Product>(updatedProduct, HttpStatus.OK);
    }

    @PostMapping("/api/products")
    public ResponseEntity<Product> addOne(@RequestBody Product product) {
        product.setQrcode(qrGenerator.generateQRCode(product.getQrcodetxt()));
        Product addedProduct = productRepository.save(product);
        return new ResponseEntity<Product>(addedProduct, HttpStatus.OK);
    }

    @DeleteMapping("/api/products/{id}")
    public ResponseEntity<Integer> deleteOne(@PathVariable String id) {
        return new ResponseEntity<Integer>(productRepository.deleteOne(id), HttpStatus.OK);
    }

    @GetMapping("/api/qrcode/{txt}")
    public ResponseEntity<byte[]> getQRCode(@PathVariable String txt) {
        byte[] qrcodebin = qrGenerator.generateQRCode(txt);
        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
        return new ResponseEntity<byte[]>(qrcodebin, headers, HttpStatus.CREATED);
    }

    // If setting up pagination on server side
    // P is for page, s is for the number of things displayed
    @GetMapping(value = "/api/products/paged", params = { "p", "s" })
    public Page<Product> findPaginated(@RequestParam("p") int page, @RequestParam("s") int size) {
        Page<Product> resultPage = productRepository.findAll(PageRequest.of(page, size));
        return resultPage;
    }
}

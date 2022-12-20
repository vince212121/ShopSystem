-- Vendors
INSERT INTO
    Vendor (
        Address1,
        City,
        Province,
        PostalCode,
        Phone,
        Type,
        Name,
        Email
    )
VALUES
    (
        '123 Maple St',
        'London',
        'On',
        'N1N-1N1',
        '(555)555-5555',
        'Trusted',
        'ABC Supply Co.',
        'abc@supply.com'
    );

INSERT INTO
    Vendor (
        Address1,
        City,
        Province,
        PostalCode,
        Phone,
        Type,
        Name,
        Email
    )
VALUES
    (
        '543 Sycamore Ave',
        'Toronto',
        'On',
        'N1P-1N1',
        '(999)555-5555',
        'Trusted',
        'Big Bills Depot',
        'bb@depot.com'
    );

INSERT INTO
    Vendor (
        Address1,
        City,
        Province,
        PostalCode,
        Phone,
        Type,
        Name,
        Email
    )
VALUES
    (
        '922 Oak St',
        'London',
        'On',
        'N1N-1N1',
        '(555)555-5599',
        'Untrusted',
        'Shady Sams',
        'ss@underthetable.com'
    );

INSERT INTO
    Vendor (
        Address1,
        City,
        Province,
        PostalCode,
        Phone,
        Type,
        Name,
        Email
    )
VALUES
    (
        '122 Some St',
        'London',
        'On',
        'N1N-1N1',
        '(555)555-6600',
        'Trusted',
        'Vincents Shop',
        'vl@shop.com'
    );

-- products
INSERT INTO
    Product (
        Id,
        VendorId,
        Name,
        CostPrice,
        Msrp,
        Rop,
        Eoq,
        Qoh,
        Qoo,
        QrCode,
        QrCodeTxt
    )
VALUES
    (
        'PROD1001ABC',
        1,
        'YAMAHA FG800M',
        229.99,
        365.00,
        10,
        1,
        20,
        0,
        '',
        ''
    );

INSERT INTO
    Product (
        Id,
        VendorId,
        Name,
        CostPrice,
        Msrp,
        Rop,
        Eoq,
        Qoh,
        Qoo,
        QrCode,
        QrCodeTxt
    )
VALUES
    (
        'PROD1002ABC',
        1,
        'EPIPHONE J-15EC',
        419.99,
        499.99,
        10,
        1,
        20,
        0,
        '',
        ''
    );

INSERT INTO
    Product (
        Id,
        VendorId,
        Name,
        CostPrice,
        Msrp,
        Rop,
        Eoq,
        Qoh,
        Qoo,
        QrCode,
        QrCodeTxt
    )
VALUES
    (
        'PROD1003ABC',
        1,
        'EPIPHONE J-200',
        729.99,
        999.99,
        10,
        1,
        20,
        0,
        '',
        ''
    );

INSERT INTO
    Product (
        Id,
        VendorId,
        Name,
        CostPrice,
        Msrp,
        Rop,
        Eoq,
        Qoh,
        Qoo,
        QrCode,
        QrCodeTxt
    )
VALUES
    (
        'PROD1001BIG',
        2,
        'YAMAHA FG800M',
        244.99,
        365.00,
        10,
        1,
        30,
        0,
        '',
        ''
    );

INSERT INTO
    Product (
        Id,
        VendorId,
        Name,
        CostPrice,
        Msrp,
        Rop,
        Eoq,
        Qoh,
        Qoo,
        QrCode,
        QrCodeTxt
    )
VALUES
    (
        'PROD1002BIG',
        2,
        'EPIPHONE J-15EC',
        445.99,
        499.99,
        10,
        1,
        30,
        0,
        '',
        ''
    );

INSERT INTO
    Product (
        Id,
        VendorId,
        Name,
        CostPrice,
        Msrp,
        Rop,
        Eoq,
        Qoh,
        Qoo,
        QrCode,
        QrCodeTxt
    )
VALUES
    (
        'PROD1003BIG',
        2,
        'EPIPHONE J-200',
        749.99,
        999.99,
        10,
        1,
        30,
        0,
        '',
        ''
    );

INSERT INTO
    Product (
        Id,
        VendorId,
        Name,
        CostPrice,
        Msrp,
        Rop,
        Eoq,
        Qoh,
        Qoo,
        QrCode,
        QrCodeTxt
    )
VALUES
    (
        'PROD1001SHAD',
        3,
        'YAMAHA FG800M',
        249.99,
        365.00,
        10,
        5,
        30,
        0,
        '',
        ''
    );

INSERT INTO
    Product (
        Id,
        VendorId,
        Name,
        CostPrice,
        Msrp,
        Rop,
        Eoq,
        Qoh,
        Qoo,
        QrCode,
        QrCodeTxt
    )
VALUES
    (
        'PROD1002SHAD',
        3,
        'EPIPHONE J-15EC',
        449.99,
        499.99,
        10,
        5,
        30,
        0,
        '',
        ''
    );

INSERT INTO
    Product (
        Id,
        VendorId,
        Name,
        CostPrice,
        Msrp,
        Rop,
        Eoq,
        Qoh,
        Qoo,
        QrCode,
        QrCodeTxt
    )
VALUES
    (
        'PROD1003SHAD',
        3,
        'EPIPHONE J-200',
        749.99,
        999.99,
        10,
        5,
        30,
        0,
        '',
        ''
    );

INSERT INTO
    Product (
        Id,
        VendorId,
        Name,
        CostPrice,
        Msrp,
        Rop,
        Eoq,
        Qoh,
        Qoo,
        QrCode,
        QrCodeTxt
    )
VALUES
    (
        'PROD1001LI',
        4,
        'YAMAHA FG800M',
        234.99,
        365.00,
        20,
        3,
        20,
        0,
        '',
        ''
    );

INSERT INTO
    Product (
        Id,
        VendorId,
        Name,
        CostPrice,
        Msrp,
        Rop,
        Eoq,
        Qoh,
        Qoo,
        QrCode,
        QrCodeTxt
    )
VALUES
    (
        'PROD1002LI',
        4,
        'EPIPHONE J-15EC',
        445.99,
        499.99,
        15,
        5,
        20,
        0,
        '',
        ''
    );

INSERT INTO
    Product (
        Id,
        VendorId,
        Name,
        CostPrice,
        Msrp,
        Rop,
        Eoq,
        Qoh,
        Qoo,
        QrCode,
        QrCodeTxt
    )
VALUES
    (
        'PROD1003LI',
        4,
        'EPIPHONE J-200',
        749.99,
        999.99,
        10,
        1,
        30,
        0,
        '',
        ''
    );
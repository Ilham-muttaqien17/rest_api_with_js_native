const Product = require('../models/products');

// Get all products
// @route GET /api/products
const getProducts = async(req, res) => {
    try {
        const products = await Product.findAll();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(products));
    } 
    catch (error) {
        console.log(error);
    }
}

// Get a single product
// @route GET /api/product/:id
const getProduct = async(req, res, id) => {
    try {

        const product = await Product.findById(id);
        if(!product) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Product not found!'}));
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(product));
        }

    } 
    catch(error) {
        console.log(error);
    }
}

// Create a product
// @route POST /api/products
const createProduct = async(req, res) => {
    try {

        let body = '';
        req.on('data', (chunck) => {
            body += chunck.toString();
        });

        req.on('end', async() => {

            const { name, desc, price } = JSON.parse(body);

            const product = {
                name,
                desc,
                price
            };

            const newProduct = Product.create(product);

            res.writeHead(201, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({status: 200, message: "Successfully added product"}));
        });   
    } 
    catch(error) {
        console.log(error); 
    }
}

// Update a product
// @route PATCH /api/products/:id
const updateProduct = async(req, res, id) => {
    try {
        const product = await Product.findById(id);
        
        if(!product) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Product not found!'}));
        } else {
            let body = '';
            req.on('data', (chunck) => {
                body += chunck.toString();
            });
    
            req.on('end', async() => {
                const { name, desc, price} = JSON.parse(body);
                if(name) product.name = name;
                if(desc) product.desc = desc;
                if(price) product.price = price;
    
                const updateProduct = Product.update(product);
    
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({status: 200, message: "Product updated!"}));
            })
        }  

    }
    catch(err) {
        console.log(err);
    }
}

// Delete a product
// @route DELETE /api/products/:id
const deleteProduct = async(req, res, id) => {
    try {
        const product = await Product.findById(id);
        if(!product) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Product not found!'}));
        } else {
            const latestProduct = Product.remove(product);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({status: 200, message: "Product removed!"}));
        }   
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
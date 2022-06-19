const products = require('../data/products.json');
const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require('../utils');

const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(products);
    })
}

const findById = (id) => {
    return new Promise((resolve, reject) => {
        const product = products.find((product) => product.id === id);
        resolve(product);
    })
}

const create = (product) => {
    return new Promise((resolve, reject) => {
        const newProduct = {...product, id: uuidv4()};
        products.push(newProduct);
        writeDataToFile('./data/products.json', products);
        resolve(newProduct);
    })   
}

const update = (product) => {
    return new Promise((resolve, reject) => {
        const { id } = product;
        const p = products.filter((product) => product.id !== id);
        const latestProduct = [...p, product]
        writeDataToFile('./data/products.json', latestProduct);
        resolve(latestProduct);
    })
}

const remove = (product) => {
    return new Promise((resolve, reject) => {
        const { id } = product;
        const p = products.filter((product) => product.id !== id);
        console.log(p);
        const latestProduct = [...p];
        writeDataToFile('./data/products.json', latestProduct);
        resolve(latestProduct);
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}
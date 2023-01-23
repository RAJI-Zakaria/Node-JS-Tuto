const express = require('express')
const router = express.Router()
const {
    createProduct,
    updateProduct,
    getAllProducts,
        getSingleProduct,
    deleteSingleProduct,
        deleteAllProducts,
    getProductUsers,
    getProductOrders,
    getProductWithPg

} = require('../controllers/productController')

// -------------------------CUSTOM ROUTE-------------------------
router.post('/', createProduct)

router.put('/:id', updateProduct)

router.get('/', getAllProducts)

router.get('/:id', getSingleProduct)

router.delete('/:id', deleteSingleProduct)

router.delete('/', deleteAllProducts)



router.get('/:id/users', getProductUsers)

router.get('/:id/orders', getProductOrders)


//pagination :  display products 5 by 5
router.get('/page/:number', getProductWithPg)

// -------------------------EXPORT ROUTER-------------------------
module.exports = router
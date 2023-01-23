const express = require('express')
const router = express.Router()
const {
    createProduct,
    updateProduct,
    getAllProducts,
        getSingleProduct,
    deleteSingleProduct,
        deleteAllProducts,
    getProductUser,
    getProductOrders

} = require('../controllers/productController')

// -------------------------CUSTOM ROUTE-------------------------
router.post('/', createProduct)

router.put('/:id', updateProduct)

router.get('/', getAllProducts)

router.get('/:id', getSingleProduct)

router.delete('/:id', deleteSingleProduct)

router.delete('/', deleteAllProducts)



router.get('/:id/user', getProductUser)

router.get('/:id/post', getProductOrders)


// -------------------------EXPORT ROUTER-------------------------
module.exports = router
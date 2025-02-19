const backendDomin = 'http://localhost:8080';

const SummaryApi = {
    signUp: {
        url: `${backendDomin}/api/signup`,
        method: 'post',
    },
    signIn: {
        url: `${backendDomin}/api/signin`,
        method: 'post',
    },
    current_user: {
        url: `${backendDomin}/api/user-details`,
        method: 'get',
    },
    logout_user: {
        url: `${backendDomin}/api/userLogout`,
        method: 'get',
    },
    all_user: {
        url: `${backendDomin}/api/all-user`,
        method: 'get',
    },
    update_user: {
        url: `${backendDomin}/api/update-user`,
        method: 'post',
    },
    uploadProduct: {
        url: `${backendDomin}/api/upload-product`,
        method: 'post',
    },
    all_product: {
        url: `${backendDomin}/api/get-product`,
        method: 'get',
    },
    update_product: {
        url: `${backendDomin}/api/update-product`,
        method: 'post',
    },
    categoryProduct: {
        url: `${backendDomin}/api/get-categoryProduct`,
        method: 'get',
    },
    categoryWiseProduct: {
        url: `${backendDomin}/api/category-product`,
        method: 'post',
    },
    productDetails: {
        url: `${backendDomin}/api/product-details`,
        method: 'post',
    },
    addToCartProduct: {
        url: `${backendDomin}/api/addtocart`,
        method: 'post',
    },
    countAddToCartProduct: {
        url: `${backendDomin}/api/countAddToCartProduct`,
        method: 'get',
    },
    addToCartProductView: {
        url: `${backendDomin}/api/view-card-product`,
        method: 'get',
    },
    updateCartProduct: {
        url: `${backendDomin}/api/update-cart-product`,
        method: 'post',
    },
    deleteCartProduct: {
        url: `${backendDomin}/api/delete-cart-product`,
        method: 'post',
    },
    searchProduct: {
        url: `${backendDomin}/api/search`,
        method: 'get',
    },
    filterProduct: {
        url: `${backendDomin}/api/filter-product`,
        method: 'post',
    },
};

export default SummaryApi;

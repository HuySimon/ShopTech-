const addToCart = (e, id) => {
    e?.stopPropagation();
    e?.preventDefault();
    console.log('Click add to cart');
};

export default addToCart;

const qrcode = require('qrcode');

async function generateOrderCode() {
    const order = {}
    // Generate a timestamp-based order ID
    const timestamp = new Date().toISOString().replace(/\D/g, ''); // Remove non-numeric characters from timestamp
    order.code = `ORD-${timestamp}`; // Prefix with 'ORD-' for orders
    order.qr = await qrcode.toDataURL(order.code)
    return order;
}

generateOrderCode().then((order) => {
    console.log(order.qr);
});

module.exports = generateOrderCode;
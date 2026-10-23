export let customers = [];
export let products = [];
export let orders = [];

export function setData(dataCustomers, dataProducts, dataOrders) {
    customers = dataCustomers;
    products = dataProducts;
    orders = dataOrders;
}

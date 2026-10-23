export function getCustomer(order, customers) {
    return customers.find(function(customer) {
        return customer.id === order.customerId;
    });
}

export function getProduct(productId, products) {
    return products.find(function(product) {
        return product.id === productId;
    });
}

export function getOrderTotal(order, products) {
    let total = 0;

    order.items.forEach(function(item) {
        const product = getProduct(item.productId, products);

        if (product) {
            total = total + product.price * item.quantity;
        }
    });

    return total;
}

export function getCategories(order, products) {
    return order.items.map(function(item) {
        const product = getProduct(item.productId, products);

        if (product) {
            return product.category;
        }

        return "";
    });
}

export function filterOrders(orders, customers, products, search, status, category) {
    return orders.filter(function(order) {
        const customer = getCustomer(order, customers);

        if (!customer) {
            return false;
        }

        const nameMatches = customer.name.toLowerCase().includes(search.toLowerCase());

        const statusMatches = status === "" || order.status === status;

        const categories = getCategories(order, products);
        const categoryMatches = category === "" || categories.includes(category);

        return nameMatches && statusMatches && categoryMatches;
    });
}
export async function loadData() {
    try {
        const responseCustomers = await fetch("data/customers.json");
        const responseProducts = await fetch("data/products.json");
        const responseOrders = await fetch("data/orders.json");

        if (!responseCustomers.ok || !responseProducts.ok || !responseOrders.ok) {
            throw new Error("Erreur lors du chargement des fichiers JSON");
        }

        const customers = await responseCustomers.json();
        const products = await responseProducts.json();
        const orders = await responseOrders.json();

        return { customers, products, orders };

    } catch (error) {
        console.error("Erreur :", error);
        throw error;
    }
}

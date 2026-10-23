import { getCustomer, getProduct, getOrderTotal } from "./selectors.js";

function formatPrice(price) {
    return new Intl.NumberFormat("fr-FR").format(price) + " DH";
}

function getStatusClass(status) {
    if (status === "Livree") {
        return "bg-success";
    } else if (status === "En attente") {
        return "bg-warning text-dark";
    } else if (status === "Annulee") {
        return "bg-danger";
    }

    return "bg-secondary";
}

export function renderIndicators(customers, products, orders) {
    document.querySelector("#total-clients").textContent = customers.length;
    document.querySelector("#total-produits").textContent = products.length;
    document.querySelector("#total-commandes").textContent = orders.length;

    let total = 0;

    orders.forEach(function(order) {
        if (order.status !== "Annulee") {
            total += getOrderTotal(order, products);
        }
    });

    document.querySelector("#montant-total").textContent = formatPrice(total);
}

export function renderCategories(products) {
    const select = document.querySelector("#filtre-categorie");
    const categories = [];

    products.forEach(function(product) {
        if (!categories.includes(product.category)) {
            categories.push(product.category);
        }
    });

    categories.forEach(function(category) {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        select.appendChild(option);
    });
}

export function renderOrders(orders, customers, products) {
    const container = document.querySelector("#liste-commandes");
    container.innerHTML = "";

    if (orders.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-secondary">
                    Aucune commande trouvée.
                </div>
            </div>
        `;
        return;
    }

    orders.forEach(function(order) {
        const customer = getCustomer(order, customers);
        const total = getOrderTotal(order, products);
        const statusClass = getStatusClass(order.status);

        const card = document.createElement("div");
        card.className = "col-md-6 col-lg-4";

        card.innerHTML = `
            <div class="card p-3 h-100">
                <h5 class="card-title">Commande #${order.id}</h5>
                <p><strong>Client :</strong> ${customer ? customer.name : "Inconnu"}</p>
                <p><strong>Date :</strong> ${order.date}</p>
                <p>
                    <strong>Statut :</strong>
                    <span class="badge ${statusClass}">${order.status}</span>
                </p>
                <p><strong>Total :</strong> ${formatPrice(total)}</p>
                <button class="btn btn-primary details-btn" data-id="${order.id}">
                    Voir les détails
                </button>
            </div>
        `;

        container.appendChild(card);
    });
}

export function renderDetails(order, customers, products) {
    const container = document.querySelector("#contenu-details");
    const customer = getCustomer(order, customers);

    let html = `
        <p><strong>Commande :</strong> #${order.id}</p>
        <p><strong>Client :</strong> ${customer ? customer.name : "Inconnu"}</p>
        <p><strong>Ville :</strong> ${customer ? customer.city : "Inconnue"}</p>
        <p><strong>Date :</strong> ${order.date}</p>
        <p>
            <strong>Statut :</strong>
            <span class="badge ${getStatusClass(order.status)}">${order.status}</span>
        </p>

        <div class="table-responsive">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Produit</th>
                        <th>Prix</th>
                        <th>Quantité</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
    `;

    order.items.forEach(function(item) {
        const product = getProduct(item.productId, products);

        if (product) {
            html += `
                <tr>
                    <td>${product.name}</td>
                    <td>${formatPrice(product.price)}</td>
                    <td>${item.quantity}</td>
                    <td>${formatPrice(product.price * item.quantity)}</td>
                </tr>
            `;
        }
    });

    html += `
                </tbody>
            </table>
        </div>
        <h5 class="text-end">
            Total : ${formatPrice(getOrderTotal(order, products))}
        </h5>
    `;

    container.innerHTML = html;
}

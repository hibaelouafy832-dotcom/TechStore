import { loadData } from "./dataService.js";
import { setData, customers, products, orders } from "./state.js";
import { filterOrders } from "./selectors.js";
import {
    renderIndicators,
    renderCategories,
    renderOrders,
    renderDetails
} from "./view.js";

let search = "";
let status = "";
let category = "";

function render() {
    const filteredOrders = filterOrders(
        orders,
        customers,
        products,
        search,
        status,
        category
    );

    renderIndicators(customers, products, orders);
    renderOrders(filteredOrders, customers, products);
}

async function init() {
    try {
        const data = await loadData();

        setData(data.customers, data.products, data.orders);

        renderCategories(products);
        render();

    } catch (error) {
        const message = document.querySelector("#message-erreur");
        message.textContent = "Impossible de charger les données. Vérifiez les fichiers JSON et le serveur local.";
        message.classList.remove("d-none");
    }
}

document.querySelector("#recherche").addEventListener("input", function(event) {
    search = event.target.value;
    render();
});

document.querySelector("#filtre-statut").addEventListener("change", function(event) {
    status = event.target.value;
    render();
});

document.querySelector("#filtre-categorie").addEventListener("change", function(event) {
    category = event.target.value;
    render();
});

document.querySelector("#reset-filtres").addEventListener("click", function() {
    search = "";
    status = "";
    category = "";

    document.querySelector("#recherche").value = "";
    document.querySelector("#filtre-statut").value = "";
    document.querySelector("#filtre-categorie").value = "";

    render();
});

document.querySelector("#liste-commandes").addEventListener("click", function(event) {
    const button = event.target.closest(".details-btn");

    if (button) {
        const order = orders.find(function(order) {
            return order.id === Number(button.dataset.id);
        });

        if (order) {
            renderDetails(order, customers, products);

            const modal = new bootstrap.Modal(
                document.querySelector("#modal-details")
            );

            modal.show();
        }
    }
});

init();

const axios = require('axios').default;
const endpoint = 'https://api.mercadolibre.com';

exports.getBySearch = async (search) => {
    const url = `${endpoint}/sites/MLA/search?q=${search}`
    try {
        const response = await axios.get(url);
        const data = response.data;
        const author = { // No encontré valores en el endpoint para estos campos, tal vez es un campo obsoleto?
            name: 'Juan Pablo',
            lastname: 'Nieto'
        };
        const items = data.results.slice(0, 4).map(item => ({
            id: item.id,
            title: item.title,
            price: {
                currency: item.currency_id,
                amount: item.price,
                decimals: 0 // No encontré un valor en el endpoint para este campo, tal vez es un campo obsoleto?
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping,
            state_name: item.address.state_name
        }));
        let categories = [];
        if (data.filters.length) {
            categories = data.filters.find(filter => filter.id === 'category').values[0].path_from_root.map(category => category.name);
        }
    
        return {
            // author: author,
            categories: categories,
            items: items
        };
    } catch (error) {
        console.error(`Error while requesting for ${search}:`, error);
        return {
            categories: [],
            items: []
        };
    }
}

exports.getById = async (id) => {
    const url_id = `${endpoint}/items/${id}`
    const url_description = `${endpoint}/items/${id}/description`
    const request_id = axios.get(url_id);
    const request_description = axios.get(url_description);
    try {
        let responses = await axios.all([request_id, request_description])
        const data = responses[0].data;
        const description = responses[1].data.plain_text;
        const request_categories = await axios.get(`${endpoint}/categories/${data.category_id}`);
        const categories = request_categories.data.path_from_root.map(category => category.name);
        const author = { // No encontré valores en el endpoint para estos campos, tal vez es un campo obsoleto?
            name: 'Juan Pablo',
            lastname: 'Nieto'
        };
        return {
            // author: author,
            item: {
                id: data.id,
                title: data.title,
                price: {
                    currency: data.currency_id,
                    amount: data.price,
                    decimals: 0 // No encontré un valor en el endpoint para este campo, tal vez es un campo obsoleto?
                },
                picture: data.pictures[0].url || data.thumbnail,
                condition: data.condition,
                free_shipping: data.shipping.free_shipping,
                sold_quantity: data.sold_quantity,
                description: description,
                categories: categories
            }
        }
    } catch (error) {
        console.error(`Error while requesting for ${id}:`, error);
    }
}
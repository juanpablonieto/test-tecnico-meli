import { currencyMap } from "../constants/currency";
import { decimalSeparatorFormat } from "../shared/utils";

export const adaptResults = (data) => {
    const items = data.items.map(item => {
        const amountWithCommas = decimalSeparatorFormat(item.price.amount)
        const currency = currencyMap[item.price.currency];
        return {
            ...item,
            price: {
                ...item.price,
                amount: amountWithCommas,
                currency: currency
            }
        }
    })
    return {
        ...data,
        items: items,
    }
}
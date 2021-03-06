import { currencyMap } from '../constants/currency';
import { conditionMap } from '../constants/condition';
import { decimalSeparatorFormat } from '../shared/utils';

export const adaptItemDetail = (data) => {
    const amountWithSeparator = decimalSeparatorFormat(data.item.price.amount);
    const currency = currencyMap[data.item.price.currency];
    const condition = conditionMap[data.item.condition];
    const item = {
        ...data,
        item: {
            ...data.item,
            price: {
                amount: amountWithSeparator.split(',')[0],
                decimals: amountWithSeparator.split(',')[1],
                currency: currency
            },
            condition: condition
        }
    }

    return item;
}
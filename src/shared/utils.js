export const decimalSeparatorFormat = (amount) => {
    // returns amount in X.XXX,XX format
    return amount.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}
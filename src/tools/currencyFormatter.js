function numberWithDuizendtallen(x) {
    x = x.replace(/[.]/g, "");
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function formatCurrency(targetValue, currency) {
    if (targetValue == null) {
        return;
    }
    const localeSeperator = ",";//((0.5).toLocaleString().match(/\D/) || ["."])[0];
    const localeGroupSeperator = "";//((1000000000).toLocaleString().match(/\D/) || [""])[0];

    if (/\.(?=\d{0,2}$)/.test(targetValue)) {
        targetValue = targetValue.toString().replace(/\.(?=\d{0,2}$)/, ",");
    }
    let input = (targetValue === localeSeperator || targetValue === '.') ? '0' + localeSeperator : targetValue;
    if (typeof input !== 'undefined') {
        input = input.toString().replace(/\./g, "");
        const finalValue = input === '' ? null : +input.replace(/,(?=\d{0,2}$)/, '.');
        if (isNaN(finalValue))
            return; //ignore
        return currency + ' ' + numberWithDuizendtallen(input);
    }
    return '';
}

export function formatMoney(value) {
    if (typeof value !== "undefined" && value !== null) {
        value = value.toString();
        value = /\.(?=\d{1}$)/.test(value) ? value + "0" : value;
        value = value.replace(/[.]/g, ",");
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        value = (value.indexOf(",") > -1) ? value : value + ",00";
    }
    return value ? '€ ' + value : '';
}
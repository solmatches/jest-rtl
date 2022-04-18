export function formatCurrency(amount) {
	return `${new Intl.NumberFormat().format(amount)}원`;
}

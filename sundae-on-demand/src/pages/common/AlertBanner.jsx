import Alert from "react-bootstrap/Alert";

export default function AlertBanner({ message, variant }) {
	const alertMessage =
		message || "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요";
	const alertVariant = variant || "danger";

	return (
		<Alert variant={alertVariant} style={{ backgroundColor: "tomato" }}>
			{alertMessage}
		</Alert>
	);
}

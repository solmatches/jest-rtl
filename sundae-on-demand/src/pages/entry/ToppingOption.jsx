import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export default function ToppingOption({ name, imagePath, updateItemCount }) {
	const handleChecked = (event) => {
		const { checked: targetChecked } = event.target;
		updateItemCount(name, targetChecked ? 1 : 0);
	};

	return (
		<Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
			<img
				src={`http://localhost:3030/${imagePath}`}
				alt={`${name} topping`}
				style={{ width: "75%" }}
			/>
			<Form.Group controlId={`${name}-topping-checkbox`}>
				<Form.Check
					type="checkbox"
					label={name}
					onChange={handleChecked}
				/>
			</Form.Group>
		</Col>
	);
}

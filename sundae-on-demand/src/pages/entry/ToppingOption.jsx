import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export default function ToppingOption({ name, imagePath, updateItemCount }) {
	const [checked, setChecked] = useState(false);

	const handleChecked = (event) => {
		const { checked: targetChecked } = event.target;
		setChecked(targetChecked);
		updateItemCount(name, targetChecked ? 1 : 0);
	};

	return (
		<Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
			<img
				src={`http://localhost:3030/${imagePath}`}
				alt={`${name} topping`}
				style={{ width: "75%" }}
			/>
			<Form>
				<Form.Check
					type="checkbox"
					id={name}
					label={name}
					checked={checked}
					onChange={handleChecked}
				/>
			</Form>
		</Col>
	);
}

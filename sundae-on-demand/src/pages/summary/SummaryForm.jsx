import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

export default function SummaryForm({ setOrderPhase }) {
	const [checked, setChecked] = useState(false);

	function handleSubmit(event) {
		event.preventDefault();

		setOrderPhase("completed");
	}

	const popover = (
		<Popover id="popover-basic">
			<Popover.Body>아이스크림이 전달되지 않습니다.</Popover.Body>
		</Popover>
	);

	const checkboxLabel = (
		<span>
			<OverlayTrigger
				trigger={["hover", "focus"]}
				placement="right"
				overlay={popover}>
				<span style={{ color: "blue" }}>이용약관</span>
			</OverlayTrigger>
			에 동의합니다
		</span>
	);

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group controlId="terms-and-conditions">
				<Form.Check
					type="checkbox"
					checked={checked}
					onChange={(e) => setChecked(e.target.checked)}
					label={checkboxLabel}
				/>
			</Form.Group>
			<Button variant="primary" type="submit" disabled={!checked}>
				주문 확인
			</Button>
		</Form>
	);
}

import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Options from "../entry/Options";

export default function SummaryForm() {
	const [checked, setChecked] = useState(false);

	const popover = (
		<Popover id="popover-basic">
			<Popover.Body>아이스크림이 배달되지 않습니다.</Popover.Body>
		</Popover>
	);

	const checkboxLabel = (
		<span>
			I agree to
			<OverlayTrigger
				trigger={["hover", "focus"]}
				placement="right"
				overlay={popover}>
				<span style={{ color: "blue" }}>Terms and Conditions</span>
			</OverlayTrigger>
		</span>
	);

	return (
		<Form>
			<Options />
			<Form.Group controlId="terms-and-conditions">
				<Form.Check
					type="checkbox"
					checked={checked}
					onChange={(e) => setChecked(e.target.checked)}
					label={checkboxLabel}
				/>
			</Form.Group>
			<Button variant="primary" type="submit" disabled={!checked}>
				Confirm order
			</Button>
		</Form>
	);
}

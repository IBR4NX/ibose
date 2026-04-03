import React from "react";
import "./loading.css";
export const Test = () => {
	return (
		<div className="container-spin">
			<svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" >
				<circle className="path" fill="none" strokeWidth="6"
				strokeLinecap="round"
				cx="33" cy="33" r="30"
				strokeDashoffset={0}
				/>
			</svg>
		</div>
	);
};
export default Test;
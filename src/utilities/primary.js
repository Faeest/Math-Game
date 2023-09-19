import colors from "@/data/primary-colors.json";
import Values from "values.js";
import variable, { setVariable } from "./variable";
import hexToRgb from "./hextorgb";
export default function updateColor() {
	let keys = Object.keys(colors.data);
	keys.forEach((e) => {
		let col = new Values(colors.data[e]);
		setVariable(["--" + e + "-darker", col.shade(50).hexString()]);
		setVariable(["--" + e + "-dark", col.shade(25).hexString()]);
		setVariable(["--" + e, colors.data[e]]);
		setVariable(["--" + e + "-light", col.tint(25).hexString()]);
		setVariable(["--" + e + "-lighter", col.tint(50).hexString()]);
	});
	if (localStorage.theme == "dark") document.documentElement.classList.add("dark");
	else document.documentElement.classList.remove("dark");
	if (localStorage.primary && variable(`--${localStorage.primary}`) != "") {
		let col = new Values(variable(`--${localStorage.primary}`));
		setVariable(["--primary-rgb", hexToRgb(variable(`--${localStorage.primary}`))]);
		setVariable(["--primary", variable(`--${localStorage.primary}`)]);
		setVariable(["--primary"+ "-darker", col.shade(50).hexString()]);
		setVariable(["--primary"+ "-dark", col.shade(25).hexString()]);
		setVariable(["--primary"+ "-light", col.tint(25).hexString()]);
		setVariable(["--primary"+ "-lighter", col.tint(50).hexString()]);
	}
}

export default function variable(variable = "", target = document.body) {
	return getComputedStyle?.(target)?.getPropertyValue?.(variable);
}
export function setVariable(property = ["",""], target = ":root") {
	return document.querySelector(target).style.setProperty(...property)
}
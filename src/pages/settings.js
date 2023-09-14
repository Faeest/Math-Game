import Layout from "@/components/layout";
import colors from "@/data/primary-colors.json";
import updateColor from "@/utilities/primary";
import { useEffect } from "react";
export default function Home() {
	useEffect(() => {
		if (localStorage.primary && document.querySelector(`#primary-${localStorage.primary}`)) {
			document.querySelector(`#primary-${localStorage.primary}`).checked = true;
		} else {
			document.querySelector("#primary-folly").checked = true;
		}
		let radios = document.querySelectorAll('input[type=radio][name="primary-color"]');
		let themes = document.querySelectorAll('input[type=radio][name="theme-color"]');

		function changeHandler(event) {
			localStorage.primary = this.value;
			updateColor();
		}
		function changeHandler2(event) {
			localStorage.theme = this.value;
			updateColor();
		}

		Array.prototype.forEach.call(radios, function (radio) {
			radio.addEventListener("change", changeHandler);
		});
		Array.prototype.forEach.call(themes, function (radio) {
			radio.addEventListener("change", changeHandler2);
		});
	}, []);
	return (
		<Layout>
			<div className='flex flex-wrap p-[--margin]'>
				<div className='w-full text-center text-2xl font-medium text-onyx dark:text-anti-flash'>Primary Color :</div>
				<div className='flex w-full justify-center gap-10 mt-10'>
					{Object.keys(colors.data).map((e) => (
						<input
							value={e}
							key={colors.data[e]}
							id={"primary-" + e}
							name='primary-color'
							className={`picker`}
							style={{ "--picker-color": colors.data[e] }}
							type='radio'
						/>
					))}
				</div>
				<div className='w-full text-center text-2xl font-medium text-onyx dark:text-anti-flash mt-10'>Theme :</div>
				<div className='flex w-full justify-center gap-10 mt-10'>
					<input value={"light"} name='theme-color' className={`theme-picker bg-anti-flash`} type='radio' />
					<input value={"dark"} name='theme-color' className={`theme-picker bg-onyx`} type='radio' />
				</div>
			</div>
		</Layout>
	);
}

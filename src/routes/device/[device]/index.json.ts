// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function get({ params }) {
	const data = await fetch('https://nowrom.deno.dev/').then((r) => r.json());
	const roms = await fetch('https://nowrom.deno.dev/roms').then((r) => r.json());
	const device = params.device;
	const device_data = data.find((x) => x.codename?.toLowerCase() == device?.toLowerCase());
	if (!device_data) {
		return {};
	}

	const obj = {};
	device_data?.roms?.forEach((x) => {
		obj[x.id] = {
			...(obj[x.id] || {}),
			...x
		};
	});
	device_data.roms = Object.values(obj);
	return {
		body: {
			device: device_data,
			roms
		}
	};
}

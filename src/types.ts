export interface ROMTypes {
	roms: ROM[];
	recoveries: ROM[];
	brand: string;
	name: string;
	codename: string;
}

export interface ROM {
	id: ID;
	supported_versions?: SupportedVersion[];
	repostories?: string[];
	maintainer?: string;
	changelog?: null | string;
	active?: boolean;
	github?: string;
	donation_link?: string;
	photo?: string;
}

export enum ID {
	Arrowos = 'arrowos',
	Dotos = 'dotos',
	Legionos = 'legionos',
	Pixelexperience = 'pixelexperience'
}

export interface SupportedVersion {
	version_code: VersionCode;
	stable?: boolean;
	deprecated: boolean;
	xda_thread?: string;
	telegram_url?: string;
}

export enum VersionCode {
	Eleven = 'eleven',
	ElevenPlus = 'eleven_plus',
	Twelve = 'twelve'
}

import { ValueListFieldType } from 'remult';

@ValueListFieldType()
export class Score {
	static NOTSET = new Score('NOTSET', 'Not set yet');
	static A = new Score('A', 'A - 75 %');
	static B = new Score('B', 'B - 90 %');
	static C = new Score('C', 'C - 100 %');
	static D = new Score('D', 'D - 110 %');

	id: string;
	caption: string;
	constructor(id: string, caption: string) {
		this.id = id;
		this.caption = caption;
	}
}

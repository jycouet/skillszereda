import { ValueListFieldType } from 'remult';

@ValueListFieldType()
export class QuestionTrack {
	static SOFT = new QuestionTrack('SOFT', 'Soft skill');
	static TECHNICAL = new QuestionTrack('TECHNICAL', 'Technikai készségek');
	static TRACK3 = new QuestionTrack('TRACK3', 'Hatás');
	static TRACK4 = new QuestionTrack('TRACK4', 'Üzleti perspektíva');

	id: string;
	caption: string;
	constructor(id: string, caption: string) {
		this.id = id;
		this.caption = caption;
	}
}

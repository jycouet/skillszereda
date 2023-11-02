import { ValueListFieldType } from 'remult';

@ValueListFieldType()
export class QuestionTrack {
	static SOFT = new QuestionTrack('SOFT', 'Soft skill');
	static TECHNICAL = new QuestionTrack('TECHNICAL', 'Technikai készségek');
	static HATAS = new QuestionTrack('HATAS', 'Hatás');
	static UZLETI = new QuestionTrack('UZLETI', 'Üzleti perspektíva');

	id: string;
	caption: string;
	constructor(id: string, caption: string) {
		this.id = id;
		this.caption = caption;
	}
}

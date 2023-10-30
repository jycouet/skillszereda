import { ValueListFieldType } from 'remult';

@ValueListFieldType()
export class QuestionLevel {
	static JUNIOR = new QuestionLevel('JUNIOR', 'Junior Engineer');
	static PRO = new QuestionLevel('PRO', 'Professional Engineer');
	static SENIOR1 = new QuestionLevel('SENIOR1', 'Senior Engineer I');
	static SENIOR2 = new QuestionLevel('SENIOR2', 'Senior Engineer II');
	static PRINCIPAL = new QuestionLevel('PRINCIPAL', 'Principal Engineer');
	static SENIOR_PRINCIPAL = new QuestionLevel('SENIOR_PRINCIPAL', 'Senior Principal Engineer');

	id: string;
	caption: string;
	constructor(id: string, caption: string) {
		this.id = id;
		this.caption = caption;
	}
}

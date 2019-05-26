import Score from '../models/score';
import Service from '../platform/service';
import Note from '../models/note';
import Section from '../models/section';

export default class EditorService extends Service<Score> {

	public insertNote(key: string): void {
		const sections = this.model.sections;
		// todo
		if (sections.length === 0) {
			const newSection = new Section();
			newSection.id = sections.length + 1;
			const newNote = new Note();
			newNote.id = 1;
			newNote.key = key;
			newSection.notes.push(newNote);
			sections.push(newSection);
		};
	}
}
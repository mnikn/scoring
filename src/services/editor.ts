import Score from '../models/score';
import Service from '../platform/service';
import Note from '../models/note';
import Section from '../models/section';

export default class EditorService extends Service<Score> {

	public insertNote(key: string): void {
		const sections = this.model.sections;
		if (this.model.isLastSectionFull()) {
			const newSection = new Section();
			newSection.id = sections.length + 1;
			const newNote = new Note();
			newNote.id = 1;
			newNote.key = key;
			newSection.notes.push(newNote);
			sections.push(newSection);
		} else {
			const lastSection = this.model.sections.last.val;
			const newNote = new Note();
			newNote.id = lastSection.notes.length + 1;
			newNote.key = key;
			lastSection.notes.push(newNote);			
		}
	}
}
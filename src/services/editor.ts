import Score from '../models/score';
import Service from '../platform/service';
import Note from '../models/note';
import Section from '../models/section';

export default class EditorService extends Service<Score> {

	public insertNote(key: string): Note {
		const sections = this.model.sections;
		let newNote = null;
		if (this.model.isLastSectionFull()) {
			const newSection = new Section();
			newSection.id = sections.length + 1;
			newNote = new Note();
			newNote.id = 1;
			newNote.key = key;
			newNote.sectionId = newSection.id;
			newSection.notes.push(newNote);
			sections.push(newSection);
		} else {
			const lastSection = this.model.sections.last.val;
			newNote = new Note();
			newNote.id = lastSection.notes.length + 1;
			newNote.sectionId = lastSection.id;
			newNote.key = key;
			lastSection.notes.push(newNote);			
		}
		return newNote;
	}
}
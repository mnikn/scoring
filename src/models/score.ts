import { LinkedList } from '../utils/data';
import Section from './section';
import * as _ from 'lodash';
import Note from './note';

export default class Score {
	public id: number;
	public name: string;
	public tonality: 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B' = 'C';
	public beatPerSections: 4 | 6 | 8 = 4;
	public notePerBeat: 4 | 8 | 16 | 32 = 4;
	public sections: LinkedList<Section> = new LinkedList<Section>();

	public isLastSectionFull(): boolean {
		return !this.lastSection || this.beatPerSections === this.lastSectionNotes.length;
	}

	public get notes(): Note[] {
		const notes = this.sections.map(section => section.val.notes.toArray());
		return _.flatten(notes.toArray());
	}

	public get lastSection(): Section {
		return this.sections.last && this.sections.last.val;
	}

	public get lastSectionNotes(): LinkedList<Note> {
		return this.lastSection.notes;
	}
}
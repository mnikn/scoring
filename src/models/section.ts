import { LinkedList } from '../utils/data';
import Note from './note';

export default class Section {
	public id: number;
	public notes: LinkedList<Note> = new LinkedList<Note>();
}
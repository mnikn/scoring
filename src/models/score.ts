import { LinkedList } from '../utils/data';
import Section from './section';

export default class Score {
	public id: number;
	public name: string;
	public tonality: 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B' = 'C';
	public beatPerSections: 4 | 6 | 8 = 4;
	public notePerBeat: 4 | 8 | 16 | 32 = 4;
	public sections: LinkedList<Section> = new LinkedList<Section>();
}
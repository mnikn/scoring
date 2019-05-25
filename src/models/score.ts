export default class Score {
	private _name: string;
	private _tonality: 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B' = 'C';
	private _beatPerSections: 4 | 6 | 8 = 4;
	private _notePerBeat: 4 | 8 | 16 | 32 = 4;

	public get name(): string {
		return this._name;
	}
	public set name(value: string) {
		this._name = value;
	}
	public get tonality(): 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B' {
		return this._tonality;
	}
	public set tonality(value: 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B') {
		this._tonality = value;
	}
	public get beatPerSections(): 4 | 6 | 8 {
		return this._beatPerSections;
	}
	public set beatPerSections(value: 4 | 6 | 8) {
		this._beatPerSections = value;
	}
	public get notePerBeat(): 4 | 8 | 16 | 32 {
		return this._notePerBeat;
	}
	public set notePerBeat(value: 4 | 8 | 16 | 32) {
		this._notePerBeat = value;
	}
}
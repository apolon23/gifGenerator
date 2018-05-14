export class Options {
  constructor(
    public offset?: number ,
    public numFrames?: number ,
    public frameDuration?: string ,
    public gifWidth?: string,
    public gifHeight?: number,
    public text?: string ,
    public fontSize?: string,
    public fontFamily?: string,
    public fontColor?: string,
    public textXCoordinate?: any,
    public textYCoordinate?: any,
    public video?: any,
    public progressCallback?: any
  ) {}
}

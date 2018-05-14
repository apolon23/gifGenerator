export class Options {
  constructor(
    public numFrames?: string ,
    // public frameDuration?: string ,
    public gifWidth?: string,
    public gifHeight?: number,
    public text?: string ,
    public fontSize?: string,
    public fontFamily?: string,
    public fontColor?: string,
    public textXCoordinate?: any,
    public textYCoordinate?: any,
    public progressCallback?: any
  ) {}
}

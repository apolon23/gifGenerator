export class Options {
  constructor(
    public speed?: string ,
    public tags?: Array<string>,
    public width?: string,
    public height?: string,
    public textArea?: {
      text?: string ,
      fontSize?: string,
      font?: string,
      color?: string,
      position?: any
    },
  ) {}
}

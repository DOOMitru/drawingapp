import type { CanvasProperties, StageProperties } from './types';

class App {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  stageProperties: StageProperties = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  }

  canvasProperties: CanvasProperties  = {
    width: 0,
    height: 0,
    center: { x: 0, y: 0 },
  };

  constructor(element: string | HTMLCanvasElement) {
    if (typeof element === 'string') {
      this.canvas = <HTMLCanvasElement>document.querySelector(element);
    } else if (element instanceof HTMLCanvasElement) {
      this.canvas = element;
    } else throw new Error('Canvas is null');

    this.ctx = this.canvas.getContext('2d')!;

    window.addEventListener('resize', e => this.windowResizeHandler(e));
    window.dispatchEvent(new Event('resize'));
  }

  windowResizeHandler(event: Event) {
    const { innerHeight, innerWidth } = <Window>event.target;

    this.canvasProperties = {
      width: innerWidth,
      height: innerHeight,
      center: {
        x: innerWidth / 2,
        y: innerHeight / 2,
      },
    };

    this.stageProperties = {
      top: 10,
      left: 10,
      width: this.canvasProperties.width - 20,
      height: this.canvasProperties.height - 20,
    };

    this.canvas.width = this.canvasProperties.width;
    this.canvas.height = this.canvasProperties.height;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = `rgba(0, 0, 0, 0.15)`;

    this.ctx.fillRect(
      this.stageProperties.left,
      this.stageProperties.top,
      this.stageProperties.width,
      this.stageProperties.height
    );
  }
}

export default App;

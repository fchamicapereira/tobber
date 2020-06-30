declare interface CrawlerOptions {
  maxConnections?: number;
  name?: string;
  uri?: string;
  url?: string;
  timeout?: number;
  rateLimit?: number;
  priorityRange?: number;
  priority?: number;
  retries?: number;
  retryTimeout?: number;
  forceUTF8?: boolean;
  incomingEncoding?: string;
  skipDuplicates?: boolean;
  rotateUA?: boolean;
  userAgent?: string | [string];
  processHTML?: ($: CheerioStatic) => any;
  callback?: (error: Error, res: any, done: () => void) => void;
}

declare class Crawler {
  constructor(options: CrawlerOptions);

  public queue(input: CrawlerOptions | CrawlerOptions[]): void;
}

declare module "crawler" {
  export = Crawler;
}

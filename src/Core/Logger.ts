export default class Logger {
    warning(text: string): void {
        console.warn(`⚠️ -> ${text}`);
    }

    debug(text: string): void {
        console.debug(`​📄​ -> ${text}`);
    }

    error(text: string): void {
        console.error(`🐛 -> ${text}`);
    }
}
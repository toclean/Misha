import { describe, it } from 'mocha';
import { expect } from 'chai';

import Handler from '../Core/Handlers/Handler';
import NotImplementedError from '../Core/Errors/NotImplementedError';
import Command, { Medium } from '../Core/Command';

class TestCommand extends Command {
    constructor() {
        super({
            aliases: [],
            disabled: false,
            medium: Medium.CHANNEL,
            name: 'test'
        });
    }
}

describe('Command', () => {
    it('should throw NotImplementError when execute is not implemented', () => {
        const testCommand = new TestCommand();

        expect(() => testCommand.execute({} as any)).to.throw(NotImplementedError);
    });
});
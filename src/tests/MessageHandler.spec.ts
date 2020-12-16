import { describe, it } from 'mocha';
import { expect } from 'chai';

import Handler from '../Core/Handlers/Handler';
import NotImplementedError from '../Core/Errors/NotImplementedError';
import Command, { Medium } from '../Core/Command';
import MessageHandler from '../Core/Handlers/MessageHandler';
import Misha from '../Core/Misha';

describe('Command', () => {
    it('should throw NotImplementError when execute is not implemented', () => {
        const messageHandler = new MessageHandler();
        const message: any = { content: 'test', author: { bot: false } };
        messageHandler.handle(message, new Misha());
    });
});
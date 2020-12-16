import { describe, it } from 'mocha';
import chai from 'chai';
import sinon, { SinonSpy } from 'sinon';
import sinonChai from 'sinon-chai';

import Logger from '../Core/Logger';

const expect = chai.expect;
chai.use(sinonChai);

describe('Logger', () => {
    const sandbox = sinon.createSandbox();
    let logger: Logger;
    
    beforeEach(() => {
        logger = new Logger();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should print a message to debug', () => {
        sandbox.spy(console, 'debug');
        logger.debug('test');
        expect(console.debug).to.have.been.called;
    });

    it('should print a message to error', () => {
        sandbox.spy(console, 'error');
        logger.error('test');
        expect(console.error).to.have.been.called;
    });

    it('should print a message to warning', () => {
        sandbox.spy(console, 'warn');
        logger.warning('test');
        expect(console.warn).to.have.been.called;
    });
});
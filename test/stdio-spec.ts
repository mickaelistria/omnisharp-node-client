/// <reference path="./tsd.d.ts" />
import {expect} from "chai";
import {resolve} from "path";
import {StdioDriver} from "../lib/drivers/stdio";
import {noop, once} from "lodash";

declare const xdescribe: Function;

describe("Omnisharp Local - Stdio", function() {
    it("must construct", () => {
        new StdioDriver({
            projectPath: resolve(__dirname, "../"),
            onEvent: noop,
            onState: noop,
            onCommand: noop
        });
    });

    it("must construct with a specific driver", () => {
        new StdioDriver({
            projectPath: resolve(__dirname, "../"),
            onEvent: noop,
            onState: noop,
            onCommand: noop
        });
    });

    describe("properties", function(this: Mocha.ITestDefinition) {
        this.timeout(60000);
        it("should implement the interface", function(done) {
            done = once(done);
            const server = new StdioDriver({
                projectPath: resolve(__dirname, "../"),
                onEvent: noop,
                onState(v) {
                    expect(server.currentState).to.be.not.null;
                    expect(server.outstandingRequests).to.be.not.null;
                    server.disconnect();
                    done();
                },
                onCommand: noop
            });
            server.connect();
        });
    });

    /*describe("properties", function() {
        this.timeout(60000);
        it("should disconnect if no an invalid project path is given", function(done) {
            const server = new Stdio({
                projectPath: "/invalid/path/to/things/"
            });

            const sub = server.state.subscribe(state => {
                const sub2 = server.state.filter(z => z === DriverState.Error).subscribe(state => {
                    expect(state).to.be.eql(DriverState.Error);
                    done();
                    sub2.dispose();
                });
                expect(state).to.be.eql(DriverState.Connecting);
                sub.dispose();
            });
            server.connect();
        })
    });*/
});

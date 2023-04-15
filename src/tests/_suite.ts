import * as path from 'path';
import * as assert from 'assert';
import * as ttm from 'azure-pipelines-task-lib/mock-test';

it('should succeed with simple inputs', function(done: Mocha.Done) {
    this.timeout(1000);

    let tp = path.join(__dirname, 'success.js');
    let taskPath = path.join(__dirname,'../../src/tasks/checksolutionversion/task.json');
    console.log(tp);
    let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp,taskPath);

    tr.run();
    console.log(tr.succeeded);
    assert.equal(tr.succeeded, true, 'should have succeeded');
    assert.equal(tr.warningIssues.length, 0, "should have no warnings");
    assert.equal(tr.errorIssues.length, 0, "should have no errors");
    console.log(tr.stdout);
    //assert.equal(tr.stdout.indexOf('Hello human') >= 0, true, "should display Hello human");
    done();
});
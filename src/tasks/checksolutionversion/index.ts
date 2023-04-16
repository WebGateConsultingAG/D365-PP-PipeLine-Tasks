import * as tl from 'azure-pipelines-task-lib/task';
import {dynamicsAPIBuilder} from '../../common/dynamicsWebApiFactory';

async function run() {
    try {
        const inputString: string | undefined = tl.getInput('solutionName', true);
        if (inputString == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }
        console.log('Hello', inputString);
        const api = dynamicsAPIBuilder("","","","");
    }
    catch (err:any) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
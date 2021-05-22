import { initialShortyState, IShortyState } from '../../_shorty/store/shorty.state';
import { initialTaskState, ITaskState } from '../../_task/_store/task.state';
import { IAppState, initialAppState } from './app.state';

export const ROOT_SESSION_STORAGE_KEY = 'shorty_page';

export interface IRootState {
    readonly app: IAppState;
    readonly shorty: IShortyState;
    readonly task: ITaskState;
}

export const initialRootState: IRootState = {
    app: initialAppState,
    shorty: initialShortyState,
    task: initialTaskState,
};

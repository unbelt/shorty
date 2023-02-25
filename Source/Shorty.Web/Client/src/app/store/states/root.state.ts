import type { IAppState } from './app.state';
import { initialAppState } from './app.state';
import type { IShortyState } from '../../_shorty/store/shorty.state';
import { initialShortyState } from '../../_shorty/store/shorty.state';
import type { ITaskState } from '../../_task/_store/task.state';
import { initialTaskState } from '../../_task/_store/task.state';

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
